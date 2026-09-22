import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "30mb" }));

const SYSTEM_PROMPT = `You are a plant pathology field assistant. You will be shown three photos of the SAME tree: a leaf close-up, a stem/bark close-up, and the ground surrounding the trunk. Assess visible condition only — never invent findings you cannot see, and say "no clear signs visible" where nothing stands out. Be concise. Respond with ONLY raw JSON matching exactly this shape:
{"healthScore": <integer 0-100>, "severity": <"Healthy"|"Low"|"Moderate"|"High"|"Critical">, "leaf": {"status": <short phrase>, "findings": [<string>, ...up to 3]}, "stem": {"status": <short phrase>, "findings": [<string>, ...up to 3]}, "ground": {"status": <short phrase>, "findings": [<string>, ...up to 3]}, "problems": [<string>, ...up to 4], "recommendations": [<string>, ...up to 4], "treatment": [<string>, ...up to 3], "summary": <1-2 sentence overall read>}
Keep every string under 14 words. If a category shows nothing notable, still fill "status" and give one findings entry saying so.`;

// Free-tier Gemini model. Check https://ai.google.dev/gemini-api/docs/models
// if this alias ever changes.
const MODEL = "gemini-3.6-flash";

let ai = null;

function getClient() {
  if (!ai) {
    if (!process.env.GEMINI_API_KEY) return null;
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return ai;
}

async function generateWithRetry(client, request, maxAttempts = 3) {
  let lastError;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await client.models.generateContent(request);
    } catch (err) {
      lastError = err;

      const status = err?.status ?? err?.code;
      const retryable = status === 408 || status === 429 || (status >= 500 && status <= 599);

      if (!retryable || attempt === maxAttempts) {
        throw err;
      }

      const delay = 2000 * 2 ** (attempt - 1);

      console.log(
        `Gemini temporary error (${status}). Retry ${attempt}/${maxAttempts - 1} in ${delay / 1000}s...`
      );

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.post("/api/analyze", async (req, res) => {
  const { leaf, stem, ground } = req.body || {};

  if (!leaf?.base64 || !stem?.base64 || !ground?.base64) {
    return res.status(400).json({ error: "All three photos (leaf, stem, ground) are required." });
  }

  const client = getClient();
  if (!client) {
    return res
      .status(500)
      .json({ error: "Server is missing GEMINI_API_KEY. Add it to server/.env and restart." });
  }

  try {
    const response = await generateWithRetry(client, {
      model: MODEL,
      contents: [
        {
          role: "user",
          parts: [
            { text: "Leaf photo:" },
            { inlineData: { mimeType: leaf.mediaType, data: leaf.base64 } },
            { text: "Stem / bark photo:" },
            { inlineData: { mimeType: stem.mediaType, data: stem.base64 } },
            { text: "Ground around the trunk:" },
            { inlineData: { mimeType: ground.mediaType, data: ground.base64 } },
            { text: "Assess this tree per the required JSON schema." },
          ],
        },
      ],
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: "application/json",
        maxOutputTokens: 3000,
        thinkingConfig: { thinkingLevel: "low" },
      },
    });

    const textBlock = response.text || "";
    const cleaned = textBlock.replace(/```json|```/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (e) {
      console.error("Could not parse model output as JSON:", cleaned);
      return res.status(502).json({ error: "The assessment came back malformed. Try again." });
    }

    res.json(parsed);
  } catch (err) {
    console.error("Gemini SDK error:", err);
    res.status(500).json({ error: "Could not process the assessment. Check the server logs." });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Canopy backend running on http://localhost:${PORT}`);
});

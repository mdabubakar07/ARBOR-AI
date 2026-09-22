import { generateObject } from 'ai'
import { z } from 'zod'
import { NextResponse } from 'next/server'

export const maxDuration = 60

const SEVERITY = ['Healthy', 'Low', 'Moderate', 'High', 'Critical'] as const

const categorySchema = z.object({
  status: z.string().describe('One short phrase describing the visible condition'),
  findings: z
    .array(z.string())
    .describe('Concise visible observations. Empty array if nothing notable.'),
})

const assessmentSchema = z.object({
  healthScore: z
    .number()
    .min(0)
    .max(100)
    .describe('Overall visible health score from 0 (critical) to 100 (perfect).'),
  severity: z.enum(SEVERITY),
  leaf: categorySchema,
  stem: categorySchema,
  ground: categorySchema,
  problems: z
    .array(z.string())
    .describe('Visible problems detected. Empty array if none are visible.'),
  recommendations: z.array(z.string()).describe('Recommended actions for the caretaker.'),
  treatment: z
    .array(z.string())
    .describe('Concrete treatment steps. Empty array if no treatment is required.'),
  summary: z.string().describe("A clear 2-4 sentence plain-language summary of the tree's condition."),
})

type ImagePayload = { base64?: string; mediaType?: string }

function imagePart(img: ImagePayload) {
  const mediaType = img.mediaType || 'image/jpeg'
  // Accept a raw base64 string or a full data URL; the SDK file part takes either.
  const data = img.base64?.startsWith('data:')
    ? img.base64
    : `data:${mediaType};base64,${img.base64}`
  return { type: 'file' as const, mediaType, data }
}

export async function POST(req: Request) {
  let body: { leaf?: ImagePayload; stem?: ImagePayload; ground?: ImagePayload }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'INVALID_REQUEST' }, { status: 400 })
  }

  const { leaf, stem, ground } = body ?? {}
  if (!leaf?.base64 || !stem?.base64 || !ground?.base64) {
    return NextResponse.json({ error: 'MISSING_IMAGES' }, { status: 400 })
  }

  try {
    const { object } = await generateObject({
      model: 'google/gemini-2.5-flash',
      schema: assessmentSchema,
      messages: [
        {
          role: 'system',
          content:
            'You are ARBOR AI, an expert arborist and plant-pathology vision system. ' +
            'You assess ONLY what is visibly present in the three photographs of a single tree ' +
            '(a leaf close-up, a stem/bark close-up, and the ground/soil around the trunk). ' +
            'Never diagnose invisible or internal conditions. Never invent data. ' +
            'Base the health score and severity strictly on visible evidence. ' +
            'If a category looks healthy, say so plainly and keep findings minimal. ' +
            'Keep every string concise, specific, and free of markdown.',
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Analyze this tree from the three photographs and return a structured health assessment. Image 1 = LEAF, Image 2 = STEM/BARK, Image 3 = GROUND/SOIL.',
            },
            imagePart(leaf),
            imagePart(stem),
            imagePart(ground),
          ],
        },
      ],
    })

    return NextResponse.json(object)
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.log('[v0] /api/analyze error:', message)

    // Map upstream rate-limit / overload signals to a "busy" state for the UI.
    const busy = /429|rate.?limit|overload|unavailable|503|quota/i.test(message)
    return NextResponse.json(
      { error: busy ? 'AI_BUSY' : 'ANALYSIS_FAILED' },
      { status: busy ? 503 : 500 },
    )
  }
}

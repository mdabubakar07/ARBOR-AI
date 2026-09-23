# 🌳 ARBOR AI

> **AI-Powered Tree Health Management System** — a full-stack application that analyzes tree images using AI and generates structured health insights, potential problems, recommendations, and treatment guidance.

---

## 🚀 Overview

ARBOR AI combines a modern Next.js frontend with a Node.js/Express backend and the Gemini API to provide AI-assisted tree health analysis from uploaded images.

### Core Capabilities

- 🌳 AI-powered tree image analysis
- 📷 Image upload and processing
- 📊 Structured tree-health reports
- ❤️ Health scoring and breakdown
- ⚠️ Problem identification
- 💡 Recommendations and treatment guidance
- 📋 Report management
- 🔐 Environment-based API configuration

---

## 🛠️ Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend
- Node.js
- Express.js
- JavaScript

### AI
- Google Gemini API

### Tools
- Git / GitHub
- npm
- Visual Studio Code

---

## 📁 Project Structure

```text
ARBOR-AI/
├── client/                 # Next.js frontend
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── public/
│   ├── package.json
│   └── next.config.mjs
│
├── server/                 # Node.js backend
│   ├── .env.example
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── .gitignore
└── README.md

⚙️ Prerequisites
Install the following software before running ARBOR AI:

Node.js

npm

Git

Gemini API key

Verify installations using your terminal:
node --version
npm --version
git --version

⚡ Quick Start
1. Clone the Repository
git clone [https://github.com/mdabubakar07/ARBOR-AI.git](https://github.com/mdabubakar07/ARBOR-AI.git)
cd ARBOR-AI

2. Install Dependencies

Frontend:
Bash
cd client
npm install
cd ..

Backend:
cd server
npm install
cd ..

3. Configure Environment Variables
Create a server/.env file based on server/.env.example:

Code snippet
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3001

VariableDescriptionGEMINI_API_KEYAPI key used for Gemini AI analysisPORTBackend server port🔒 Security
Notice: Never commit server/.env or expose your API key. The root .gitignore already excludes .env files.

▶️ Running ARBOR AI
ARBOR AI requires two running servers simultaneously. For the standard Windows PowerShell + VS Code workflow, use two separate terminals:

⚙️ Prerequisites
Install the following software before running ARBOR AI:

Node.js

npm

Git

Gemini API key

Verify installations using your terminal:
node --version
npm --version
git --version

⚡ Quick Start
1. Clone the Repository
git clone [https://github.com/mdabubakar07/ARBOR-AI.git](https://github.com/mdabubakar07/ARBOR-AI.git)
cd ARBOR-AI

2. Install Dependencies
Frontend:
cd client
npm install
cd ..

Backend:
cd server
npm install
cd ..

3. Configure Environment Variables
Create a server/.env file based on server/.env.example:

Code snippet
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3001

Variable             	Description
GEMINI_API_KEY      API key used for Gemini AI analysis
PORT                Backend server port

🔒 Security Notice: Never commit server/.env or expose your API key. The root .gitignore already excludes .env files.

▶️ Running ARBOR AI
ARBOR AI requires two running servers simultaneously. For the standard Windows PowerShell + VS Code workflow, use two separate terminals:

Terminal 1 (Backend)
cd server
node server.js
Backend runs at: http://localhost:3001

Terminal 2 (Frontend)
cd client
npm run dev
Frontend runs at: http://localhost:3000

📋 Step-by-Step Execution Summary
1.Clone the repository.
2.Install frontend and backend dependencies.
3.Create server/.env and add your valid Gemini API key.
4.Open Terminal 1, navigate to server, and start the backend with node server.js.
5.Open Terminal 2, navigate to client, and start the frontend with npm run dev.
6.Open your browser at http://localhost:3000.
7.Upload your tree images, run the AI analysis, and review the generated report.

🧪 Testing & Builds
Currently, ARBOR AI does not contain a dedicated automated test suite.

To check the frontend build:
cd client
npm run build

To verify the backend starts correctly:
cd server
node server.js

cd server
node server.js

🔧 Troubleshooting
Port already in use
If port 3000 or 3001 is already occupied, stop the existing node process or configure an alternative port.

Gemini API errors
Verify that GEMINI_API_KEY is present in server/.env and that the key is valid and active.

Missing dependencies
Reinstall modules by running:
rm -rf client/node_modules server/node_modules
cd client && npm install
cd ../server && npm install

Frontend cannot communicate with backend
Make sure both servers are actively running in separate terminals (http://localhost:3000 and http://localhost:3001).

📖 Glossary

Term                                   Meaning
Frontend                  User-facing Next.js application
Backend                   Node.js server responsible for API processing
API                       Interface allowing software components to communicate
Gemini API                AI service used for tree-image analysis
Environment Variable      Configuration value stored outside source code
npm                       Node.js package manager
Next.js                   React-based frontend framework
Express.js                Node.js web application framework
Repository                Project's version-controlled GitHub workspace


🌱 Project Objective
ARBOR AI explores the use of artificial intelligence and image analysis to provide accessible, structured insights into tree health.

Turning tree images into intelligent health insights.

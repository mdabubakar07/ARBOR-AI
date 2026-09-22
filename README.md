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

**Frontend**
- Next.js
- React
- TypeScript
- Tailwind CSS

**Backend**
- Node.js
- Express.js
- JavaScript

**AI**
- Google Gemini API

**Tools**
- Git
- GitHub
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

Install the following before running ARBOR AI:

Node.js
npm
Git
Gemini API key

Verify installation:

node --version
npm --version
git --version
⚡ Quick Start
1. Clone the Repository
git clone https://github.com/mdabubakar07/ARBOR-AI.git
cd ARBOR-AI
2. Install Dependencies
Frontend
cd client
npm install
cd ..
Backend
cd server
npm install
cd ..
🔐 Environment Variables

Create:

server/.env

based on:

server/.env.example

Add:

GEMINI_API_KEY=your_gemini_api_key_here
PORT=3001
Environment Variables
Variable	Description
GEMINI_API_KEY	API key used for Gemini AI analysis
PORT	Backend server port

Security: Never commit server/.env or expose your API key. The root .gitignore already excludes .env.

▶️ Running ARBOR AI

ARBOR AI requires two running servers.

Frontend

From the project root:

cd client
npm run dev

Frontend:

http://localhost:3000
Backend

Open a second VS Code terminal:

cd server
node server.js

Backend:

http://localhost:3001

Keep both terminals running while using the application.

📋 Step-by-Step Execution
Clone the repository.
Install frontend dependencies.
Install backend dependencies.
Create server/.env.
Add your Gemini API key.
Start the backend with node server.js.
Start the frontend with npm run dev.
Open http://localhost:3000.
Upload a tree image.
Run the AI analysis and review the generated report.
📦 One-Click Setup & Run

Unix-like shell / Bash

Copy and paste the following block from the project root:

# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install

# Return to project root
cd ..

# Start backend
(cd server && node server.js) &

# Start frontend
cd client
npm run dev

Before running the application, make sure server/.env exists and contains a valid GEMINI_API_KEY.

🧪 Tests

Currently, ARBOR AI does not contain a dedicated automated test suite.

To check the frontend build:

cd client
npm run build

To verify the backend starts correctly:

cd server
node server.js

If automated tests are added later, they should be exposed through the corresponding package.json test script.

🔧 Troubleshooting
Port already in use

If port 3000 or 3001 is already occupied, stop the existing process or configure another port.

Gemini API errors

Verify:

GEMINI_API_KEY

is present in:

server/.env

and that the key is valid.

Dependencies missing

Run:

cd client
npm install

cd ../server
npm install
Frontend cannot communicate with backend

Make sure both servers are running:

Frontend → http://localhost:3000
Backend  → http://localhost:3001
Build problems

Try reinstalling dependencies:

rm -rf client/node_modules server/node_modules
cd client && npm install
cd ../server && npm install
📖 Glossary
Term	Meaning
Frontend	User-facing Next.js application
Backend	Node.js server responsible for API processing
API	Interface allowing software components to communicate
Gemini API	AI service used for tree-image analysis
Environment Variable	Configuration value stored outside source code
npm	Node.js package manager
Next.js	React-based frontend framework
Express.js	Node.js web application framework
Repository	Project's version-controlled GitHub workspace
🔒 Security

Never commit sensitive credentials.

The repository intentionally keeps:

server/.env

out of Git while providing:

server/.env.example

as the configuration template.

🌱 Project Objective

ARBOR AI explores the use of artificial intelligence and image analysis to provide accessible, structured insights into tree health.

Turning tree images into intelligent health insights.


### One important point about the Bash block

The block above is designed to be pasted into a **Unix-like Bash terminal**. It starts the backend in the background and then starts the frontend in the foreground, so both can run from one terminal.

For your normal **Windows PowerShell + VS Code workflow**, I recommend continuing with the two-terminal method:

**Terminal 1**
```powershell
cd server
node server.js

Terminal 2

cd client
npm run dev

That is clearer for development and makes backend/frontend errors much easier to see.


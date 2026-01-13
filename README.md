
# BRUTE-AI

## Description
BRUTE-AI is an AI-powered legal assistance web app offering interactive learning, a legal chatbot, document analysis, and a virtual courtroom for practice and evaluation.

## Demo
- Demo video: <insert Google Drive or YouTube link>

## Features
- Law Tutor: interactive courses and quizzes.
- AI Chatbot: answer legal questions and give summaries.
- Doc Analyzer: extract key facts from legal documents (OCR + NLP).
- Virtual Courtroom: role-play courtroom scenarios for practice.

## Tech Stack
- Frontend: React + Vite
- Backend: Firebase (Auth, Firestore, Functions) and lightweight Node services
- AI: OpenAI APIs (or equivalent) for chat and document understanding

## Google Technologies Used
- Firebase Authentication
- Firestore (Realtime/Cloud Firestore)

## Quick Start
1. Clone the repo:

```bash
git clone https://github.com/<your-org>/<repo>.git
cd WinterHackathon-AbyssWalker/brute
```

2. Install dependencies:

```bash
npm install
```

3. Add environment variables:

Create a `.env` (or `.env.local`) with keys for Firebase and your AI provider, for example:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
OPENAI_API_KEY=...
```

4. Run the app (development):

```bash
npm run dev
```

## Project Structure (high level)
- `brute/` — frontend app (React + Vite)
- `brute/backend/` — server functions (Node / Firebase Functions)
- `backend/` — additional backend API (if used)

## Contribution
- Fork the repo, create a feature branch, open a pull request.

## Team
- Shravan
- Manvith
- Oswin
- Elvin

## License
- Add license information here (e.g., MIT).

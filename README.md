Mentora 🎯

AI-powered career coaching platform — resume generation, mock interviews, industry insights, and a 24/7 AI chat assistant, all in one place.

🌐 Live: mentora-gold-psi.vercel.app
🤖 ML Service: github.com/ishanikapoor197/ml-service

✨ Features
FeatureDescriptionAI Career Chat24/7 chatbot powered by Google Gemini for career adviceResume BuilderATS-optimized resume generation with PDF exportCover Letter GeneratorRole-specific cover letters via AIMock InterviewsPractice sessions across tech, HR, and behavioral categoriesIndustry InsightsReal-time salary data and skill trends across 50+ industriesProgress TrackingPerformance analytics with charts across interview sessions

🏗️ Architecture
┌─────────────────────────────────┐
│         User (Browser)          │
└────────────┬────────────────────┘
             │
┌────────────▼────────────────────┐
│     Next.js App (Vercel)        │
│  • App Router (React 19)        │
│  • Clerk Auth                   │
│  • Prisma ORM → PostgreSQL      │
│  • Inngest (background jobs)    │
│  • Google Gemini AI             │
└────────────┬────────────────────┘
             │ HTTP
┌────────────▼────────────────────┐
│    ML Service (Python/Flask)    │
│  • scikit-learn model           │
│  • Career prediction endpoint   │
└─────────────────────────────────┘

🛠️ Tech Stack
Frontend & Backend

Next.js 16 (App Router)
React 19
Tailwind CSS v4
ShadCN UI — accessible component primitives
Framer Motion — animations
Recharts — progress & analytics charts

Auth & Database

Clerk — authentication & user management
Prisma — ORM
PostgreSQL — database (via Neon / Supabase)

AI & Documents

Google Gemini (@google/genai) — primary AI model
@react-pdf/renderer — PDF resume generation
Mammoth — .docx parsing

Background Jobs

Inngest — event-driven background functions


🚀 Getting Started
Prerequisites

Node.js 18+
PostgreSQL database (local or hosted — Neon recommended)
Clerk account
Google AI API key

1. Clone the repo
bashgit clone https://github.com/ishanikapoor197/mentora.git
cd mentora
2. Install dependencies
bashnpm install
3. Set up environment variables
Create a .env.local file in the root:
env# Database
DATABASE_URL="postgresql://user:password@host:5432/mentora"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# OpenRouter (optional fallback)
OPENROUTER_API_KEY=your_openrouter_api_key

# ML Service
ML_SERVICE_URL=https://your-ml-service-url.onrender.com

# Inngest (background jobs)
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key
4. Set up the database
bashnpx prisma generate
npx prisma db push
5. Run the development server
bashnpm run dev
Open http://localhost:3000 in your browser.

📁 Project Structure
mentora/
├── app/                  # Next.js App Router pages & API routes
│   ├── (auth)/           # Sign-in / Sign-up pages
│   ├── (main)/           # Protected dashboard routes
│   │   ├── dashboard/
│   │   ├── resume/
│   │   ├── interview/
│   │   └── insights/
│   └── api/              # API route handlers
├── components/           # Reusable UI components
├── actions/              # Next.js server actions
├── lib/                  # Shared utilities & AI client setup
├── hooks/                # Custom React hooks
├── data/                 # Static data (questions, industries, etc.)
├── prisma/               # Prisma schema & migrations
└── public/               # Static assets

🗃️ Database Schema
Key models managed by Prisma:

User — synced from Clerk, stores industry & onboarding data
Resume — stored resume content per user
CoverLetter — cover letter content per user
InterviewSession — mock interview attempts & scores
Assessment — individual question responses


🔄 Background Jobs (Inngest)
Inngest handles async tasks that shouldn't block the request/response cycle:

Generating industry insights on first login
Refreshing salary & trend data on a schedule
PDF generation for large resumes


🌍 Deployment
The app is deployed on Vercel with the following setup:

Connect your GitHub repo to Vercel
Add all environment variables from .env.local to Vercel's project settings
Set the build command to npm run build (Prisma client is auto-generated via postinstall)
Deploy!


Make sure your DATABASE_URL points to a cloud PostgreSQL instance (not localhost) when deploying.


🤝 Contributing

Fork the repo
Create a feature branch: git checkout -b feature/your-feature
Commit your changes: git commit -m 'Add some feature'
Push to the branch: git push origin feature/your-feature
Open a Pull Request


👥 Authors
Built with ❤️‍🔥 by Ishan and Ishani

# Supabase and AI setup

## Supabase

1. Create or select a Supabase project.
2. In Project Settings / API, copy the Project URL and the publishable key. Never use a `service_role` key in the browser.
3. Open **SQL Editor**, paste `supabase/schema.sql`, and run it. The app stores habits, goals, journal entries, and the daily rhythm in a per-user JSONB row protected by row-level security.
4. In **Authentication → URL Configuration**, add `http://localhost:3000/**` as a redirect URL. For a deployment, add its HTTPS domain too.

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

```text
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
GROQ_API_KEY=your_groq_api_key
```

Get a Groq API key from the Groq developer console. Keep it in `.env.local` locally and add it as `GROQ_API_KEY` under the Vercel project's Environment Variables. Do not add the `NEXT_PUBLIC_` prefix to it and do not commit `.env.local`.

## Start the app

From the project folder, run:

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`. AI chat context is kept in the open conversation and sent to `/api/chat`; the chat transcript is not saved to Supabase. Schedule items are saved in the signed-in user's wellness data.

## Vercel

Push to GitHub and import the repository into Vercel. Add all three environment variables for Production and Preview as needed, then deploy. After choosing a domain, add it to Supabase's allowed redirect URLs and redeploy if environment variables changed.

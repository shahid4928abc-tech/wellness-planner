# Wellness Planner — Supabase + public deployment

This version replaces the browser-only demo accounts/data store with Supabase Auth and a PostgreSQL JSONB row per user. It is intended to be deployed publicly on Vercel.

## 1. Create the Supabase project
1. Visit https://supabase.com/dashboard and create a project. Save the database password somewhere safe.
2. In Project Settings / API (or the Connect dialog), copy the Project URL and the **publishable** key (`sb_publishable_...`). Never put a `service_role` or secret key in a `NEXT_PUBLIC_` variable.
3. Open SQL Editor, paste all of `supabase/schema.sql`, and run it.

## 2. Configure local environment
1. In the project root, copy `.env.example` to `.env.local`.
2. Replace the example values with your Supabase Project URL and publishable key.
3. In PowerShell from the project root run:
   ```powershell
   npm install
   npm run dev
   ```
4. Open http://localhost:3000. Sign up with an email and password. If email confirmation is enabled, confirm the email before logging in.

## 3. Configure Supabase Auth URLs
In Supabase Dashboard > Authentication > URL Configuration:
- Set Site URL to `http://localhost:3000` during local development.
- Add `http://localhost:3000/**` to Redirect URLs if using confirmation links.
- After deployment, change Site URL to your deployed Vercel domain and add that domain's auth callback/confirmation URL as an allowed redirect.

## 4. Deploy publicly with Vercel
1. Push the project to a GitHub repository (do not commit `.env.local`).
2. Import that repository at https://vercel.com/new.
3. In Vercel project Settings > Environment Variables, add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` for Production (and Preview if wanted).
4. Deploy. Add your final `https://your-project.vercel.app` URL to Supabase Auth URL Configuration.
5. Redeploy after changing environment variables.

## Important security notes
- The SQL enables Row Level Security and restricts each row to its matching authenticated `auth.uid()`.
- Only use the publishable key in this frontend. Never expose a Supabase secret/service-role key.
- This app stores the user's habits, goals and journal in one JSONB row. This is simple for the existing UI; a larger app may eventually benefit from separate tables.
- Existing localStorage demo accounts/data do not automatically migrate. Export/copy anything you need before switching; the old local data is not uploaded by this upgrade.
- Before using real sensitive journal data, thoroughly test signup, email confirmation, login/logout, data isolation between two accounts, and RLS. This is a practical starter, not a security audit.

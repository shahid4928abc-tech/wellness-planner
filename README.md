# Wellness Planner

A responsive wellness planning app built with Next.js, Tailwind CSS, and Supabase. This merged edition keeps the updated multi-page experience—account sign-in, dashboard, habits, goals, and journal—and brings back the version 1 daily rhythm and AI wellness companion.

## Included features

- Supabase email/password and Google sign-in.
- A dashboard with habit progress, streaks, goals, journal summary, and today's schedule.
- A daily rhythm that lets each user add, reschedule, complete, and remove meals, movement, rest, and personal reminders.
- An AI wellness companion that considers recent messages, available time, activity pace, and the signed-in user's current habits, goals, today's schedule, and most recent journal mood. Suggestions can be added to the schedule.
- Habits, goals, and mood journal saved in the signed-in user's Supabase JSON data row.
- Responsive navigation and reduced-motion support.

## Run locally

1. Install Node.js LTS and npm.
2. Copy `.env.example` to `.env.local` and fill in the Supabase URL, Supabase publishable key, and Groq API key.
3. In the project folder, run:

   ```bash
   npm install
   npm run dev
   ```

4. Open `http://localhost:3000` and create an account.

Run the SQL in `supabase/schema.sql` in the Supabase SQL Editor. The app uses the `wellness_data` table with row-level security so signed-in users can access only their own row.

## Environment variables

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
GROQ_API_KEY=
```

Set these in Vercel as well as locally. The Groq key is used only by the server route at `/api/chat`; do not prefix it with `NEXT_PUBLIC_` or commit `.env.local`.

## AI companion scope

The companion offers general wellness planning, not diagnosis or treatment. It does not set calorie targets, prescribe medication, or recommend changing medication. Medication reminders are user-entered schedule items only. Recent conversation messages are sent to the chat API while the conversation is open; chat messages are not stored in the wellness database. On each message, a short read-only summary of the user's habit streaks, goal progress, today's schedule, and latest journal mood is also sent to the chat API so replies are personalized to that account — this summary is generated client-side from already-loaded account data and is not itself persisted anywhere new.

## Deploy

Push the project to GitHub, import it into Vercel, and add the environment variables above. Add the deployed domain to Supabase Authentication's allowed redirect URLs.

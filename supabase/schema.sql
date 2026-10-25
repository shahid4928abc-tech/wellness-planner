-- Run this file in Supabase Dashboard > SQL Editor.
create table if not exists public.wellness_data (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null default '{"habits":[],"goals":[],"journal":[],"dailyPlan":[]}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.wellness_data
  alter column data set default '{"habits":[],"goals":[],"journal":[],"dailyPlan":[]}'::jsonb;

alter table public.wellness_data enable row level security;

-- Explicitly remove default access, then permit signed-in users to manage only their own row.
revoke all on table public.wellness_data from anon, authenticated;
grant select, insert, update, delete on table public.wellness_data to authenticated;

drop policy if exists "Users can read their own wellness data" on public.wellness_data;
drop policy if exists "Users can create their own wellness data" on public.wellness_data;
drop policy if exists "Users can update their own wellness data" on public.wellness_data;
drop policy if exists "Users can delete their own wellness data" on public.wellness_data;

create policy "Users can read their own wellness data"
  on public.wellness_data for select to authenticated
  using ((select auth.uid()) = user_id);
create policy "Users can create their own wellness data"
  on public.wellness_data for insert to authenticated
  with check ((select auth.uid()) = user_id);
create policy "Users can update their own wellness data"
  on public.wellness_data for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
create policy "Users can delete their own wellness data"
  on public.wellness_data for delete to authenticated
  using ((select auth.uid()) = user_id);

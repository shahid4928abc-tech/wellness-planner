"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { getSupabase } from "@/lib/supabase/client";

export type Habit = { id: string; name: string; log: string[] };
export type Goal = { id: string; title: string; due?: string; progress: number };
export type Mood = 1 | 2 | 3 | 4 | 5;
export type Entry = { id: string; at: string; mood: Mood; text: string };
export type UserData = { habits: Habit[]; goals: Goal[]; journal: Entry[] };
export type PublicUser = { id: string; name: string; email: string };
const EMPTY: UserData = { habits: [], goals: [], journal: [] };

function publicUser(user: User): PublicUser {
  return { id: user.id, name: String(user.user_metadata?.full_name ?? user.user_metadata?.name ?? user.email?.split("@")[0] ?? "User"), email: user.email ?? "" };
}

export type Session = { status: "loading"; user: null } | { status: "out"; user: null } | { status: "in"; user: PublicUser };
export function useSession(): Session {
  const [session, setSession] = useState<Session>({ status: "loading", user: null });
  useEffect(() => {
    const supabase = getSupabase();
    let alive = true;
    supabase.auth.getUser().then(({ data, error }) => {
      if (!alive) return;
      setSession(!error && data.user ? { status: "in", user: publicUser(data.user) } : { status: "out", user: null });
    }).catch(() => { if (alive) setSession({ status: "out", user: null }); });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, authSession) => {
      if (!alive) return;
      setSession(authSession?.user ? { status: "in", user: publicUser(authSession.user) } : { status: "out", user: null });
    });
    return () => { alive = false; listener.subscription.unsubscribe(); };
  }, []);
  return session;
}

export function useUserData(userId: string) {
  const [data, setData] = useState<UserData>(EMPTY);
  const dataRef = useRef<UserData>(EMPTY);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let alive = true;
    setReady(false);
    const supabase = getSupabase();
    supabase.from("wellness_data").select("data").eq("user_id", userId).maybeSingle().then(({ data: row, error }) => {
      if (!alive) return;
      if (error) console.error("Could not load wellness data:", error.message);
      const loaded = row?.data ? { ...EMPTY, ...row.data } as UserData : EMPTY;
      dataRef.current = loaded;
      setData(loaded);
      setReady(true);
    }).catch((error: unknown) => { if (alive) { console.error(error); setReady(true); } });
    return () => { alive = false; };
  }, [userId]);

  const update = useCallback((fn: (current: UserData) => UserData) => {
    const next = fn(dataRef.current);
    dataRef.current = next;
    setData(next);
    // RLS ensures this row can only be written by its owner.
    void getSupabase().from("wellness_data").upsert({ user_id: userId, data: next }, { onConflict: "user_id" })
      .then(({ error }) => { if (error) console.error("Could not save wellness data:", error.message); });
  }, [userId]);
  return { data, update, ready };
}

export const newId = () => crypto.randomUUID();
export async function signUp(name: string, email: string, password: string): Promise<string | null> {
  const supabase = getSupabase();
  name = name.trim(); email = email.trim().toLowerCase();
  if (!name) return "Please enter your name.";
  if (!/^\S+@\S+\.\S+$/.test(email)) return "Please enter a valid email address.";
  if (password.length < 8) return "Password must be at least 8 characters.";
  const { error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: name } } });
  if (error) return error.message;
  return null;
}
export async function logIn(email: string, password: string): Promise<string | null> {
  const { error } = await getSupabase().auth.signInWithPassword({ email: email.trim().toLowerCase(), password });
  return error?.message ?? null;
}
export async function logOut() { await getSupabase().auth.signOut(); }

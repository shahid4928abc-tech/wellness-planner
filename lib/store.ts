
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { getSupabase } from "@/lib/supabase/client";

export type Habit = { id: string; name: string; log: string[] };
export type Goal = { id: string; title: string; due?: string; progress: number };
export type Mood = 1 | 2 | 3 | 4 | 5;
export type Entry = { id: string; at: string; mood: Mood; text: string };
export type ActivityKind = "MOVE" | "MEAL" | "REST" | "REMINDER";
export type ScheduledActivity = {
  id: string;
  time: string;
  title: string;
  detail: string;
  tag: ActivityKind;
  completedOn: string | null;
};
export type UserData = { habits: Habit[]; goals: Goal[]; journal: Entry[]; dailyPlan: ScheduledActivity[] };
export type PublicUser = { id: string; name: string; email: string };

const STARTER_PLAN: ScheduledActivity[] = [
  { id: "starter-water", time: "08:00", title: "Water and a gentle start", detail: "Have a glass of water and take a moment to get settled.", tag: "REMINDER", completedOn: null },
  { id: "starter-stretch", time: "11:30", title: "Movement break", detail: "Take a short walk or stretch between study or work sessions.", tag: "MOVE", completedOn: null },
  { id: "starter-lunch", time: "13:00", title: "Lunch away from your screen", detail: "Pause for a balanced meal and a proper break.", tag: "MEAL", completedOn: null },
  { id: "starter-winddown", time: "20:30", title: "Wind-down moment", detail: "Take five quiet minutes to reset before the evening ends.", tag: "REST", completedOn: null },
];

const EMPTY: UserData = { habits: [], goals: [], journal: [], dailyPlan: STARTER_PLAN };

function publicUser(user: User): PublicUser {
  return {
    id: user.id,
    name: String(
      user.user_metadata?.full_name ??
        user.user_metadata?.name ??
        user.email?.split("@")[0] ??
        "User"
    ),
    email: user.email ?? "",
  };
}

export type Session =
  | { status: "loading"; user: null }
  | { status: "out"; user: null }
  | { status: "in"; user: PublicUser };

export function useSession(): Session {
  const [session, setSession] = useState<Session>({
    status: "loading",
    user: null,
  });

  useEffect(() => {
    const supabase = getSupabase();
    let alive = true;

    void (async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (!alive) return;

        setSession(
          !error && data.user
            ? { status: "in", user: publicUser(data.user) }
            : { status: "out", user: null }
        );
      } catch {
        if (alive) setSession({ status: "out", user: null });
      }
    })();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, authSession) => {
        if (!alive) return;
        setSession(
          authSession?.user
            ? { status: "in", user: publicUser(authSession.user) }
            : { status: "out", user: null }
        );
      }
    );

    return () => {
      alive = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  return session;
}

export function useUserData(userId: string) {
  const [data, setData] = useState<UserData>(EMPTY);
  const dataRef = useRef<UserData>(EMPTY);
  const [loadedUserId, setLoadedUserId] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    const supabase = getSupabase();

    void (async () => {
      try {
        const { data: row, error } = await supabase
          .from("wellness_data")
          .select("data")
          .eq("user_id", userId)
          .maybeSingle();

        if (!alive) return;
        if (error) {
          console.error("Could not load wellness data:", error.message);
        }

        const loaded: UserData = row?.data
          ? { ...EMPTY, ...row.data }
          : EMPTY;

        dataRef.current = loaded;
        setData(loaded);
        setLoadedUserId(userId);
      } catch (error: unknown) {
        if (alive) {
          console.error("Could not load wellness data:", error);
          setLoadedUserId(userId);
        }
      }
    })();

    return () => {
      alive = false;
    };
  }, [userId]);

  const update = useCallback(
    (fn: (current: UserData) => UserData) => {
      const next = fn(dataRef.current);
      dataRef.current = next;
      setData(next);

      void (async () => {
        try {
          const { error } = await getSupabase()
            .from("wellness_data")
            .upsert(
              { user_id: userId, data: next },
              { onConflict: "user_id" }
            );

          if (error) {
            console.error("Could not save wellness data:", error.message);
          }
        } catch (error: unknown) {
          console.error("Could not save wellness data:", error);
        }
      })();
    },
    [userId]
  );

  return { data, update, ready: loadedUserId === userId };
}

export const newId = () => crypto.randomUUID();

export async function signUp(
  name: string,
  email: string,
  password: string
): Promise<string | null> {
  const supabase = getSupabase();

  name = name.trim();
  email = email.trim().toLowerCase();

  if (!name) return "Please enter your name.";
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return "Please enter a valid email address.";
  }
  if (password.length < 8) {
    return "Password must be at least 8 characters.";
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name },
      emailRedirectTo: `${window.location.origin}/login`,
    },
  });

  if (error) return error.message;

  return null;
}

export async function logIn(
  email: string,
  password: string
): Promise<string | null> {
  const { error } = await getSupabase().auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password,
  });

  return error?.message ?? null;
}

export async function logOut() {
  await getSupabase().auth.signOut();
}

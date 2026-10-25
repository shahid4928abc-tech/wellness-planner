"use client";

import ReactMarkdown from "react-markdown";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { dayKey, streak } from "@/lib/dates";
import { newId, type ActivityKind, type ScheduledActivity, type UserData } from "@/lib/store";
import { AppShell, btn, card, input } from "./AppShell";

type Message = { role: "user" | "assistant"; text: string };

function makeActivity(text: string): ScheduledActivity {
  const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);
  const lead = lines.find((line) => /^([-*•]|\d+\.)\s/.test(line)) ?? lines[0] ?? "Wellness idea";
  const title = lead
    .replace(/^#+\s*/, "")
    .replace(/^([-*•]|\d+\.)\s*/, "")
    .replace(/\*\*/g, "")
    .replace(/[.!?].*$/, "")
    .trim()
    .slice(0, 80) || "AI wellness idea";
  const tag: ActivityKind = /\b(walk|workout|exercise|stretch|movement|yoga|run)\b/i.test(text)
    ? "MOVE"
    : /\b(meal|snack|lunch|breakfast|dinner|food)\b/i.test(text)
      ? "MEAL"
      : /\b(medicine|medication|pill|water|drink|remind)\b/i.test(text)
        ? "REMINDER"
        : "REST";

  return {
    id: newId(),
    time: "18:00",
    title,
    detail: text.slice(0, 240),
    tag,
    completedOn: null,
  };
}

function buildContext(data: UserData): string {
  const today = dayKey();
  const habitLines = data.habits.slice(0, 8).map((h) => {
    const s = streak(h.log);
    const doneToday = h.log.includes(today) ? "done today" : "not done today";
    return `- ${h.name}: ${doneToday}, ${s}-day streak`;
  });
  const goalLines = data.goals.slice(0, 8).map((g) => {
    const due = g.due ? `, due ${g.due}` : "";
    return `- ${g.title}: ${g.progress}% complete${due}`;
  });
  const planLines = data.dailyPlan.slice(0, 8).map((a) => {
    const done = a.completedOn === today ? "done" : "not done yet";
    return `- ${a.time} ${a.title} (${a.tag}): ${done}`;
  });
  const lastMood = data.journal[0];
  const moodLine = lastMood ? `Most recent journal mood: ${lastMood.mood}/5` : "";

  const sections = [
    habitLines.length ? `Habits:\n${habitLines.join("\n")}` : "Habits: none added yet",
    goalLines.length ? `Goals:\n${goalLines.join("\n")}` : "Goals: none added yet",
    planLines.length ? `Today's schedule:\n${planLines.join("\n")}` : "Today's schedule: empty",
    moodLine,
  ].filter(Boolean);

  return sections.join("\n\n");
}

function CompanionPanel({ userData, onAdd }: { userData: UserData; onAdd: (activity: ScheduledActivity) => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: "Hi! Tell me about your day, energy, or available time and I’ll help you find a small, realistic wellness step." },
  ]);
  const [message, setMessage] = useState("");
  const [availableTime, setAvailableTime] = useState("30");
  const [activityLevel, setActivityLevel] = useState("gentle");
  const [isSending, setIsSending] = useState(false);
  const [notice, setNotice] = useState("");
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = messagesRef.current;
    if (container) container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
  }, [messages, isSending]);

  async function send(text = message) {
    const clean = text.trim();
    if (!clean || isSending) return;
    const lower = clean.toLowerCase();
    const timeMatch = lower.match(/\b(\d+)\s*(minutes?|mins?)\b/);
    const minutes = timeMatch ? Number(timeMatch[1]) : Number(availableTime);
    const level = /\b(tired|exhausted|low energy)\b/.test(lower) ? "gentle" : activityLevel;
    setAvailableTime(String(minutes));
    if (level === "gentle") setActivityLevel("gentle");
    const history = [...messages, { role: "user" as const, text: clean }].slice(-8);
    setMessages(history);
    setMessage("");
    setIsSending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: clean,
          availableTime: minutes,
          activityLevel: level,
          history,
          context: buildContext(userData),
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Chat request failed.");
      setMessages((current) => [...current, { role: "assistant", text: data.reply }]);
    } catch (error) {
      console.error("Wellness chat failed:", error);
      setMessages((current) => [...current, {
        role: "assistant",
        text: "I couldn’t reach the AI right now. Check that the `GROQ_API_KEY` environment variable is set and try again.",
      }]);
    } finally {
      setIsSending(false);
    }
  }

  function addSuggestion(text: string) {
    onAdd(makeActivity(text));
    setNotice("Added a draft to your schedule for 6:00 PM. You can edit the time on the Daily rhythm page.");
    window.setTimeout(() => setNotice(""), 3500);
  }

  return (
    <div className={`${card} flex min-h-[650px] flex-col p-0`}>
      <div className="border-b border-sage-900/10 px-5 py-4 sm:px-6">
        <p className="font-semibold text-sage-900">Wellness companion</p>
        <p className="mt-1 text-xs leading-5 text-muted">This assistant can see your habits, goals, today&apos;s schedule and recent mood to personalize suggestions. General wellness planning only—not medical care.</p>
      </div>
      <div ref={messagesRef} aria-live="polite" className="max-h-[560px] min-h-[320px] flex-1 space-y-3 overflow-y-auto overscroll-contain bg-white/60 px-4 py-4 sm:px-5">
        {messages.map((item, index) => (
          <div key={`${index}-${item.role}`} className={`flex ${item.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm leading-6 ${item.role === "user" ? "rounded-br-md bg-sage-700 text-white" : "rounded-bl-md border border-sage-900/10 bg-paper text-ink"}`}>
              <div className="[&_p]:my-0 [&_p+p]:mt-2 [&_strong]:font-bold [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5">
                <ReactMarkdown>{item.text}</ReactMarkdown>
              </div>
              {item.role === "assistant" && index > 0 && (
                <button type="button" onClick={() => addSuggestion(item.text)} className="mt-3 rounded-full border border-sage-700/20 bg-sage-50 px-3 py-1.5 text-xs font-semibold text-sage-700 hover:bg-sage-100">+ Add this idea to my day</button>
              )}
            </div>
          </div>
        ))}
        {isSending && <p className="text-sm text-muted" role="status">Thinking…</p>}
      </div>
      {notice && <p role="status" className="mx-4 mt-3 rounded-xl bg-sage-50 px-3 py-2 text-xs font-semibold text-sage-700">{notice}</p>}
      <div className="border-t border-sage-900/10 p-4 sm:p-5">
        <div className="mb-3 flex flex-wrap gap-2">
          {["I only have 10 minutes", "I’m feeling tired"].map((prompt) => <button key={prompt} type="button" onClick={() => void send(prompt)} disabled={isSending} className="rounded-full border border-sage-700/20 px-3 py-1.5 text-xs font-medium text-muted hover:bg-sage-50 disabled:opacity-50">{prompt}</button>)}
        </div>
        <div className="mb-3 grid gap-3 sm:grid-cols-2">
          <label className="text-xs font-semibold text-muted">Free time<select value={availableTime} onChange={(event) => setAvailableTime(event.target.value)} className={`${input} mt-1 py-2 text-sm`}>{![10, 20, 30, 45].includes(Number(availableTime)) && <option value={availableTime}>{availableTime} minutes (from your message)</option>}<option value="10">10 minutes</option><option value="20">20 minutes</option><option value="30">30 minutes</option><option value="45">45 minutes</option></select></label>
          <label className="text-xs font-semibold text-muted">Activity pace<select value={activityLevel} onChange={(event) => setActivityLevel(event.target.value)} className={`${input} mt-1 py-2 text-sm`}><option value="gentle">Gentle</option><option value="moderate">Moderate</option></select></label>
        </div>
        <form onSubmit={(event: FormEvent<HTMLFormElement>) => { event.preventDefault(); void send(); }} className="flex gap-2">
          <label className="sr-only" htmlFor="companion-message">Message the wellness companion</label>
          <input id="companion-message" value={message} onChange={(event) => setMessage(event.target.value)} disabled={isSending} placeholder="Tell me what changed today…" className={`${input} min-w-0 flex-1`} />
          <button type="submit" disabled={isSending || !message.trim()} className={btn}>{isSending ? "Thinking…" : "Send"}</button>
        </form>
      </div>
    </div>
  );
}

export function WellnessChat() {
  return (
    <AppShell title="AI companion" subtitle="Talk through your schedule and get ideas that fit your energy.">
      {({ data, update }) => (
        <CompanionPanel
          userData={data}
          onAdd={(activity) => update((current) => ({ ...current, dailyPlan: [...(current.dailyPlan ?? []), activity] }))}
        />
      )}
    </AppShell>
  );
}

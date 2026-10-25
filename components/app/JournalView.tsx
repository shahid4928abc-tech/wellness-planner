"use client";

import { useState, type FormEvent } from "react";
import { newId, type Mood } from "@/lib/store";
import { AppShell, btn, card, input } from "./AppShell";

export const moods: { value: Mood; label: string }[] = [
  { value: 1, label: "Low" },
  { value: 2, label: "Down" },
  { value: 3, label: "Okay" },
  { value: 4, label: "Good" },
  { value: 5, label: "Great" },
];
export const moodLabel = (m: Mood) => moods.find((x) => x.value === m)?.label ?? "";

export function JournalView() {
  const [mood, setMood] = useState<Mood>(3);
  const [text, setText] = useState("");
  return (
    <AppShell title="Journal" subtitle="Take a minute to note how you feel.">
      {({ data, update }) => {
        const save = (e: FormEvent) => {
          e.preventDefault();
          update((d) => ({
            ...d,
            journal: [{ id: newId(), at: new Date().toISOString(), mood, text: text.trim() }, ...d.journal],
          }));
          setText("");
        };
        const remove = (id: string) => update((d) => ({ ...d, journal: d.journal.filter((j) => j.id !== id) }));

        return (
          <div className="space-y-6">
            <form onSubmit={save} className={`${card} space-y-5`}>
              <fieldset>
                <legend className="mb-3 text-sm font-semibold">How are you feeling?</legend>
                <div className="flex flex-wrap gap-2">
                  {moods.map((m) => (
                    <label key={m.value} className="cursor-pointer">
                      <input type="radio" name="mood" value={m.value} checked={mood === m.value} onChange={() => setMood(m.value)} className="peer sr-only" />
                      <span className="block rounded-full border border-sage-900/15 px-5 py-2.5 text-sm font-semibold peer-checked:border-sage-700 peer-checked:bg-sage-700 peer-checked:text-cream peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-sage-700">
                        {m.label}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <div>
                <label htmlFor="note" className="mb-1.5 block text-sm font-semibold">Anything on your mind? <span className="font-normal text-muted">(optional)</span></label>
                <textarea id="note" rows={4} value={text} onChange={(e) => setText(e.target.value)} maxLength={1000} className={input} />
              </div>
              <button type="submit" className={btn}>Save entry</button>
            </form>

            {data.journal.length === 0 ? (
              <p className={`${card} text-center text-muted`}>No entries yet.</p>
            ) : (
              <ul className="space-y-3">
                {data.journal.map((j) => (
                  <li key={j.id} className={card}>
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm text-muted">
                        {new Date(j.at).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}
                      </p>
                      <span className="rounded-full bg-sage-100 px-3 py-1 text-xs font-semibold text-sage-700">{moodLabel(j.mood)}</span>
                    </div>
                    {j.text && <p className="mt-3 whitespace-pre-wrap leading-7">{j.text}</p>}
                    <button type="button" onClick={() => remove(j.id)} aria-label="Delete this entry" className="mt-3 rounded-full px-3 py-2 text-sm font-medium text-muted hover:bg-clay-soft hover:text-[#8a4b2d]">
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      }}
    </AppShell>
  );
}

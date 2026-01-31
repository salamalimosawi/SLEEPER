"use client";

import { useEffect, useState } from "react";
import { db, SleepEntry } from "../../lib/db";
import { calculateSleepDuration } from "../../lib/sleepUtils";
import AuthGuard from "@/components/AuthGuard";

export default function SleepDiary() {
  const [entries, setEntries] = useState<SleepEntry[]>([]);
  const [sleepTime, setSleepTime] = useState("");
  const [wakeTime, setWakeTime] = useState("");
  const [quality, setQuality] = useState(3);
  const [mood, setMood] = useState(3);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    loadEntries();
  }, []);

  async function loadEntries() {
    const all = await db.sleepEntries.orderBy("date").reverse().toArray();
    setEntries(all);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await db.sleepEntries.add({
      date: new Date().toISOString(),
      sleepTime,
      wakeTime,
      quality,
      mood,
      notes,
    });

    setSleepTime("");
    setWakeTime("");
    setNotes("");
    setQuality(3);
    setMood(3);

    loadEntries();
  }

  return (
    <AuthGuard>
      <main className="min-h-screen p-8 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Sleep Diary</h1>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-10">
          <input type="time" value={sleepTime} onChange={e => setSleepTime(e.target.value)} className="w-full border p-2" required />
          <input type="time" value={wakeTime} onChange={e => setWakeTime(e.target.value)} className="w-full border p-2" required />

          <input type="number" min="1" max="5" value={quality} onChange={e => setQuality(+e.target.value)} className="w-full border p-2" placeholder="Sleep Quality (1–5)" />
          <input type="number" min="1" max="5" value={mood} onChange={e => setMood(+e.target.value)} className="w-full border p-2" placeholder="Mood (1–5)" />

          <textarea value={notes} onChange={e => setNotes(e.target.value)} className="w-full border p-2" placeholder="Notes" />

          <button className="bg-black text-white w-full py-2">Save</button>
        </form>

        {/* ENTRIES */}
        <h2 className="text-xl font-semibold mb-4">Recent Entries</h2>

        <div className="space-y-3">
          {entries.map(entry => (
            <div key={entry.id} className="border p-3 rounded">
              <p className="font-medium">
                {new Date(entry.date).toLocaleDateString()}
              </p>
              <p>
                Sleep: {entry.sleepTime} → {entry.wakeTime} (
                {calculateSleepDuration(entry.sleepTime, entry.wakeTime)} hrs)
              </p>
              <p>Quality: {entry.quality} | Mood: {entry.mood}</p>
              {entry.notes && <p className="italic">{entry.notes}</p>}
            </div>
          ))}
        </div>
      </main>
    </AuthGuard>
  );
}
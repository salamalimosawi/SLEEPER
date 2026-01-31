"use client";

import { useEffect, useState } from "react";
import { db, SleepEntry } from "../../../lib/db";
import { calculateSleepDuration } from "../../../lib/sleepUtils";
import { getUserId } from "../../../lib/auth";
import AuthGuard from "../../../components/AuthGuard";

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
    const userId = getUserId();
    const data = await db.sleepEntries
      .where("userId")
      .equals(userId)
      .reverse()
      .toArray();

    setEntries(data);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await db.sleepEntries.add({
      userId: getUserId(),
      date: new Date().toISOString(),
      sleepTime,
      wakeTime,
      quality,
      mood,
      notes,
    });

    setSleepTime("");
    setWakeTime("");
    setQuality(3);
    setMood(3);
    setNotes("");

    loadEntries();
  }

  return (
    <AuthGuard>
      <div className="space-y-8">
        <h1 className="text-2xl font-bold">Sleep Diary</h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 max-w-md"
        >
          <input
            type="time"
            value={sleepTime}
            onChange={(e) => setSleepTime(e.target.value)}
            className="w-full border p-2"
            required
          />

          <input
            type="time"
            value={wakeTime}
            onChange={(e) => setWakeTime(e.target.value)}
            className="w-full border p-2"
            required
          />

          <input
            type="number"
            min="1"
            max="5"
            value={quality}
            onChange={(e) => setQuality(+e.target.value)}
            className="w-full border p-2"
            placeholder="Sleep quality (1–5)"
          />

          <input
            type="number"
            min="1"
            max="5"
            value={mood}
            onChange={(e) => setMood(+e.target.value)}
            className="w-full border p-2"
            placeholder="Mood / energy (1–5)"
          />

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full border p-2"
            placeholder="Notes"
          />

          <button className="bg-black text-white px-4 py-2">
            Save Entry
          </button>
        </form>

        <div>
          <h2 className="font-semibold mb-2">Past Entries</h2>
          <div className="space-y-2">
            {entries.map((e) => (
              <div key={e.id} className="border p-3 rounded">
                <p className="text-sm text-gray-500">
                  {new Date(e.date).toLocaleDateString()}
                </p>
                <p>
                  {e.sleepTime} → {e.wakeTime} (
                  {calculateSleepDuration(
                    e.sleepTime,
                    e.wakeTime
                  )}
                  h)
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
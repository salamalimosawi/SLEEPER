"use client";

import { useEffect, useState } from "react";
import { db, SleepEntry } from "../../lib/db";
import { calculateStreak } from "../../lib/streakUtils";
import { calculateSleepWindow } from "../../lib/cbtiUtils";
import AuthGuard from "../../components/AuthGuard";

export default function Dashboard() {
  const [entries, setEntries] = useState<SleepEntry[]>([]);
  const [streak, setStreak] = useState(0);
  const [sleepWindow, setSleepWindow] = useState<any>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const all = await db.sleepEntries.orderBy("date").reverse().toArray();
    setEntries(all);
    setStreak(calculateStreak(all));
    setSleepWindow(calculateSleepWindow(all));
  }

  return (
    <AuthGuard>
      <main className="min-h-screen p-8 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        {/* STREAK */}
        <div className="border rounded p-4 mb-4">
          <p className="text-sm text-gray-500">Current Streak</p>
          <p className="text-3xl font-bold">🔥 {streak} days</p>
        </div>

        {/* SLEEP WINDOW */}
        {sleepWindow && (
          <div className="border rounded p-4 mb-4">
            <p className="text-sm text-gray-500">
              Tonight’s Recommended Sleep Window (CBT-I)
            </p>
            <p className="text-lg mt-2">
              🛏 Bedtime: <strong>{sleepWindow.bedtime}</strong>
            </p>
            <p className="text-lg">
              ⏰ Wake Time: <strong>{sleepWindow.wakeTime}</strong>
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Avg sleep: {sleepWindow.avgSleep}h · Time in bed:{" "}
              {sleepWindow.timeInBed}h
            </p>
          </div>
        )}

        {!sleepWindow && (
          <p className="text-gray-500">
            Add sleep entries to calculate your sleep window.
          </p>
        )}
      </main>
    </AuthGuard>
  );
}
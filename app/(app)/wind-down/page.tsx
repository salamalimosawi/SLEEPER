"use client";

import { useEffect, useState } from "react";
import AuthGuard from "../../../components/AuthGuard";
import {
  getTodayHabits,
  saveTodayHabits,
} from "../../../lib/habits";

export default function WindDown() {
  const [habits, setHabits] = useState({
    noScreens: false,
    dimLights: false,
    breathing: false,
    journaling: false,
  });

  useEffect(() => {
    loadHabits();
  }, []);

  async function loadHabits() {
    const data = await getTodayHabits();
    if (data) {
      setHabits({
        noScreens: data.noScreens,
        dimLights: data.dimLights,
        breathing: data.breathing,
        journaling: data.journaling,
      });
    }
  }

  async function toggleHabit(key: keyof typeof habits) {
    const updated = { ...habits, [key]: !habits[key] };
    setHabits(updated);
    await saveTodayHabits(updated);
  }

  return (
    <AuthGuard>
      <div>
        <h1 className="text-2xl font-bold mb-6">
          Wind-Down Routine
        </h1>

        <div className="space-y-4">
          {(
            [
              ["noScreens", "📵 No screens"],
              ["dimLights", "💡 Dim lights"],
              ["breathing", "🧘 Breathing exercise"],
              ["journaling", "✍️ Journaling"],
            ] as const
          ).map(([key, label]) => (
            <label
              key={key}
              className="flex items-center gap-3 border p-3 rounded cursor-pointer"
            >
              <input
                type="checkbox"
                checked={habits[key]}
                onChange={() => toggleHabit(key)}
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </div>
    </AuthGuard>
  );
}
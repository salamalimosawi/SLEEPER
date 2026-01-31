"use client";

import { useEffect, useState } from "react";
import { getUserStats, UserStats } from "../../../lib/stats";
import AuthGuard from "../../../components/AuthGuard";
import { GardenStage } from "../../../lib/garden";

const gardenEmoji: Record<GardenStage, string> = {
  seed: "🌱",
  sprout: "🌿",
  tree: "🌳",
};

export default function Dashboard() {
  const [stats, setStats] = useState<UserStats | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    const data = await getUserStats();
    setStats(data);
  }

  if (!stats) return null;

  return (
    <AuthGuard>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        {/* Garden */}
        <div className="border p-4 rounded text-center">
          <p className="text-sm text-gray-500">Your Garden</p>
          <p className="text-5xl">
            {gardenEmoji[stats.garden.stage]}
          </p>
          <p className="text-sm text-gray-600">
            XP: {stats.garden.xp}
          </p>
        </div>

        {/* Streak */}
        <div className="border p-4 rounded">
          <p className="text-sm text-gray-500">
            Current Streak
          </p>
          <p className="text-3xl font-bold">
            🔥 {stats.streak} days
          </p>
        </div>

        {/* Sleep Window */}
        {stats.sleepWindow && (
          <div className="border p-4 rounded">
            <p className="text-sm text-gray-500">
              Tonight’s Sleep Window
            </p>
            <p>
              🛏 Bedtime:{" "}
              <strong>{stats.sleepWindow.bedtime}</strong>
            </p>
            <p>
              ⏰ Wake:{" "}
              <strong>{stats.sleepWindow.wakeTime}</strong>
            </p>
          </div>
        )}

        {/* Insights */}
        <div className="border p-4 rounded">
          <p className="text-sm text-gray-500 mb-2">
            Weekly Insights
          </p>
          <ul className="space-y-1">
            {stats.insights.map((i) => (
              <li key={i.id}>• {i.message}</li>
            ))}
          </ul>
        </div>
      </div>
    </AuthGuard>
  );
}
import { db, SleepEntry } from "./db";
import { getUserId } from "./auth";
import { calculateSleepDuration } from "./sleepUtils";
import { calculateStreak } from "./streakUtils";
import { calculateSleepWindow } from "./cbtiUtils";
import { calculateGardenState, GardenState } from "./garden";
import { generateInsights, Insight } from "./insights";
import { calculateCBTIState, CBTIState } from "./cbti/engine";
import { stimulusControlRules } from "./cbti/rules";

export interface UserStats {
  entries: SleepEntry[];
  streak: number;
  avgSleep: number;
  sleepWindow: any;
  garden: GardenState;
  insights: Insight[];
  cbti: CBTIState;
  rules: string[];
}

function today(): string {
  return new Date().toISOString().split("T")[0];
}

export async function getUserStats(): Promise<UserStats> {
  const userId = getUserId();

  const entries = await db.sleepEntries
    .where("userId")
    .equals(userId)
    .reverse()
    .toArray();

  const streak = calculateStreak(entries);

  const avgSleep =
    entries.length === 0
      ? 0
      : Math.round(
          (entries
            .slice(0, 7)
            .reduce(
              (sum, e) =>
                sum +
                calculateSleepDuration(e.sleepTime, e.wakeTime),
              0
            ) /
            Math.min(7, entries.length)) *
            10
        ) / 10;

  const sleepWindow = calculateSleepWindow(entries);

  const habitsToday = await db.habitEntries
    .where("[userId+date]")
    .equals([userId, today()])
    .first();

  const garden = calculateGardenState(
    streak,
    habitsToday ?? null
  );

  const insights = generateInsights(
    entries,
    await db.habitEntries
      .where("userId")
      .equals(userId)
      .toArray()
  );

  const cbti = calculateCBTIState(entries);

  return {
    entries,
    streak,
    avgSleep,
    sleepWindow,
    garden,
    insights,
    cbti,
    rules: stimulusControlRules,
  };
}
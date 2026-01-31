import { SleepEntry } from "../db";
import { calculateSleepDuration } from "../sleepUtils";

export interface CBTIState {
  week: number;
  sleepEfficiency: number;
  timeInBed: number;
  recommendation: string;
}

export function calculateCBTIState(
  entries: SleepEntry[]
): CBTIState {
  if (entries.length < 5) {
    return {
      week: 0,
      sleepEfficiency: 0,
      timeInBed: 0,
      recommendation:
        "Add more sleep entries to begin CBT-I.",
    };
  }

  const last7 = entries.slice(0, 7);

  const totalSleep = last7.reduce(
    (sum, e) =>
      sum +
      calculateSleepDuration(e.sleepTime, e.wakeTime),
    0
  );

  const totalTimeInBed = last7.length * 8; // assume 8h window initially

  const sleepEfficiency =
    Math.round((totalSleep / totalTimeInBed) * 100);

  let timeInBed = 8;
  let recommendation = "";

  if (sleepEfficiency < 85) {
    timeInBed = Math.max(5, totalSleep / last7.length);
    recommendation =
      "⏱ Reduce time in bed to improve sleep efficiency.";
  } else if (sleepEfficiency > 90) {
    timeInBed = Math.min(9, 8.5);
    recommendation =
      "⬆️ Increase time in bed slightly.";
  } else {
    recommendation =
      "✅ Maintain your current sleep schedule.";
  }

  const week = Math.floor(entries.length / 7);

  return {
    week,
    sleepEfficiency,
    timeInBed: Math.round(timeInBed * 10) / 10,
    recommendation,
  };
}
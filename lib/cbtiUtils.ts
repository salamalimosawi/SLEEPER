import { SleepEntry } from "./db";
import { calculateSleepDuration } from "./sleepUtils";

export function calculateSleepWindow(entries: SleepEntry[]) {
  if (entries.length === 0) {
    return null;
  }

  const last7 = entries.slice(0, 7);

  const avgSleep =
    last7.reduce(
      (sum, e) =>
        sum + calculateSleepDuration(e.sleepTime, e.wakeTime),
      0
    ) / last7.length;

  // CBT-I bounds
  const timeInBed = Math.min(9, Math.max(5, avgSleep));

  // Use most recent wake time
  const lastWake = last7[0].wakeTime;
  const [wh, wm] = lastWake.split(":").map(Number);

  let bedtimeMinutes = wh * 60 + wm - timeInBed * 60;
  if (bedtimeMinutes < 0) bedtimeMinutes += 24 * 60;

  const bh = Math.floor(bedtimeMinutes / 60) % 24;
  const bm = Math.round(bedtimeMinutes % 60);

  return {
    avgSleep: Math.round(avgSleep * 10) / 10,
    timeInBed: Math.round(timeInBed * 10) / 10,
    bedtime: `${bh.toString().padStart(2, "0")}:${bm
      .toString()
      .padStart(2, "0")}`,
    wakeTime: lastWake,
  };
}
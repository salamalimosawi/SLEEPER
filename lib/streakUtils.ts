import { SleepEntry } from "./db";

export function calculateStreak(entries: SleepEntry[]): number {
  if (entries.length === 0) return 0;

  const dates = entries
    .map(e => new Date(e.date).toDateString())
    .filter((v, i, a) => a.indexOf(v) === i);

  let streak = 1;

  for (let i = 0; i < dates.length - 1; i++) {
    const current = new Date(dates[i]);
    const next = new Date(dates[i + 1]);

    const diff = (current.getTime() - next.getTime()) / (1000 * 60 * 60 * 24);

    if (diff === 1) streak++;
    else break;
  }

  return streak;
}
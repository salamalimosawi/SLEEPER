import { SleepEntry, HabitEntry } from "./db";
import { calculateSleepDuration } from "./sleepUtils";

export interface Insight {
  id: string;
  message: string;
}

function avg(nums: number[]): number {
  return nums.length === 0
    ? 0
    : nums.reduce((a, b) => a + b, 0) / nums.length;
}

function hoursVariance(times: string[]): number {
  const minutes = times.map((t) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  });

  const mean = avg(minutes);
  return avg(minutes.map((m) => Math.pow(m - mean, 2)));
}

export function generateInsights(
  sleepEntries: SleepEntry[],
  habitEntries: HabitEntry[]
): Insight[] {
  const insights: Insight[] = [];

  const last7 = sleepEntries.slice(0, 7);
  const prev7 = sleepEntries.slice(7, 14);

  const lastAvg = avg(
    last7.map((e) =>
      calculateSleepDuration(e.sleepTime, e.wakeTime)
    )
  );
  const prevAvg = avg(
    prev7.map((e) =>
      calculateSleepDuration(e.sleepTime, e.wakeTime)
    )
  );

  if (last7.length >= 3) {
    if (lastAvg > prevAvg + 0.3) {
      insights.push({
        id: "sleep-up",
        message:
          "⬆️ Your average sleep increased this week. Keep it up!",
      });
    } else if (lastAvg + 0.3 < prevAvg) {
      insights.push({
        id: "sleep-down",
        message:
          "⬇️ You slept less this week. Try protecting your sleep window.",
      });
    }
  }

  const wakeVariance = hoursVariance(
    last7.map((e) => e.wakeTime)
  );

  if (wakeVariance > 600) {
    insights.push({
      id: "wake-inconsistent",
      message:
        "⏰ Your wake times are inconsistent. Waking up at the same time daily can improve sleep quality.",
    });
  } else if (wakeVariance > 0) {
    insights.push({
      id: "wake-consistent",
      message:
        "✅ Your wake times are fairly consistent. Great habit!",
    });
  }

  const habitDays = habitEntries.filter(
    (h) =>
      h.noScreens ||
      h.dimLights ||
      h.breathing ||
      h.journaling
  ).length;

  if (habitDays >= 3) {
    insights.push({
      id: "habits-help",
      message:
        "🌱 Wind-down habits were completed on multiple nights. These routines support better sleep.",
    });
  }

  if (insights.length === 0) {
    insights.push({
      id: "no-insights",
      message:
        "Add more sleep entries to unlock personalized insights.",
    });
  }

  return insights;
}
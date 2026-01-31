import { db, HabitEntry } from "./db";
import { getUserId } from "./auth";

function today(): string {
  return new Date().toISOString().split("T")[0];
}

export async function getTodayHabits(): Promise<HabitEntry | null> {
  const userId = getUserId();
  const date = today();

  const result = await db.habitEntries
    .where("[userId+date]")
    .equals([userId, date])
    .first();

  return result ?? null;
}

export async function saveTodayHabits(
  habits: Omit<HabitEntry, "id" | "userId" | "date">
) {
  const userId = getUserId();
  const date = today();

  const existing = await getTodayHabits();

  if (existing) {
    await db.habitEntries.update(existing.id!, habits);
  } else {
    await db.habitEntries.add({
      userId,
      date,
      ...habits,
    });
  }
}
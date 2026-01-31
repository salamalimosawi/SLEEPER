import { HabitEntry } from "./db";

export type GardenStage = "seed" | "sprout" | "tree";

export interface GardenState {
  xp: number;
  stage: GardenStage;
}

export function calculateGardenState(
  streak: number,
  habits: HabitEntry | null
): GardenState {
  const habitsCompleted = habits
    ? [
        habits.noScreens,
        habits.dimLights,
        habits.breathing,
        habits.journaling,
      ].filter(Boolean).length
    : 0;

  const xp = streak * 10 + habitsCompleted * 5;

  let stage: GardenStage = "seed";
  if (xp >= 150) stage = "tree";
  else if (xp >= 50) stage = "sprout";

  return { xp, stage };
}
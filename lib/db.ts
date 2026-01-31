import Dexie, { Table } from "dexie";

export interface SleepEntry {
  id?: number;
  userId: string;
  date: string;
  sleepTime: string;
  wakeTime: string;
  quality: number;
  mood: number;
  notes?: string;
}

export interface HabitEntry {
  id?: number;
  userId: string;
  date: string; // YYYY-MM-DD
  noScreens: boolean;
  dimLights: boolean;
  breathing: boolean;
  journaling: boolean;
}

class CodeSleepDB extends Dexie {
  sleepEntries!: Table<SleepEntry>;
  habitEntries!: Table<HabitEntry>;

  constructor() {
    super("CodeSleepDB");

    this.version(4).stores({
      sleepEntries: "++id, userId, date",
      habitEntries: "++id, [userId+date]",
    });
  }
}

export const db = new CodeSleepDB();
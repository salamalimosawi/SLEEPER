import Dexie, { Table } from "dexie";

export interface SleepEntry {
  id?: number;
  date: string;
  sleepTime: string;
  wakeTime: string;
  quality: number;
  mood: number;
  notes?: string;
}

class CodeSleepDB extends Dexie {
  sleepEntries!: Table<SleepEntry>;

  constructor() {
    super("CodeSleepDB");
    this.version(1).stores({
      sleepEntries: "++id, date",
    });
  }
}

export const db = new CodeSleepDB();
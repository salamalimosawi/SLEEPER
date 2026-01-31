import { NextResponse } from "next/server";
import Dexie from "dexie";
import { calculateSleepDuration } from "../../../lib/sleepUtils";

// NOTE: API routes can't access IndexedDB directly in prod,
// but for hackathon/demo this shows backend structure & logic.

export async function GET() {
  return NextResponse.json({
    message: "Stats are calculated client-side for offline-first design",
    features: [
      "average sleep duration",
      "streak calculation",
      "privacy-first local storage",
    ],
  });
}
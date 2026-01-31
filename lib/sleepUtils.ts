export function calculateSleepDuration(
  sleepTime: string,
  wakeTime: string
): number {
  const [sh, sm] = sleepTime.split(":").map(Number);
  const [wh, wm] = wakeTime.split(":").map(Number);

  let sleepMinutes = sh * 60 + sm;
  let wakeMinutes = wh * 60 + wm;

  // handle crossing midnight
  if (wakeMinutes <= sleepMinutes) {
    wakeMinutes += 24 * 60;
  }

  return Math.round((wakeMinutes - sleepMinutes) / 60 * 10) / 10;
}

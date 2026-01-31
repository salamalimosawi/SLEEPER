"use client";

import AuthGuard from "@/components/AuthGuard";
import { useEffect, useState } from "react";

export default function Relaxation() {
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [seconds, setSeconds] = useState(4);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;

    const timer = setInterval(() => {
      setSeconds((s) => s - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [running]);

  useEffect(() => {
    if (!running) return;

    if (seconds === 0) {
      if (phase === "inhale") {
        setPhase("hold");
        setSeconds(7);
      } else if (phase === "hold") {
        setPhase("exhale");
        setSeconds(8);
      } else {
        setPhase("inhale");
        setSeconds(4);
      }
    }
  }, [seconds, phase, running]);

  return (
    <AuthGuard>
      <main className="min-h-screen p-8 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-6">4-7-8 Breathing</h1>

        <div className="w-40 h-40 rounded-full border-4 flex items-center justify-center mb-6">
          <span className="text-xl font-semibold capitalize">
            {phase}
          </span>
        </div>

        <p className="text-3xl mb-6">{seconds}</p>

        {!running ? (
          <button
            onClick={() => {
              setRunning(true);
              setPhase("inhale");
              setSeconds(4);
            }}
            className="bg-black text-white px-6 py-2"
          >
            Start
          </button>
        ) : (
          <button
            onClick={() => setRunning(false)}
            className="border px-6 py-2"
          >
            Stop
          </button>
        )}
      </main>
    </AuthGuard>
  );
}
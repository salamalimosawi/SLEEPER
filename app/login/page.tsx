"use client";

import { useState } from "react";
import { login } from "../../lib/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    login(username);
    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="border p-6 rounded w-80 space-y-4"
      >
        <h1 className="text-xl font-bold text-center">Login</h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border p-2"
          required
        />

        <button className="bg-black text-white w-full py-2">
          Enter
        </button>

        <p className="text-xs text-gray-500 text-center">
          Offline · No account required
        </p>
      </form>
    </main>
  );
}
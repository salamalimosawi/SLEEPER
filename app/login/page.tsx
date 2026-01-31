"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="border p-8 rounded text-center space-y-4">
        <h1 className="text-2xl font-bold">Welcome to Code Sleep</h1>
        <p className="text-sm text-gray-500">
          Sign in to continue
        </p>

        <button
          onClick={() => signIn("google")}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Sign in with Google
        </button>
      </div>
    </main>
  );
}
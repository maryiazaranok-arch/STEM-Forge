"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function handleReset() {
    setMessage("");

    const { error } = await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo: "http://localhost:3000/update-password",
      }
    );

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Password reset email sent!");
  }

  return (
    <main className="min-h-screen bg-[#0D1117] text-white flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-[#161B22] p-8 rounded-2xl border border-gray-800">

        <h1 className="text-3xl font-bold mb-3">
          Forgot Password?
        </h1>

        <p className="text-gray-400 mb-6">
          Enter your email and we'll send you a reset link.
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-lg bg-[#0D1117] border border-gray-700 outline-none focus:border-purple-500"
        />

        <button
          onClick={handleReset}
          className="w-full mt-4 bg-gradient-to-r from-violet-500/80 to-blue-500/80 p-3 rounded-lg hover:from-violet-500 hover:to-blue-500 transition"
        >
          Send Reset Link
        </button>

        {message && (
          <p className="text-gray-300 text-sm mt-4">
            {message}
          </p>
        )}

      </div>

    </main>
  );
}
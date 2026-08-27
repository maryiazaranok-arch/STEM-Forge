"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ForgotPasswordPage() {
  const router = useRouter();

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
    <main className="min-h-screen bg-[#F5F4F0] text-[#202733] flex items-center justify-center px-6 py-10">

      <div className="w-full max-w-xl">

        <div className="flex items-center justify-between mb-12">

          <button
            onClick={() => router.push("/")}
            className="text-xl font-bold tracking-tight hover:text-[#5F7F91] transition"
          >
            STEM Forge
          </button>

          <button
            onClick={() => router.push("/login")}
            className="text-sm text-[#6F7782] hover:text-[#202733] transition"
          >
            Back to login
          </button>

        </div>

        <div className="mb-8">

          <p className="text-sm text-[#5F7F91] font-medium mb-3">
            Account
          </p>

          <h1 className="text-4xl font-bold tracking-tight">
            Reset your password
          </h1>

          <p className="text-[#6F7782] mt-3 leading-relaxed">
            Enter your email and we'll send you a link to create a new
            password.
          </p>

        </div>

        <div className="bg-white border border-[#DFE1DE] rounded-2xl p-8 shadow-sm">

          <div>

            <label className="block text-sm font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3.5 rounded-lg bg-[#F8F8F6] border border-[#DFE1DE] outline-none placeholder:text-[#9BA2AA] focus:border-[#5F7F91] transition"
            />

          </div>

          <button
            onClick={handleReset}
            className="w-full mt-5 py-3.5 rounded-lg bg-[#202733] text-white font-medium hover:bg-[#303948] transition"
          >
            Send Reset Link
          </button>

          {message && (
            <p className="text-sm text-[#6F7782] mt-5">
              {message}
            </p>
          )}

        </div>

        <p className="text-center text-xs text-[#9A9DA4] mt-6">
          Build. Research. Create.
        </p>

      </div>

    </main>
  );
}
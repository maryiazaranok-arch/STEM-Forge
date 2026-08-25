"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleLogin() {
    setMessage("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    const user = data.user;

    if (!user) {
      setMessage("Could not find user.");
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", user.id)
      .maybeSingle();

    if (profileError) {
      console.error(profileError);
      setMessage("Could not check your profile.");
      return;
    }

    if (profile) {
      router.push("/dashboard");
    } else {
      router.push("/profile");
    }
  }

  return (
    <main className="min-h-screen bg-[#F5F0E8] text-[#2C211B] flex items-center justify-center px-6">

      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-10">

          <button
            onClick={() => router.push("/")}
            className="text-xl font-bold tracking-tight hover:text-[#8A5A3B] transition"
          >
            STEM Forge
          </button>

        </div>

        {/* Card */}
        <div className="bg-[#FFFDF8] border border-[#E5D9CA] rounded-3xl p-8 md:p-10 shadow-sm">

          <div className="mb-8">

            <p className="text-sm uppercase tracking-[0.2em] text-[#8A5A3B] font-medium mb-3">
              Welcome back
            </p>

            <h1 className="text-3xl font-bold tracking-tight">
              Log in
            </h1>

            <p className="text-[#796B60] mt-3 leading-relaxed">
              Continue building projects and collaborating with students.
            </p>

          </div>

          <div className="space-y-5">

            {/* Email */}
            <div>

              <label className="block text-sm font-medium text-[#4A3B32] mb-2">
                Email
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#F8F3EC] border border-[#E2D5C6] text-[#2C211B] placeholder:text-[#A69A8F] outline-none focus:border-[#8A5A3B] focus:ring-2 focus:ring-[#8A5A3B]/10 transition"
              />

            </div>

            {/* Password */}
            <div>

              <label className="block text-sm font-medium text-[#4A3B32] mb-2">
                Password
              </label>

              <input
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#F8F3EC] border border-[#E2D5C6] text-[#2C211B] placeholder:text-[#A69A8F] outline-none focus:border-[#8A5A3B] focus:ring-2 focus:ring-[#8A5A3B]/10 transition"
              />

            </div>

            {/* Forgot password */}
            <button
              onClick={() => router.push("/forgot-password")}
              className="text-sm text-[#796B60] hover:text-[#8A5A3B] transition"
            >
              Forgot password?
            </button>

            {/* Login button */}
            <button
              onClick={handleLogin}
              className="w-full py-3.5 rounded-full bg-[#8A5A3B] text-white font-medium hover:bg-[#68422D] hover:-translate-y-0.5 transition-all shadow-md shadow-[#8A5A3B]/15"
            >
              Login
            </button>

            {message && (
              <p className="text-sm text-red-500">
                {message}
              </p>
            )}

          </div>

          <p className="text-center text-sm text-[#796B60] mt-7">
            Don't have an account?{" "}
            <button
              onClick={() => router.push("/register")}
              className="font-medium text-[#8A5A3B] hover:text-[#68422D] transition"
            >
              Create one
            </button>
          </p>

        </div>

        <p className="text-center text-xs text-[#A69A8F] mt-6">
          Build. Research. Create.
        </p>

      </div>

    </main>
  );
}
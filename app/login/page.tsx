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
            onClick={() => router.push("/register")}
            className="text-sm font-medium text-[#6F7782] hover:text-[#202733] transition"
          >
            Sign up
          </button>

        </div>

        <div className="mb-8">

          <p className="text-sm uppercase tracking-[0.16em] font-semibold text-[#5F7F91] mb-3">
            Welcome back
          </p>

          <h1 className="text-4xl font-bold tracking-tight">
            Log in
          </h1>

          <p className="text-base text-[#6F7782] mt-3 leading-relaxed">
            Continue your work and projects on STEM Forge.
          </p>

        </div>

        <div className="bg-white border border-[#DFE1DE] rounded-2xl p-8 md:p-9 shadow-sm">

          <div className="space-y-6">

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

            <div>

              <div className="flex items-center justify-between mb-2">

                <label className="block text-sm font-medium">
                  Password
                </label>

                <button
                  onClick={() => router.push("/forgot-password")}
                  className="text-sm text-[#6F7782] hover:text-[#5F7F91] transition"
                >
                  Forgot password?
                </button>

              </div>

              <input
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3.5 rounded-lg bg-[#F8F8F6] border border-[#DFE1DE] outline-none placeholder:text-[#9BA2AA] focus:border-[#5F7F91] transition"
              />
            </div>

            <button
              onClick={handleLogin}
              className="w-full py-3.5 rounded-lg bg-[#202733] text-white font-medium hover:bg-[#303948] transition"
            >
              Log in
            </button>

            {message && (
              <p className="text-sm text-red-500">
                {message}
              </p>
            )}

          </div>

          <p className="text-center text-sm text-[#6F7782] mt-7">
            Don't have an account?{" "}
            <button
              onClick={() => router.push("/register")}
              className="font-medium text-[#5F7F91] hover:text-[#202733] transition"
            >
              Sign up
            </button>
          </p>

        </div>

      </div>

    </main>
  );
}
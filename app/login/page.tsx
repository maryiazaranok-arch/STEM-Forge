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
    <main className="min-h-screen bg-[#0D1117] text-white flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-[#161B22] p-8 rounded-2xl border border-gray-800">

        <h1 className="text-3xl font-bold mb-6">
          Welcome Back
        </h1>

        <div className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#0D1117] border border-gray-700 outline-none focus:border-purple-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#0D1117] border border-gray-700 outline-none focus:border-purple-500"
          />

          <button
            onClick={() => router.push("/forgot-password")}
            className="text-sm text-gray-400 hover:text-violet-400 transition"
          >
            Forgot password?
          </button>
                                                                                                                                              
          <button
            onClick={handleLogin}
            className="w-full bg-[#8B5CF6] p-3 rounded-lg hover:bg-purple-700 transition"
          >
            Login
          </button>

          {message && (
            <p className="text-red-400 text-sm">
              {message}
            </p>
          )}

        </div>

      </div>

    </main>
  );
}
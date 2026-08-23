"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
        emailRedirectTo: "http://localhost:3000/profile",
      },
    });

    if (error) {
      alert(error.message);
      return;
    }

    const user = data.user;

    if (!user) {
      alert("Account could not be created.");
      return;
    }

    const { error: profileError } = await supabase
      .from("profiles")
      .insert({
        id: user.id,
        full_name: name,
        skills: [],
        interests: [],
        goals: [],
      });

    if (profileError) {
      console.error(profileError);
      alert("Account created, but profile could not be created.");
      return;
    }

    alert("Account created! Check your email.");

    router.push("/profile");
  };

  return (
    <main className="min-h-screen bg-[#F5F0E8] text-[#2C211B] flex items-center justify-center px-6">

      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-10">

          <button
            onClick={() => router.push("/")}
            className="text-xl font-bold tracking-tight text-[#2C211B] hover:text-[#8A5A3B] transition"
          >
            STEM Forge
          </button>

        </div>

        {/* Card */}
        <div className="bg-[#FFFDF8] border border-[#E5D9CA] rounded-3xl p-8 md:p-10 shadow-sm">

          <div className="mb-8">

            <p className="text-sm uppercase tracking-[0.2em] text-[#8A5A3B] font-medium mb-3">
              Get started
            </p>

            <h1 className="text-3xl font-bold tracking-tight">
              Create your account
            </h1>

            <p className="text-[#796B60] mt-3 leading-relaxed">
              Join STEM Forge and start building something meaningful.
            </p>

          </div>

          <div className="space-y-5">

            {/* Name */}
            <div>

              <label className="block text-sm font-medium text-[#4A3B32] mb-2">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#F8F3EC] border border-[#E2D5C6] text-[#2C211B] placeholder:text-[#A69A8F] outline-none focus:border-[#8A5A3B] focus:ring-2 focus:ring-[#8A5A3B]/10 transition"
              />

            </div>

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
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#F8F3EC] border border-[#E2D5C6] text-[#2C211B] placeholder:text-[#A69A8F] outline-none focus:border-[#8A5A3B] focus:ring-2 focus:ring-[#8A5A3B]/10 transition"
              />

            </div>

            {/* Button */}
            <button
              onClick={handleRegister}
              className="w-full py-3.5 rounded-full bg-[#8A5A3B] text-white font-medium hover:bg-[#68422D] hover:-translate-y-0.5 shadow-md shadow-[#8A5A3B]/15 transition-all"
            >
              Create Account
            </button>

          </div>

          <p className="text-center text-sm text-[#796B60] mt-7">
            Already have an account?{" "}
            <button
              onClick={() => router.push("/login")}
              className="font-medium text-[#8A5A3B] hover:text-[#68422D] transition"
            >
              Log in
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

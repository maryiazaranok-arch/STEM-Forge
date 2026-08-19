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

    // Create an empty profile immediately after registration
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
    <main className="min-h-screen bg-[#0D1117] text-white flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-[#161B22] p-8 rounded-2xl border border-gray-800">

        <h1 className="text-3xl font-bold mb-6">
          Create Account
        </h1>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#0D1117] border border-gray-700 outline-none focus:border-purple-500"
          />

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
            onClick={handleRegister}
            className="w-full bg-gradient-to-r from-violet-500/80 to-blue-500/80 p-3 rounded-lg hover:from-violet-500 hover:to-blue-500 transition"
          >
            Create Account
          </button>

        </div>

      </div>

    </main>
  );
}

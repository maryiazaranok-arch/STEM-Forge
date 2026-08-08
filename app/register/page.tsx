"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });


    if (error) {
      alert(error.message);
      return;
    }


    alert("Account created! Check your email.");

    console.log(data);

  };


  return (
    <main className="min-h-screen bg-[#0D1117] text-white flex items-center justify-center">

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
            className="w-full p-3 rounded-lg bg-[#0D1117] border border-gray-700"
          />


          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#0D1117] border border-gray-700"
          />


          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#0D1117] border border-gray-700"
          />


          <button
            onClick={handleRegister}
            className="w-full bg-[#8B5CF6] p-3 rounded-lg hover:bg-purple-700 transition"
          >
            Create Account
          </button>


        </div>

      </div>

    </main>
  );
}

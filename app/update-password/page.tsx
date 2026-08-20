"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function UpdatePasswordPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setReady(true);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function handleUpdatePassword() {
    setMessage("");

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Password updated successfully!");

    setTimeout(() => {
      router.push("/login");
    }, 1500);
  }

  return (
    <main className="min-h-screen bg-[#0D1117] text-white flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-[#161B22] p-8 rounded-2xl border border-gray-800">

        <h1 className="text-3xl font-bold mb-3">
          Reset Password
        </h1>

        <p className="text-gray-400 mb-6">
          Enter your new password below.
        </p>

        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-lg bg-[#0D1117] border border-gray-700 outline-none focus:border-purple-500"
        />

        <button
          onClick={handleUpdatePassword}
          className="w-full mt-4 bg-gradient-to-r from-violet-500/80 to-blue-500/80 p-3 rounded-lg hover:from-violet-500 hover:to-blue-500 transition"
        >
          Update Password
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
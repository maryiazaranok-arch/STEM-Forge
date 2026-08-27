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
            Create a new password
          </h1>

          <p className="text-[#6F7782] mt-3 leading-relaxed max-w-lg">
            Choose a new password for your STEM Forge account.
          </p>

        </div>

        <div className="bg-white border border-[#DFE1DE] rounded-2xl p-8 shadow-sm">

          <div>

            <label className="block text-sm font-medium mb-2">
              New Password
            </label>

            <input
              type="password"
              placeholder="Enter a new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3.5 rounded-lg bg-[#F8F8F6] border border-[#DFE1DE] outline-none placeholder:text-[#9BA2AA] focus:border-[#5F7F91] transition"
            />

            <p className="text-xs text-[#8C939D] mt-2">
              Password must be at least 6 characters.
            </p>

          </div>

          <button
            onClick={handleUpdatePassword}
            className="w-full mt-6 py-3.5 rounded-lg bg-[#202733] text-white font-medium hover:bg-[#303948] transition"
          >
            Update Password
          </button>

          {message && (
            <p
              className={`text-sm mt-5 ${
                message === "Password updated successfully!"
                  ? "text-[#5F7F91]"
                  : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}

        </div>

      </div>

    </main>
  );
}
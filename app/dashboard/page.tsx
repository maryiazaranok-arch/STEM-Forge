"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const [name, setName] = useState("");
  const [skills, setSkills] = useState("");
  const router = useRouter();

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("profiles")
      .select("full_name, skills")
      .eq("id", user.id)
      .single();

    if (data) {
      setName(data.full_name);
      setSkills(data.skills || "");
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <main className="min-h-screen bg-[#0D1117] text-white px-6 py-12">

      <div className="flex justify-between items-center mb-12">

        <h1 className="font-bold text-xl bg-gradient-to-r from-violet-500/80 to-blue-500/80 bg-clip-text text-transparent">
          STEM Forge
        </h1>

        <div className="flex items-center gap-6">

          <button
            onClick={() => router.push("/dashboard")}
            className="text-gray-300 hover:bg-gradient-to-r hover:from-violet-500/80 hover:to-blue-500/80 hover:bg-clip-text hover:text-transparent transition"
          >
            Dashboard
          </button>

          <button
            onClick={() => router.push("/projects")}
            className="text-gray-300 hover:bg-gradient-to-r hover:from-violet-500/80 hover:to-blue-500/80 hover:bg-clip-text hover:text-transparent transition"
          >
            Projects
          </button>

          <button
            onClick={() => router.push("/profile")}
            className="text-gray-300 hover:bg-gradient-to-r hover:from-violet-500/80 hover:to-blue-500/80 hover:bg-clip-text hover:text-transparent transition"
          >
            Profile
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg border border-gray-700 text-gray-300 hover:border-red-500 hover:text-red-400 transition"
          >
            Logout
          </button>

        </div>

      </div>

      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold">
          Welcome{name ? `, ${name}` : ""}!
        </h1>

        <p className="text-gray-400 mt-3">
          Welcome back to STEM Forge.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mt-10">

  <div className="bg-[#161B22] border border-gray-800 rounded-2xl p-6">

    <h2 className="text-xl font-bold mb-3">
      Your Skills
    </h2>

    <p className="text-gray-400">
      {skills || "No skills added yet."}
    </p>

  </div>

  <div className="bg-[#161B22] border border-gray-800 rounded-2xl p-6">

    <h2 className="text-xl font-bold mb-3">
      Projects
    </h2>

    <p className="text-gray-400">
      0 Projects
    </p>

  </div>

</div>

      </div>

    </main>
  );
}
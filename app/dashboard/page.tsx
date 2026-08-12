"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const [name, setName] = useState("");
  const [skills, setSkills] = useState("");

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

  return (
    <main className="min-h-screen bg-[#0D1117] text-white px-6 py-12">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold">
          Welcome{name ? `, ${name}` : ""}!
        </h1>

        <p className="text-gray-400 mt-3">
          Welcome back to STEM Forge.
        </p>

        <div className="mt-8">

          <h2 className="text-xl font-bold mb-3">
            Your Skills
          </h2>

          <p className="text-gray-400">
            {skills || "No skills added yet."}
          </p>

        </div>

      </div>

    </main>
  );
}
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
  loadProjects();
}, []);

async function loadProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  setProjects(data || []);
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

        </div>

      </div>

      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold">
          Projects
        </h1>

        <p className="text-gray-400 mt-3">
          Discover projects and find teammates.
        </p>

        <button
        onClick={() => router.push("/projects/create")}
        className="mt-8 px-5 py-3 rounded-xl bg-gradient-to-r from-violet-500/70 to-blue-500/70 hover:from-violet-500 hover:to-blue-500 transition font-medium shadow-lg shadow-violet-500/10"
        >
         Create Project
        </button>

        <div className="mt-10 space-y-4">

    {projects.map((project) => (
      

</div>

      </div>

    </main>
  );
}
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const [name, setName] = useState("");
  const [skills, setSkills] = useState("");
  const [projectCount, setProjectCount] = useState(0);
  const [projects, setProjects] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
  loadProfile();
  loadProjects();
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

  async function loadProjects() {
  const { data } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (data) {
    setProjects(data);
    setProjectCount(data.length);
  }
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

        <h1 className="text-5xl font-bold bg-gradient-to-r from-violet-500/90 to-blue-500/90 bg-clip-text text-transparent">
          Welcome{name ? `, ${name}` : ""}!
        </h1>

        <p className="text-gray-400 mt-4 text-lg">
          Build. Research. Create.
        </p>

        <p className="text-gray-500 mt-2">
          Find teammates, launch projects, and grow your portfolio.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mt-10">

  <div className="bg-[#161B22] border border-gray-800 rounded-2xl p-8 hover:border-violet-500/40 transition">

    <h2 className="text-xl font-bold mb-3">
      Skills
    </h2>

    <p className="text-3xl font-bold text-violet-400">
      {skills ? skills.split(",").length : 0}
    </p>

  </div>

  <div className="bg-[#161B22] border border-gray-800 rounded-2xl p-8 hover:border-blue-500/40 transition">

    <h2 className="text-xl font-bold mb-3">
      Projects
    </h2>

    <p className="text-3xl font-bold text-blue-400">
      {projectCount}
    </p>

  </div>

    <div className="mt-12">

  <h2 className="text-2xl font-bold mb-6">
    Recent Projects
  </h2>

  <div className="space-y-4">

    {projects.slice(0, 3).map((project) => (
      <div
        key={project.id}
        className="bg-[#161B22] border border-gray-800 rounded-2xl p-6"
      >
        <h3 className="font-bold text-lg">
          {project.title}
        </h3>

        <p className="text-gray-400 mt-2">
          {project.description}
        </p>
      </div>
    ))}

  </div>

</div>

</div>

</div>

    </main>
  );
}
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
      setName(data.full_name || "");
      setSkills(data.skills || "");
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

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
    setProjectCount(data?.length || 0);
  }

  const skillCount = skills
    ? skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean).length
    : 0;

  return (
    <main className="min-h-screen bg-[#F5F4F0] text-[#202733] px-6 py-8">

      <nav className="max-w-6xl mx-auto flex items-center justify-between">

        <button
          onClick={() => router.push("/")}
          className="text-xl font-bold tracking-tight hover:text-[#5F7F91] transition"
        >
          STEM Forge
        </button>

        <div className="flex items-center gap-7">

          <button
            onClick={() => router.push("/dashboard")}
            className="text-[#202733] font-medium"
          >
            Dashboard
          </button>

          <button
            onClick={() => router.push("/projects")}
            className="text-[#6F7782] hover:text-[#202733] transition"
          >
            Projects
          </button>

          <button
            onClick={() => router.push("/learn")}
            className="text-[#6F7782] hover:text-[#202733] transition"
          >
            Learn
          </button>

          <button
            onClick={() => router.push("/profile")}
            className="text-[#6F7782] hover:text-[#202733] transition"
          >
            Profile
          </button>

          <button
            onClick={handleLogout}
            className="text-[#6F7782] hover:text-[#202733] transition"
          >
            Logout
          </button>

        </div>

      </nav>

      <section className="max-w-6xl mx-auto mt-20">

        <p className="text-sm text-[#5F7F91] font-medium mb-3">
          Dashboard
        </p>

        <h1 className="text-4xl font-bold tracking-tight">
          Welcome{name ? `, ${name}` : ""}
        </h1>

        <p className="text-[#6F7782] mt-3 max-w-xl">
          Keep track of your skills and projects.
        </p>

      </section>

      <section className="max-w-6xl mx-auto mt-10">

        <div className="grid md:grid-cols-2 gap-5">

          <div className="bg-white border border-[#DFE1DE] rounded-xl p-6 shadow-sm">

            <p className="text-sm text-[#6F7782]">
              Skills
            </p>

            <p className="text-3xl font-bold mt-3">
              {skillCount}
            </p>

            <p className="text-sm text-[#8C939D] mt-2">
              Skills in your profile
            </p>

          </div>

          <div className="bg-white border border-[#DFE1DE] rounded-xl p-6 shadow-sm">

            <p className="text-sm text-[#6F7782]">
              Projects
            </p>

            <p className="text-3xl font-bold mt-3">
              {projectCount}
            </p>

            <p className="text-sm text-[#8C939D] mt-2">
              Projects you've created
            </p>

          </div>

        </div>

      </section>

      <section className="max-w-6xl mx-auto mt-14 pb-20">

        <div className="flex items-center justify-between mb-6">

          <div>
            <p className="text-sm text-[#5F7F91] font-medium">
              Your work
            </p>

            <h2 className="text-2xl font-bold mt-1">
              Recent Projects
            </h2>
          </div>

          <button
            onClick={() => router.push("/projects")}
            className="text-sm text-[#5F7F91] hover:text-[#202733] transition"
          >
            View all
          </button>

        </div>

        {projects.length === 0 ? (

          <div className="bg-white border border-[#DFE1DE] rounded-xl p-8 shadow-sm">

            <h3 className="text-lg font-semibold">
              No projects yet
            </h3>

            <p className="text-[#6F7782] mt-2">
              Create your first project to get started.
            </p>

            <button
              onClick={() => router.push("/projects/create")}
              className="mt-5 px-5 py-2.5 rounded-lg bg-[#202733] text-white hover:bg-[#303948] transition"
            >
              Create Project
            </button>

          </div>

        ) : (

          <div className="space-y-4">

            {projects.slice(0, 3).map((project) => (

              <div
                key={project.id}
                className="bg-white border border-[#DFE1DE] rounded-xl p-6 shadow-sm"
              >

                <h3 className="text-xl font-semibold">
                  {project.title}
                </h3>

                <p className="text-[#6F7782] mt-2">
                  {project.description}
                </p>

                {project.required_skills && (
                  <p className="text-sm text-[#5F7F91] mt-4">
                    {Array.isArray(project.required_skills)
                      ? project.required_skills.join(", ")
                      : project.required_skills}
                  </p>
                )}

              </div>

            ))}

          </div>

        )}

      </section>

    </main>
  );
}
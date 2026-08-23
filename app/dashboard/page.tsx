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

  const skillCount = skills
    ? skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean).length
    : 0;

  return (
    <main className="min-h-screen bg-[#F5F0E8] text-[#2C211B] px-6 py-8">

      {/* Navigation */}
      <nav className="max-w-6xl mx-auto flex items-center justify-between">

        <button
          onClick={() => router.push("/dashboard")}
          className="text-xl font-bold tracking-tight text-[#2C211B] hover:text-[#8A5A3B] transition"
        >
          STEM Forge
        </button>

        <div className="flex items-center gap-8">

          <button
            onClick={() => router.push("/dashboard")}
            className="text-[#2C211B] font-medium"
          >
            Dashboard
          </button>

          <button
            onClick={() => router.push("/projects")}
            className="text-[#796B60] hover:text-[#8A5A3B] transition"
          >
            Projects
          </button>

          <button
            onClick={() => router.push("/profile")}
            className="text-[#796B60] hover:text-[#8A5A3B] transition"
          >
            Profile
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-full border border-[#D8CABB] text-[#796B60] hover:bg-[#FFFDF8] hover:text-[#8A5A3B] hover:border-[#CDBBA7] transition"
          >
            Logout
          </button>

        </div>

      </nav>

      {/* Welcome */}
      <section className="max-w-6xl mx-auto mt-20">

        <div className="max-w-3xl">

          <p className="text-sm uppercase tracking-[0.2em] text-[#8A5A3B] font-medium mb-4">
            Your workspace
          </p>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
            Welcome{name ? `, ${name}` : ""}.
          </h1>

          <p className="text-lg text-[#796B60] mt-5 leading-relaxed max-w-2xl">
            Build projects, find teammates, and turn your ideas into
            something real.
          </p>

        </div>

      </section>

      {/* Stats */}
      <section className="max-w-6xl mx-auto mt-12">

        <div className="grid md:grid-cols-2 gap-6">

          {/* Skills */}
          <div className="group bg-[#FFFDF8] border border-[#E5D9CA] rounded-3xl p-7 shadow-sm hover:shadow-lg hover:shadow-[#8A5A3B]/10 hover:-translate-y-1 transition-all">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm text-[#9A8C80] uppercase tracking-wider">
                  Skills
                </p>

                <p className="text-4xl font-bold mt-4 text-[#2C211B]">
                  {skillCount}
                </p>
              </div>

              <div className="w-11 h-11 rounded-2xl bg-[#EFE4D6] flex items-center justify-center">
                <span className="text-[#8A5A3B]">
                  ✦
                </span>
              </div>

            </div>

            <p className="text-[#796B60] mt-5">
              Skills in your profile
            </p>

          </div>

          {/* Projects */}
          <div className="group bg-[#FFFDF8] border border-[#E5D9CA] rounded-3xl p-7 shadow-sm hover:shadow-lg hover:shadow-[#8A5A3B]/10 hover:-translate-y-1 transition-all">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm text-[#9A8C80] uppercase tracking-wider">
                  Projects
                </p>

                <p className="text-4xl font-bold mt-4 text-[#2C211B]">
                  {projectCount}
                </p>
              </div>

              <div className="w-11 h-11 rounded-2xl bg-[#EFE4D6] flex items-center justify-center">
                <span className="text-[#8A5A3B]">
                  ◇
                </span>
              </div>

            </div>

            <p className="text-[#796B60] mt-5">
              Projects you've created
            </p>

          </div>

        </div>

      </section>

      {/* Recent Projects */}
      <section className="max-w-6xl mx-auto mt-16 pb-20">

        <div className="flex items-end justify-between mb-6">

          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-[#8A5A3B] font-medium">
              Your work
            </p>

            <h2 className="text-3xl font-bold mt-2">
              Recent Projects
            </h2>
          </div>

          <button
            onClick={() => router.push("/projects")}
            className="text-sm font-medium text-[#8A5A3B] hover:text-[#68422D] transition"
          >
            View all →
          </button>

        </div>

        {projects.length === 0 ? (

          <div className="bg-[#FFFDF8] border border-[#E5D9CA] rounded-3xl p-10 text-center shadow-sm">

            <div className="w-14 h-14 mx-auto rounded-full bg-[#EFE4D6] flex items-center justify-center mb-5">
              <span className="text-[#8A5A3B] text-xl">
                +
              </span>
            </div>

            <h3 className="text-xl font-bold">
              No projects yet
            </h3>

            <p className="text-[#796B60] mt-2">
              Start building something and it will appear here.
            </p>

            <button
              onClick={() => router.push("/projects/create")}
              className="mt-6 px-5 py-3 rounded-full bg-[#8A5A3B] text-white font-medium hover:bg-[#68422D] transition"
            >
              Create Project
            </button>

          </div>

        ) : (

          <div className="space-y-4">

            {projects.slice(0, 3).map((project) => (

              <div
                key={project.id}
                className="group bg-[#FFFDF8] border border-[#E5D9CA] rounded-3xl p-6 shadow-sm hover:shadow-lg hover:shadow-[#8A5A3B]/10 hover:-translate-y-0.5 transition-all"
              >

                <div className="flex items-start justify-between gap-6">

                  <div>

                    <h3 className="text-xl font-bold">
                      {project.title}
                    </h3>

                    <p className="text-[#796B60] mt-2 leading-relaxed">
                      {project.description}
                    </p>

                  </div>

                  <span className="text-[#8A5A3B] text-xl opacity-0 group-hover:opacity-100 transition">
                    →
                  </span>

                </div>

                {project.required_skills && (
                  <div className="mt-5">

                    <span className="inline-block px-3 py-1.5 rounded-full bg-[#EFE4D6] text-[#68422D] text-sm">
                      {Array.isArray(project.required_skills)
                        ? project.required_skills.join(", ")
                        : project.required_skills}
                    </span>

                  </div>
                )}

              </div>

            ))}

          </div>

        )}

      </section>

    </main>
  );
}
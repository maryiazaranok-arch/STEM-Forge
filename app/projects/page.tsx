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
            className="text-[#796B60] hover:text-[#8A5A3B] transition"
          >
            Dashboard
          </button>

          <button
            onClick={() => router.push("/projects")}
            className="text-[#2C211B] font-medium"
          >
            Projects
          </button>

          <button
            onClick={() => router.push("/profile")}
            className="text-[#796B60] hover:text-[#8A5A3B] transition"
          >
            Profile
          </button>

        </div>

      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto mt-24">

        <div className="max-w-2xl">

          <p className="text-sm uppercase tracking-[0.2em] text-[#8A5A3B] font-medium mb-4">
            Discover & Build
          </p>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
            Explore Projects
          </h1>

          <p className="text-lg text-[#796B60] mt-5 max-w-xl leading-relaxed">
            Discover ideas, find talented teammates, and build something
            meaningful together.
          </p>

        </div>

        <button
          onClick={() => router.push("/projects/create")}
          className="mt-9 px-6 py-3 rounded-full bg-[#8A5A3B] text-white font-medium shadow-md shadow-[#8A5A3B]/15 hover:bg-[#68422D] hover:-translate-y-0.5 transition-all"
        >
          + Create Project
        </button>

      </section>

      {/* Projects */}
      <section className="max-w-6xl mx-auto mt-20 pb-20">

        {projects.length === 0 ? (

          <div className="bg-[#FFFDF8] border border-[#E5D9CA] rounded-3xl p-12 text-center shadow-sm">

            <div className="w-14 h-14 mx-auto rounded-full bg-[#EFE4D6] flex items-center justify-center mb-6">
              <span className="text-xl text-[#8A5A3B]">
                ✦
              </span>
            </div>

            <h2 className="text-2xl font-bold">
              No projects yet
            </h2>

            <p className="text-[#796B60] mt-3">
              Be the first to create something on STEM Forge.
            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 gap-6">

            {projects.map((project) => {

              const skills = Array.isArray(project.required_skills)
                ? project.required_skills
                : project.required_skills
                    ?.split(",")
                    .map((skill: string) => skill.trim())
                    .filter(Boolean);

              return (
                <div
                  key={project.id}
                  className="group bg-[#FFFDF8] border border-[#E5D9CA] rounded-3xl p-7 shadow-sm hover:shadow-lg hover:shadow-[#8A5A3B]/10 hover:-translate-y-1 hover:border-[#CDBBA7] transition-all"
                >

                  <div className="flex items-start justify-between gap-4">

                    <h2 className="text-2xl font-bold leading-tight">
                      {project.title}
                    </h2>

                    <span className="text-[#8A5A3B] text-xl opacity-0 group-hover:opacity-100 transition">
                      →
                    </span>

                  </div>

                  <p className="text-[#796B60] mt-4 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {skills && skills.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">

                      {skills.map((skill: string, index: number) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 rounded-full bg-[#EFE4D6] text-[#68422D] text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}

                    </div>
                  )}

                  <div className="mt-8 pt-5 border-t border-[#EDE3D8] flex items-center justify-between">

                    <span className="text-sm text-[#9A8C80]">
                      STEM Project
                    </span>

                    <button
                      className="text-sm font-medium text-[#8A5A3B] hover:text-[#68422D] transition"
                    >
                      View project →
                    </button>

                  </div>

                </div>
              );
            })}

          </div>

        )}

      </section>

    </main>
  );
}
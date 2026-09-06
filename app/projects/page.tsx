"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function ProjectsPage() {
  const router = useRouter()
  const [projects, setProjects] = useState<any[]>([])
  const [userId, setUserId] = useState<string | null>(null)

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push("/login")
  }

  useEffect(() => {
    loadProjects()
  }, [])

  async function loadProjects() {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError) {
      console.error("User error:", userError)
      return
    }

    if (!user) {
      router.push("/login")
      return
    }

    setUserId(user.id)

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Load projects error")
      console.error("message:", error.message)
      console.error("details:", error.details)
      console.error("hint:", error.hint)
      console.error("code:", error.code)
      return
    }

    setProjects(data || [])
  }

  async function handleDeleteProject(id: string) {
  const confirmed = window.confirm(
    "Are you sure you want to delete this project?"
  )

  if (!confirmed) return

  const { data, error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id)
    .select("id")

  if (error) {
    console.error("Delete project error:", error)
    alert(error.message)
    return
  }

  if (!data || data.length === 0) {
    alert("Project was not deleted.")
    return
  }

  setProjects((current) =>
    current.filter((project) => project.id !== id)
  )
}

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
            className="text-[#6F7782] hover:text-[#202733] transition"
          >
            Dashboard
          </button>

          <button
            onClick={() => router.push("/projects")}
            className="text-[#202733] font-medium"
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

      <section className="max-w-6xl mx-auto mt-16">
        <p className="text-sm text-[#5F7F91] font-medium mb-3">
          Projects
        </p>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Explore Projects
            </h1>

            <p className="text-[#6F7782] mt-3 max-w-xl leading-relaxed">
              Discover ideas, find teammates, and build something together.
            </p>
          </div>

          <button
            onClick={() => router.push("/projects/create")}
            className="w-fit px-5 py-3 rounded-lg bg-[#202733] text-white font-medium hover:bg-[#303948] transition"
          >
            + Create Project
          </button>
        </div>
      </section>

      <section className="max-w-6xl mx-auto mt-12 pb-20">
        {projects.length === 0 ? (
          <div className="bg-white border border-[#DFE1DE] rounded-xl p-10 shadow-sm">
            <h2 className="text-2xl font-semibold">
              No projects yet
            </h2>

            <p className="text-[#6F7782] mt-2">
              Be the first to create a project on STEM Forge.
            </p>

            <button
              onClick={() => router.push("/projects/create")}
              className="mt-5 px-5 py-2.5 rounded-lg bg-[#5F7F91] text-white hover:bg-[#4E6B7A] transition"
            >
              Create Project
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {projects.map((project) => {
              const skills = Array.isArray(project.required_skills)
                ? project.required_skills
                : project.required_skills
                    ?.split(",")
                    .map((skill: string) => skill.trim())
                    .filter(Boolean)

              return (
                <div
                  key={project.id}
                  className="bg-white border border-[#DFE1DE] rounded-xl p-6 shadow-sm hover:border-[#C9D4D9] hover:shadow-md transition"
                >
                  <h2 className="text-xl font-semibold">
                    {project.title}
                  </h2>

                  <p className="text-[#6F7782] mt-3 leading-relaxed">
                    {project.description}
                  </p>

                  {skills && skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-5">
                      {skills.map((skill: string, index: number) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 rounded-lg bg-[#EAF1F4] text-[#4E6B7A] text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-6 pt-5 border-t border-[#E5E6E2] flex items-center justify-between">
                    <span className="text-sm text-[#8C939D]">
                      STEM Project
                    </span>

                    <div className="flex items-center gap-4">
                      {project.owner_id === userId && (
                        <button
                          onClick={() =>
                            handleDeleteProject(project.id)
                          }
                          className="text-sm text-red-500 hover:text-red-700 transition"
                        >
                          Delete
                        </button>
                      )}

                      <button
                        onClick={() =>
                          router.push(`/projects/${project.id}`)
                        }
                        className="text-sm font-medium text-[#5F7F91] hover:text-[#202733] transition"
                      >
                        View project →
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>
    </main>
  )
}
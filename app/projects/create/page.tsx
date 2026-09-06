"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function CreateProjectPage() {
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [skills, setSkills] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleLogout() {
  await supabase.auth.signOut()
  router.push("/login")
}

 async function handleCreateProject() {
  if (!title.trim() || !description.trim()) {
    alert("Please fill in the project title and description.")
    return
  }

  setLoading(true)

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    setLoading(false)
    alert("You need to be logged in.")
    return
  }

  const requiredSkills = skills
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean)

  const { error } = await supabase
    .from("projects")
    .insert({
      owner_id: user.id,
      title: title.trim(),
      description: description.trim(),
      required_skills: requiredSkills,
    })

  if (error) {
    console.error("Create project error")
    console.error("message:", error.message)
    console.error("details:", error.details)
    console.error("hint:", error.hint)
    console.error("code:", error.code)

    setLoading(false)
    alert(error.message || "Could not create project.")
    return
  }

  router.push("/projects")
  router.refresh()
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

      <section className="max-w-2xl mx-auto mt-16 pb-20">
        <div className="mb-8">
          <p className="text-sm text-[#5F7F91] font-medium mb-3">
            Projects
          </p>

          <h1 className="text-4xl font-bold tracking-tight">
            Create a project
          </h1>

          <p className="text-[#6F7782] mt-3 leading-relaxed">
            Share your idea and tell others what you want to build.
          </p>
        </div>

        <div className="bg-white border border-[#DFE1DE] rounded-2xl p-8 md:p-9 shadow-sm">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Project Title
              </label>

              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. AI-powered study assistant"
                className="w-full px-4 py-3.5 rounded-lg bg-[#F8F8F6] border border-[#DFE1DE] outline-none placeholder:text-[#9BA2AA] focus:border-[#5F7F91] transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What are you building? What problem are you trying to solve?"
                rows={7}
                className="w-full px-4 py-3.5 rounded-lg bg-[#F8F8F6] border border-[#DFE1DE] outline-none placeholder:text-[#9BA2AA] focus:border-[#5F7F91] transition resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Required Skills
              </label>

              <input
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="Python, AI, Research..."
                className="w-full px-4 py-3.5 rounded-lg bg-[#F8F8F6] border border-[#DFE1DE] outline-none placeholder:text-[#9BA2AA] focus:border-[#5F7F91] transition"
              />

              <p className="text-xs text-[#8C939D] mt-2">
                Separate skills with commas.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleCreateProject}
                disabled={loading}
                className="flex-1 py-3.5 rounded-lg bg-[#202733] text-white font-medium hover:bg-[#303948] transition disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create Project"}
              </button>

              <button
                onClick={() => router.push("/projects")}
                className="px-6 py-3.5 rounded-lg border border-[#DFE1DE] text-[#6F7782] hover:bg-[#F5F4F0] hover:text-[#202733] transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
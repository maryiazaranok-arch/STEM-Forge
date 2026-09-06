"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

type Project = {
  id: string
  title: string
  description: string
  required_skills: string[] | string | null
  owner_id: string
}

type Profile = {
  full_name: string | null
  bio: string | null
}

function toArray(value: string[] | string | null) {
  if (!value) return []

  if (Array.isArray(value)) return value

  try {
    const parsed = JSON.parse(value)

    if (Array.isArray(parsed)) {
      return parsed
    }
  } catch {}

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
}

export default function ProjectPage() {
  const params = useParams()
  const router = useRouter()

  const [project, setProject] = useState<Project | null>(null)
  const [creator, setCreator] = useState<Profile | null>(null)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const [requestStatus, setRequestStatus] = useState<string | null>(null)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [joinError, setJoinError] = useState("")
  const [joining, setJoining] = useState(false)
  const [showApplication, setShowApplication] = useState(false)

  const [applicationSkills, setApplicationSkills] = useState("")
  const [motivation, setMotivation] = useState("")
  const [experience, setExperience] = useState("")
  const [availability, setAvailability] = useState("")

  useEffect(() => {
  async function loadProject() {
    setLoading(true)
    setError("")

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError) {
      console.error("User error:", userError)
      setError("Could not check your account.")
      setLoading(false)
      return
    }

    if (!user) {
      setLoading(false)
      setError("You need to be logged in to view this project.")
      return
    }

    setCurrentUserId(user.id)

    const id = params.id as string

    if (!id) {
      setError("Project ID is missing.")
      setLoading(false)
      return
    }

    const { data: projectData, error: projectError } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single()

    if (projectError) {
      console.error("Load project error:", projectError)
      setError(projectError.message || "Could not load this project.")
      setLoading(false)
      return
    }

    if (!projectData) {
      setError("Project not found.")
      setLoading(false)
      return
    }

    setProject(projectData)

    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("full_name, bio")
      .eq("id", projectData.owner_id)
      .maybeSingle()

    if (profileError) {
      console.error("Load creator error:", profileError)
    }

    setCreator(profileData)

    if (user.id !== projectData.owner_id) {
      const { data: requestData, error: requestError } = await supabase
        .from("project_requests")
        .select("status")
        .eq("project_id", projectData.id)
        .eq("user_id", user.id)
        .maybeSingle()

      if (requestError) {
        console.error("Load request status error:", requestError)
      }

      if (requestData) {
        setRequestStatus(requestData.status)
      }
    }

    setLoading(false)
  }

  loadProject()
}, [params.id])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  const handleJoinProject = async () => {
    if (!project) return

    setJoinError("")

    if (!currentUserId) {
    setJoinError("You need to be logged in.")
    return
    }

    if (currentUserId === project.owner_id) {
      return
    }

    if (requestStatus) {
      return
    }

    setShowApplication(true)
  }

  const handleSubmitApplication = async () => {
    if (!project || !currentUserId) return

    if (!applicationSkills.trim()) {
      setJoinError("Please tell the creator what skills you can contribute.")
      return
    }

    if (!motivation.trim()) {
      setJoinError("Please explain why you want to join the project.")
      return
    }

    if (!availability) {
      setJoinError("Please select your availability.")
      return
    }

    setJoining(true)
    setJoinError("")

    const { error: requestError } = await supabase
      .from("project_requests")
      .insert({
        project_id: project.id,
        user_id: currentUserId,
        status: "pending",
        skills: applicationSkills.trim(),
        motivation: motivation.trim(),
        experience: experience.trim(),
        availability,
      })

    if (requestError) {
      console.error("Join request error:", requestError)
      setJoinError(
        requestError.message || "Could not send your application."
      )
      setJoining(false)
      return
    }

    setRequestStatus("pending")
    setShowApplication(false)
    setJoining(false)

    setApplicationSkills("")
    setMotivation("")
    setExperience("")
    setAvailability("")
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F5F4F0] text-[#202733] px-6 py-8">
        <div className="max-w-5xl mx-auto py-20 text-center">
          <p className="text-[#6F7782]">Loading project...</p>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#F5F4F0] text-[#202733] px-6 py-8">
        <nav className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={() => router.push("/")}
            className="text-xl font-bold tracking-tight hover:text-[#5F7F91] transition"
          >
            STEM Forge
          </button>

          <div className="flex items-center gap-7 text-sm">
            <button onClick={() => router.push("/dashboard")}>
              Dashboard
            </button>
            <button onClick={() => router.push("/projects")}>
              Projects
            </button>
            <button onClick={() => router.push("/learn")}>
              Learn
            </button>
            <button onClick={() => router.push("/profile")}>
              Profile
            </button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </nav>

        <div className="max-w-3xl mx-auto py-20">
          <div className="bg-white border border-[#DFE1DE] rounded-xl p-8 shadow-sm">
            <h1 className="text-2xl font-bold mb-3">
              Could not load project
            </h1>

            <p className="text-[#6F7782]">
              {error}
            </p>

            <button
              onClick={() => router.push("/projects")}
              className="mt-6 bg-[#202733] text-white px-5 py-3 rounded-lg"
            >
              Back to Projects
            </button>
          </div>
        </div>
      </main>
    )
  }

  if (!project) {
    return null
  }

  const skills = toArray(project.required_skills)
  const isOwner = currentUserId === project.owner_id

  return (
    <main className="min-h-screen bg-[#F5F4F0] text-[#202733] px-6 py-8">
      <nav className="max-w-6xl mx-auto flex items-center justify-between">
        <button
          onClick={() => router.push("/")}
          className="text-xl font-bold tracking-tight hover:text-[#5F7F91] transition"
        >
          STEM Forge
        </button>

        <div className="flex items-center gap-7 text-sm">
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

      <section className="max-w-5xl mx-auto pt-16 pb-12">
        <button
          onClick={() => router.push("/projects")}
          className="text-sm text-[#6F7782] hover:text-[#202733] mb-6"
        >
          ← Projects
        </button>

        <div className="bg-white border border-[#DFE1DE] rounded-xl p-8 shadow-sm">
          <p className="text-sm text-[#5F7F91] font-medium mb-3">
            STEM Project
          </p>

          <h1 className="text-4xl font-bold">
            {project.title}
          </h1>

          <p className="text-[#6F7782] leading-relaxed mt-5 max-w-3xl">
            {project.description}
          </p>

          <div className="mt-8">
            <h2 className="font-semibold mb-3">
              Required skills
            </h2>

            {skills.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-[#E8EFF2] text-[#526C7A] px-4 py-2 rounded-lg text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[#6F7782]">
                No specific skills listed.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto pb-20">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border border-[#DFE1DE] rounded-xl p-7">
            <h2 className="text-xl font-semibold mb-4">
              About the creator
            </h2>

            <p className="font-medium">
              {creator?.full_name || "STEM Forge member"}
            </p>

            <p className="text-[#6F7782] leading-relaxed mt-3">
              {creator?.bio || "No bio added yet."}
            </p>

            <button
              onClick={() => router.push(`/profile/${project.owner_id}`)}
              className="text-sm text-[#5F7F91] font-medium mt-5 hover:text-[#202733]"
            >
              View profile →
            </button>
          </div>

          <div className="bg-[#202733] rounded-xl p-7 text-white">
            {isOwner ? (
              <>
                <h2 className="text-xl font-semibold mb-4">
                  Your project
                </h2>

                <p className="text-white/70 leading-relaxed">
                  You are the owner of this project.
                </p>
              </>
            ) : requestStatus === "pending" ? (
              <>
                <h2 className="text-xl font-semibold mb-4">
                  Application pending
                </h2>

                <p className="text-white/70 leading-relaxed">
                  Your application has been sent to the project creator.
                </p>
              </>
            ) : requestStatus === "accepted" ? (
              <>
                <h2 className="text-xl font-semibold mb-4">
                  You are a member
                </h2>

                <p className="text-white/70 leading-relaxed">
                  You have joined this project.
                </p>
              </>
            ) : requestStatus === "rejected" ? (
              <>
                <h2 className="text-xl font-semibold mb-4">
                  Application rejected
                </h2>

                <p className="text-white/70 leading-relaxed">
                  Your previous application was rejected.
                </p>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-4">
                  Interested in this project?
                </h2>

                <p className="text-white/70 leading-relaxed">
                  Tell the creator what you can contribute.
                </p>

                {joinError && (
                  <div className="mt-4 bg-red-500/10 border border-red-400/20 text-red-200 rounded-lg px-4 py-3 text-sm">
                    {joinError}
                  </div>
                )}

                <button
                  onClick={handleJoinProject}
                  className="mt-6 bg-white text-[#202733] px-5 py-3 rounded-lg font-medium hover:bg-[#F5F4F0] transition"
                >
                  Apply to join
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {showApplication && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-6 z-50">
          <div className="w-full max-w-2xl bg-white rounded-2xl p-8 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-5">
              <div>
                <h2 className="text-2xl font-bold">
                  Apply to join
                </h2>

                <p className="text-[#6F7782] mt-2">
                  {project.title}
                </p>
              </div>

              <button
                onClick={() => {
                  setShowApplication(false)
                  setJoinError("")
                }}
                className="text-[#8C939D] hover:text-[#202733] text-xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-6 mt-8">
              <div>
                <label className="block text-sm font-medium mb-2">
                  What skills can you contribute?
                </label>

                <input
                  value={applicationSkills}
                  onChange={(e) => setApplicationSkills(e.target.value)}
                  placeholder="Python, mathematics, research..."
                  className="w-full px-4 py-3 rounded-lg bg-[#F8F8F6] border border-[#DFE1DE] outline-none placeholder:text-[#9BA2AA] focus:border-[#5F7F91] transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Why do you want to join?
                </label>

                <textarea
                  value={motivation}
                  onChange={(e) => setMotivation(e.target.value)}
                  placeholder="Tell the creator why this project interests you."
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-[#F8F8F6] border border-[#DFE1DE] outline-none placeholder:text-[#9BA2AA] focus:border-[#5F7F91] transition resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Relevant experience
                </label>

                <textarea
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="Tell the creator about projects, courses, competitions, or other experience."
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-[#F8F8F6] border border-[#DFE1DE] outline-none placeholder:text-[#9BA2AA] focus:border-[#5F7F91] transition resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-3">
                  Availability
                </label>

                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="availability"
                      value="2-4 hours/week"
                      checked={availability === "2-4 hours/week"}
                      onChange={(e) => setAvailability(e.target.value)}
                    />
                    <span>2–4 hours/week</span>
                  </label>

                  <label className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="availability"
                      value="4-7 hours/week"
                      checked={availability === "4-7 hours/week"}
                      onChange={(e) => setAvailability(e.target.value)}
                    />
                    <span>4–7 hours/week</span>
                  </label>

                  <label className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="availability"
                      value="7+ hours/week"
                      checked={availability === "7+ hours/week"}
                      onChange={(e) => setAvailability(e.target.value)}
                    />
                    <span>7+ hours/week</span>
                  </label>
                </div>
              </div>

              {joinError && (
                <div className="bg-red-500/10 border border-red-200 text-red-600 rounded-lg px-4 py-3 text-sm">
                  {joinError}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleSubmitApplication}
                  disabled={joining}
                  className="flex-1 py-3 rounded-lg bg-[#202733] text-white font-medium hover:bg-[#303948] transition disabled:opacity-50"
                >
                  {joining ? "Sending..." : "Send application"}
                </button>

                <button
                  onClick={() => {
                    setShowApplication(false)
                    setJoinError("")
                  }}
                  className="px-6 py-3 rounded-lg border border-[#DFE1DE] text-[#6F7782] hover:bg-[#F5F4F0] transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

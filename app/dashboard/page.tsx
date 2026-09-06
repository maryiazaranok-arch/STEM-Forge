"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

type JoinedProject = {
  id: string
  title: string
  description: string
  required_skills: string[] | string | null
}

type Request = {
  id: string
  project_id: string
  user_id: string
  status: string
  skills: string | null
  motivation: string | null
  experience: string | null
  availability: string | null
  created_at: string
  project?: {
    title: string
  }
  profile?: {
    full_name: string | null
    bio: string | null
  }
}

type TeamMember = {
  id: string
  project_id: string
  user_id: string
  projectTitle: string
  profile?: {
    full_name: string | null
    bio: string | null
  }
}

export default function DashboardPage() {
  const [name, setName] = useState("")
  const [skills, setSkills] = useState("")
  const [projectCount, setProjectCount] = useState(0)
  const [projects, setProjects] = useState<any[]>([])
  const [joinedProjects, setJoinedProjects] = useState<JoinedProject[]>([])
  const [requests, setRequests] = useState<Request[]>([])
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])

  const [requestLoading, setRequestLoading] = useState(true)
  const [joinedLoading, setJoinedLoading] = useState(true)
  const [membersLoading, setMembersLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {
    loadProfile()
    loadProjects()
    loadRequests()
    loadJoinedProjects()
    loadTeamMembers()
  }, [])

  async function loadProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    const { data, error } = await supabase
      .from("profiles")
      .select("full_name, skills")
      .eq("id", user.id)
      .single()

    if (error) {
      console.error("Profile error:", error)
      return
    }

    if (data) {
      setName(data.full_name || "")

      setSkills(
        Array.isArray(data.skills)
          ? data.skills.join(", ")
          : data.skills || ""
      )
    }
  }

  async function loadProjects() {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      router.push("/login")
      return
    }

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("owner_id", user.id)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Projects error:", error)
      return
    }

    setProjects(data || [])
    setProjectCount(data?.length || 0)
  }

  async function loadJoinedProjects() {
    setJoinedLoading(true)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      setJoinedLoading(false)
      return
    }

    const { data: membersData, error: membersError } = await supabase
      .from("project_members")
      .select("project_id")
      .eq("user_id", user.id)

    if (membersError) {
      console.error("Joined projects error:", membersError)
      setJoinedLoading(false)
      return
    }

    if (!membersData || membersData.length === 0) {
      setJoinedProjects([])
      setJoinedLoading(false)
      return
    }

    const projectIds = membersData.map((member) => member.project_id)

    const { data: projectData, error: projectError } = await supabase
      .from("projects")
      .select("id, title, description, required_skills, created_at")
      .in("id", projectIds)
      .order("created_at", { ascending: false })

    if (projectError) {
      console.error("Joined project details error:", projectError)
      setJoinedLoading(false)
      return
    }

    setJoinedProjects(projectData || [])
    setJoinedLoading(false)
  }

  async function loadRequests() {
    setRequestLoading(true)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      setRequestLoading(false)
      return
    }

    const { data: ownedProjects, error: projectsError } = await supabase
      .from("projects")
      .select("id, title")
      .eq("owner_id", user.id)

    if (projectsError) {
      console.error("Owned projects error:", projectsError)
      setRequestLoading(false)
      return
    }

    if (!ownedProjects || ownedProjects.length === 0) {
      setRequests([])
      setRequestLoading(false)
      return
    }

    const projectIds = ownedProjects.map((project) => project.id)

    const { data: requestData, error: requestError } = await supabase
      .from("project_requests")
      .select("*")
      .in("project_id", projectIds)
      .eq("status", "pending")
      .order("created_at", { ascending: false })

    if (requestError) {
      console.error("Requests error:", requestError)
      setRequestLoading(false)
      return
    }

    const loadedRequests: Request[] = []

    for (const request of requestData || []) {
      const project = ownedProjects.find(
        (item) => item.id === request.project_id
      )

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("full_name, bio")
        .eq("id", request.user_id)
        .maybeSingle()

      if (profileError) {
        console.error("Request profile error:", profileError)
      }

      loadedRequests.push({
        ...request,
        project: project
          ? {
              title: project.title,
            }
          : undefined,
        profile: profileData || undefined,
      })
    }

    setRequests(loadedRequests)
    setRequestLoading(false)
  }

  async function loadTeamMembers() {
    setMembersLoading(true)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      setMembersLoading(false)
      return
    }

    const { data: ownedProjects, error: projectsError } = await supabase
      .from("projects")
      .select("id, title")
      .eq("owner_id", user.id)

    if (projectsError) {
      console.error("Team projects error:", projectsError)
      setMembersLoading(false)
      return
    }

    if (!ownedProjects || ownedProjects.length === 0) {
      setTeamMembers([])
      setMembersLoading(false)
      return
    }

    const projectIds = ownedProjects.map((project) => project.id)

    const { data: membersData, error: membersError } = await supabase
      .from("project_members")
      .select("id, project_id, user_id")
      .in("project_id", projectIds)

    if (membersError) {
      console.error("Team members error:", membersError)
      setMembersLoading(false)
      return
    }

    const loadedMembers: TeamMember[] = []

    for (const member of membersData || []) {
      const project = ownedProjects.find(
        (item) => item.id === member.project_id
      )

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("full_name, bio")
        .eq("id", member.user_id)
        .maybeSingle()

      if (profileError) {
        console.error("Team member profile error:", profileError)
      }

      loadedMembers.push({
        ...member,
        projectTitle: project?.title || "Project",
        profile: profileData || undefined,
      })
    }

    setTeamMembers(loadedMembers)
    setMembersLoading(false)
  }

  async function handleAccept(request: Request) {
    const { error: memberError } = await supabase
      .from("project_members")
      .upsert(
        {
          project_id: request.project_id,
          user_id: request.user_id,
        },
        {
          onConflict: "project_id,user_id",
          ignoreDuplicates: true,
        }
      )

    if (memberError) {
      console.error("Add member error:", memberError)
      alert(memberError.message)
      return
    }

    const { error: updateError } = await supabase
      .from("project_requests")
      .update({
        status: "accepted",
      })
      .eq("id", request.id)

    if (updateError) {
      console.error("Accept request error:", updateError)
      alert(updateError.message)
      return
    }

    setRequests((current) =>
      current.filter((item) => item.id !== request.id)
    )

    await loadTeamMembers()

    alert("Application accepted!")
  }

  async function handleReject(request: Request) {
    const { error } = await supabase
      .from("project_requests")
      .update({
        status: "rejected",
      })
      .eq("id", request.id)

    if (error) {
      console.error("Reject request error:", error)
      alert(error.message)
      return
    }

    setRequests((current) =>
      current.filter((item) => item.id !== request.id)
    )

    alert("Application rejected.")
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push("/login")
  }

  const skillCount = skills
    ? skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean).length
    : 0

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
          Keep track of your skills, projects, and team activity.
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

      <section className="max-w-6xl mx-auto mt-14">
        <div className="mb-6">
          <p className="text-sm text-[#5F7F91] font-medium">
            Team Match
          </p>

          <h2 className="text-2xl font-bold mt-1">
            Joined Projects
          </h2>
        </div>

        {joinedLoading ? (
          <div className="bg-white border border-[#DFE1DE] rounded-xl p-8 shadow-sm">
            <p className="text-[#6F7782]">
              Loading joined projects...
            </p>
          </div>
        ) : joinedProjects.length === 0 ? (
          <div className="bg-white border border-[#DFE1DE] rounded-xl p-8 shadow-sm">
            <h3 className="text-lg font-semibold">
              No joined projects yet
            </h3>

            <p className="text-[#6F7782] mt-2">
              When a project owner accepts your application, the project
              will appear here.
            </p>

            <button
              onClick={() => router.push("/projects")}
              className="mt-5 px-5 py-2.5 rounded-lg bg-[#202733] text-white hover:bg-[#303948] transition"
            >
              Explore Projects
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {joinedProjects.map((project) => {
              const projectSkills = Array.isArray(project.required_skills)
                ? project.required_skills
                : project.required_skills
                    ?.split(",")
                    .map((skill) => skill.trim())
                    .filter(Boolean)

              return (
                <div
                  key={project.id}
                  className="bg-white border border-[#DFE1DE] rounded-xl p-6 shadow-sm hover:border-[#C9D4D9] hover:shadow-md transition"
                >
                  <h3 className="text-xl font-semibold">
                    {project.title}
                  </h3>

                  <p className="text-[#6F7782] mt-3 leading-relaxed">
                    {project.description}
                  </p>

                  {projectSkills && projectSkills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-5">
                      {projectSkills.map((skill: string, index: number) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 rounded-lg bg-[#EAF1F4] text-[#4E6B7A] text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  <button
                    onClick={() =>
                      router.push(`/projects/${project.id}`)
                    }
                    className="text-sm font-medium text-[#5F7F91] hover:text-[#202733] mt-6"
                  >
                    View project →
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </section>

      <section className="max-w-6xl mx-auto mt-14">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-[#5F7F91] font-medium">
              Team Match
            </p>

            <h2 className="text-2xl font-bold mt-1">
              Join Requests
            </h2>
          </div>

          {requests.length > 0 && (
            <span className="text-sm text-[#5F7F91]">
              {requests.length} pending
            </span>
          )}
        </div>

        {requestLoading ? (
          <div className="bg-white border border-[#DFE1DE] rounded-xl p-8 shadow-sm">
            <p className="text-[#6F7782]">
              Loading requests...
            </p>
          </div>
        ) : requests.length === 0 ? (
          <div className="bg-white border border-[#DFE1DE] rounded-xl p-8 shadow-sm">
            <h3 className="text-lg font-semibold">
              No join requests
            </h3>

            <p className="text-[#6F7782] mt-2">
              Applications to your projects will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {requests.map((request) => (
              <div
                key={request.id}
                className="bg-white border border-[#DFE1DE] rounded-xl p-7 shadow-sm"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
                  <div>
                    <p className="text-sm text-[#5F7F91] font-medium">
                      {request.project?.title}
                    </p>

                    <h3 className="text-2xl font-semibold mt-1">
                      {request.profile?.full_name || "STEM Forge member"}
                    </h3>

                    {request.profile?.bio && (
                      <p className="text-[#6F7782] mt-2">
                        {request.profile.bio}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleAccept(request)}
                      className="px-5 py-2.5 rounded-lg bg-[#202733] text-white hover:bg-[#303948] transition"
                    >
                      Accept
                    </button>

                    <button
                      onClick={() => handleReject(request)}
                      className="px-5 py-2.5 rounded-lg border border-[#DFE1DE] text-[#6F7782] hover:bg-[#F5F4F0] transition"
                    >
                      Reject
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-5 mt-7 pt-6 border-t border-[#E5E6E2]">
                  <div>
                    <p className="text-sm font-medium">
                      Skills
                    </p>

                    <p className="text-sm text-[#6F7782] mt-2 leading-relaxed">
                      {request.skills || "Not provided"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium">
                      Motivation
                    </p>

                    <p className="text-sm text-[#6F7782] mt-2 leading-relaxed">
                      {request.motivation || "Not provided"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium">
                      Availability
                    </p>

                    <p className="text-sm text-[#6F7782] mt-2 leading-relaxed">
                      {request.availability || "Not provided"}
                    </p>
                  </div>
                </div>

                {request.experience && (
                  <div className="mt-6 pt-6 border-t border-[#E5E6E2]">
                    <p className="text-sm font-medium">
                      Relevant experience
                    </p>

                    <p className="text-sm text-[#6F7782] mt-2 leading-relaxed">
                      {request.experience}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="max-w-6xl mx-auto mt-14">
        <div className="mb-6">
          <p className="text-sm text-[#5F7F91] font-medium">
            Team Match
          </p>

          <h2 className="text-2xl font-bold mt-1">
            Team Members
          </h2>
        </div>

        {membersLoading ? (
          <div className="bg-white border border-[#DFE1DE] rounded-xl p-8 shadow-sm">
            <p className="text-[#6F7782]">
              Loading team members...
            </p>
          </div>
        ) : teamMembers.length === 0 ? (
          <div className="bg-white border border-[#DFE1DE] rounded-xl p-8 shadow-sm">
            <h3 className="text-lg font-semibold">
              No team members yet
            </h3>

            <p className="text-[#6F7782] mt-2">
              When you accept someone into your project, they will appear
              here.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white border border-[#DFE1DE] rounded-xl p-6 shadow-sm"
              >
                <p className="text-sm text-[#5F7F91] font-medium">
                  {member.projectTitle}
                </p>

                <h3 className="text-xl font-semibold mt-2">
                  {member.profile?.full_name || "STEM Forge member"}
                </h3>

                {member.profile?.bio && (
                  <p className="text-[#6F7782] mt-2 leading-relaxed">
                    {member.profile.bio}
                  </p>
                )}

                <button
                  onClick={() =>
                    router.push(`/profile/${member.user_id}`)
                  }
                  className="text-sm text-[#5F7F91] font-medium mt-5 hover:text-[#202733]"
                >
                  View profile →
                </button>
              </div>
            ))}
          </div>
        )}
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
  )
}
       
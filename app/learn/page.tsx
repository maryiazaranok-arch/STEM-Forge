"use client"

import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function LearnPage() {
  const router = useRouter()

  const subjects = [
    {
      title: "Mathematics",
      description: "Build the foundation for STEM projects.",
      path: "/learn/mathematics",
    },
    {
      title: "Physics",
      description: "Understand how the world around us works.",
      path: "/learn/physics",
    },
    {
      title: "Chemistry",
      description: "Learn about matter, reactions, and materials.",
      path: "/learn/chemistry",
    },
    {
      title: "Biology",
      description: "Explore life, organisms, and biological systems.",
      path: "/learn/biology",
    },
    {
      title: "Computer Science",
      description: "Learn programming, algorithms, and problem solving.",
      path: "/learn/computer-science",
    },
  ]

  const goals = [
    {
      title: "Build an AI project",
      description:
        "Learn the mathematics, programming, statistics, and AI concepts behind intelligent systems.",
      skills: "Mathematics · Computer Science · Statistics",
      goal: "ai-project",
    },
    {
      title: "Do scientific research",
      description:
        "Build a strong foundation for experiments, modeling, and scientific research.",
      skills: "Mathematics · Physics · Biology",
      goal: "scientific-research",
    },
    {
      title: "Build a robot",
      description:
        "Combine programming, physics, geometry, and engineering to create robotic systems.",
      skills: "Mathematics · Physics · Computer Science",
      goal: "robot",
    },
    {
      title: "Work with data",
      description:
        "Learn how to collect, analyze, visualize, and understand real-world data.",
      skills: "Statistics · Mathematics · Computer Science",
      goal: "work-with-data",
    },
    {
      title: "Explore biotechnology",
      description:
        "Learn the biology, chemistry, and data skills used in biotechnology and biomedical research.",
      skills: "Biology · Chemistry · Statistics",
      goal: "biotechnology",
    },
    {
      title: "Prepare for competitions",
      description:
        "Strengthen mathematical reasoning, problem solving, and scientific thinking.",
      skills: "Mathematics · Physics · Problem Solving",
      goal: "competitions",
    },
  ]

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push("/login")
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
            className="text-[#6F7782] hover:text-[#202733] transition"
          >
            Projects
          </button>

          <button
            onClick={() => router.push("/learn")}
            className="text-[#202733] font-medium"
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
          Learn
        </p>

        <h1 className="text-4xl font-bold tracking-tight">
          Build the skills you need
        </h1>

        <p className="text-[#6F7782] mt-3 max-w-2xl leading-relaxed">
          Learn the knowledge you need for real STEM projects, research,
          competitions, and ideas you want to build.
        </p>
      </section>

      <section className="max-w-6xl mx-auto mt-12">
        <div className="mb-6">
          <p className="text-sm text-[#5F7F91] font-medium">
            Learn by Goal
          </p>

          <h2 className="text-2xl font-bold mt-1">
            What do you want to do?
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {goals.map((goal) => (
            <button
              key={goal.title}
              onClick={() =>
                router.push(`/learn/goal-page?goal=${goal.goal}`)
              }
              className="w-full text-left bg-white border border-[#DFE1DE] rounded-xl p-6 shadow-sm hover:border-[#C9D4D9] hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold">
                {goal.title}
              </h3>

              <p className="text-[#6F7782] mt-3 leading-relaxed">
                {goal.description}
              </p>

              <p className="text-sm text-[#5F7F91] font-medium mt-5">
                {goal.skills}
              </p>

              <p className="text-sm text-[#5F7F91] font-medium mt-4">
                Explore →
              </p>
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto mt-14 pb-20">
        <div className="mb-6">
          <p className="text-sm text-[#5F7F91] font-medium">
            Subjects
          </p>

          <h2 className="text-2xl font-bold mt-1">
            Explore subjects
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {subjects.map((subject) => (
            <button
              key={subject.title}
              onClick={() => router.push(subject.path)}
              className="w-full text-left bg-white border border-[#DFE1DE] rounded-xl p-6 shadow-sm hover:border-[#C9D4D9] hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold">
                {subject.title}
              </h3>

              <p className="text-[#6F7782] mt-2 leading-relaxed">
                {subject.description}
              </p>

              <p className="text-sm text-[#5F7F91] font-medium mt-5">
                Explore →
              </p>
            </button>
          ))}
        </div>
      </section>
    </main>
  )
}
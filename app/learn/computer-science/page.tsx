"use client"

import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function ComputerSciencePage() {
  const router = useRouter()

  const topics = [
    {
      title: "Programming Fundamentals",
      description:
        "Learn variables, functions, loops, data types, and core programming concepts.",
      topic: "programming-fundamentals",
    },
    {
      title: "Data Structures",
      description:
        "Understand arrays, linked lists, stacks, queues, trees, graphs, and hash tables.",
      topic: "data-structures",
    },
    {
      title: "Algorithms",
      description:
        "Learn how to design, analyze, and improve algorithms for solving problems.",
      topic: "algorithms",
    },
    {
      title: "Web Development",
      description:
        "Build websites and web applications with modern development tools.",
      topic: "web-development",
    },
    {
      title: "Artificial Intelligence",
      description:
        "Explore machine learning, neural networks, and the foundations of AI.",
      topic: "artificial-intelligence",
    },
    {
      title: "Computer Systems",
      description:
        "Understand how computers work, including hardware, operating systems, and networks.",
      topic: "computer-systems",
    },
    {
      title: "Databases",
      description:
        "Learn how data is stored, organized, queried, and managed.",
      topic: "databases",
    },
    {
      title: "Software Engineering",
      description:
        "Learn how to design, build, test, organize, and maintain software projects.",
      topic: "software-engineering",
    },
  ]

  const logout = async () => {
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
            onClick={logout}
            className="text-[#6F7782] hover:text-[#202733] transition"
          >
            Logout
          </button>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto mt-16">
        <button
          onClick={() => router.push("/learn")}
          className="text-sm text-[#6F7782] hover:text-[#202733] transition mb-6"
        >
          ← Learn
        </button>

        <p className="text-sm text-[#5F7F91] font-medium mb-3">
          Computer Science
        </p>

        <h1 className="text-4xl font-bold tracking-tight">
          Explore Computer Science
        </h1>

        <p className="text-[#6F7782] mt-3 max-w-2xl leading-relaxed">
          Learn programming, algorithms, systems, and the computer science
          foundations needed to build real software.
        </p>
      </section>

      <section className="max-w-6xl mx-auto mt-12 pb-20">
        <div className="grid md:grid-cols-2 gap-5">
          {topics.map((topic) => (
            <button
              key={topic.topic}
              onClick={() =>
                router.push(
                  `/learn/computer-science/topic-page?topic=${topic.topic}`
                )
              }
              className="w-full text-left bg-white border border-[#DFE1DE] rounded-xl p-6 shadow-sm hover:border-[#C9D4D9] hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold">
                {topic.title}
              </h2>

              <p className="text-[#6F7782] mt-3 leading-relaxed">
                {topic.description}
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
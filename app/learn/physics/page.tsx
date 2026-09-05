"use client"

import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function PhysicsPage() {
  const router = useRouter()

  const topics = [
    {
      title: "Mechanics",
      description:
        "Motion, forces, energy, momentum, rotation, and gravitation.",
      topic: "mechanics",
    },
    {
      title: "Electricity & Magnetism",
      description:
        "Electric charge, fields, circuits, magnetism, and induction.",
      topic: "electricity-magnetism",
    },
    {
      title: "Waves & Optics",
      description:
        "Waves, sound, light, reflection, refraction, and interference.",
      topic: "waves-optics",
    },
    {
      title: "Thermodynamics",
      description:
        "Heat, temperature, energy transfer, entropy, and thermal systems.",
      topic: "thermodynamics",
    },
    {
      title: "Modern Physics",
      description:
        "Relativity, quantum mechanics, atomic physics, and nuclear physics.",
      topic: "modern-physics",
    },
    {
      title: "Mathematical Physics",
      description:
        "Vectors, differential equations, linear algebra, and mathematical modeling.",
      topic: "mathematical-physics",
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
          Physics
        </p>

        <h1 className="text-4xl font-bold tracking-tight">
          Explore Physics
        </h1>

        <p className="text-[#6F7782] mt-3 max-w-2xl leading-relaxed">
          Learn the physics concepts you need to understand the world,
          build projects, and explore scientific ideas.
        </p>
      </section>

      <section className="max-w-6xl mx-auto mt-12 pb-20">
        <div className="grid md:grid-cols-2 gap-5">
          {topics.map((topic) => (
            <button
              key={topic.topic}
              onClick={() =>
                router.push(
                  `/learn/physics/topic-page?topic=${topic.topic}`
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
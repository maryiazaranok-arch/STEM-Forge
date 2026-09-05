"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ChemistryPage() {
  const router = useRouter();

  const topics = [
    {
      title: "General Chemistry",
      description: "Atoms, elements, compounds, reactions, and chemical principles.",
      level: "Start here",
      topic: "general-chemistry",
    },
    {
      title: "Atomic Structure",
      description: "Electrons, orbitals, periodic trends, and the periodic table.",
      level: "Foundation",
      topic: "atomic-structure",
    },
    {
      title: "Chemical Reactions",
      description: "Equations, stoichiometry, reaction types, and reaction rates.",
      level: "Foundation",
      topic: "chemical-reactions",
    },
    {
      title: "Organic Chemistry",
      description: "Carbon compounds, functional groups, and organic reactions.",
      level: "Intermediate",
      topic: "organic-chemistry",
    },
    {
      title: "Physical Chemistry",
      description: "Thermodynamics, kinetics, equilibrium, and molecular behavior.",
      level: "Advanced",
      topic: "physical-chemistry",
    },
    {
      title: "Biochemistry",
      description: "Chemistry of proteins, enzymes, DNA, and living systems.",
      level: "Advanced",
      topic: "biochemistry",
    },
  ];

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <main className="min-h-screen bg-[#F5F4F0] text-[#202733] px-6 py-8">

      <nav className="max-w-6xl mx-auto flex items-center justify-between">

        <button onClick={() => router.push("/")} className="text-xl font-bold tracking-tight hover:text-[#5F7F91] transition">
          STEM Forge
        </button>

        <div className="flex items-center gap-7">

          <button onClick={() => router.push("/dashboard")} className="text-[#6F7782] hover:text-[#202733] transition">
            Dashboard
          </button>

          <button onClick={() => router.push("/projects")} className="text-[#6F7782] hover:text-[#202733] transition">
            Projects
          </button>

          <button onClick={() => router.push("/learn")} className="text-[#202733] font-medium">
            Learn
          </button>

          <button onClick={() => router.push("/profile")} className="text-[#6F7782] hover:text-[#202733] transition">
            Profile
          </button>

          <button onClick={handleLogout} className="text-[#6F7782] hover:text-[#202733] transition">
            Logout
          </button>

        </div>

      </nav>

      <section className="max-w-6xl mx-auto mt-16">

        <button
          onClick={() => router.push("/learn")}
          className="text-sm text-[#5F7F91] hover:text-[#202733] transition mb-6"
        >
          ← Learn
        </button>

        <p className="text-sm text-[#5F7F91] font-medium mb-3">
          Learn / Chemistry
        </p>

        <h1 className="text-4xl font-bold tracking-tight">
          Chemistry
        </h1>

        <p className="text-[#6F7782] mt-3 max-w-2xl leading-relaxed">
          Build the chemistry foundation you need for science, engineering,
          materials, and research.
        </p>

      </section>

      <section className="max-w-6xl mx-auto mt-12 pb-20">

        <div className="mb-6">

          <p className="text-sm text-[#5F7F91] font-medium">
            What to learn
          </p>

          <h2 className="text-2xl font-bold mt-1">
            Core topics
          </h2>

        </div>

        <div className="grid md:grid-cols-2 gap-5">

          {topics.map((topic) => (
            <button
              key={topic.title}
              onClick={() =>
                router.push(
                  `/learn/chemistry/topic-page?topic=${topic.topic}`
                )
              }
              className="w-full text-left bg-white border border-[#DFE1DE] rounded-xl p-6 shadow-sm hover:border-[#C9D4D9] hover:shadow-md transition"
            >

              <div className="flex items-start justify-between gap-4">

                <h3 className="text-xl font-semibold">
                  {topic.title}
                </h3>

                <span className="text-xs text-[#5F7F91] border border-[#D9DDDA] rounded-lg px-2.5 py-1">
                  {topic.level}
                </span>

              </div>

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
  );
}
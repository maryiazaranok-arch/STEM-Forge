"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ChemistryPage() {
  const router = useRouter();

  const topics = [
    {
      title: "General Chemistry",
      description:
        "Atoms, elements, compounds, reactions, and basic chemical principles.",
      level: "Start here",
    },
    {
      title: "Atomic Structure",
      description:
        "Learn about electrons, orbitals, periodic trends, and the periodic table.",
      level: "Foundation",
    },
    {
      title: "Chemical Reactions",
      description:
        "Understand equations, stoichiometry, reaction types, and reaction rates.",
      level: "Foundation",
    },
    {
      title: "Organic Chemistry",
      description:
        "Study carbon compounds, functional groups, and organic reactions.",
      level: "Intermediate",
    },
    {
      title: "Physical Chemistry",
      description:
        "Explore thermodynamics, kinetics, equilibrium, and molecular behavior.",
      level: "Advanced",
    },
    {
      title: "Biochemistry",
      description:
        "Learn how chemistry explains proteins, enzymes, DNA, and living systems.",
      level: "Advanced",
    },
  ];

  const resources = [
    {
      name: "Khan Academy",
      description:
        "Structured chemistry lessons with videos, explanations, and practice.",
      bestFor: "Learning + practice",
      link: "https://www.khanacademy.org/science/chemistry",
    },
    {
      name: "MIT OpenCourseWare",
      description:
        "University-level chemistry courses, lectures, assignments, and exams.",
      bestFor: "Deep understanding",
      link: "https://ocw.mit.edu/search/?d=Chemistry",
    },
    {
      name: "OpenStax Chemistry",
      description:
        "Free chemistry textbooks covering core concepts from introductory chemistry onward.",
      bestFor: "Textbook + reference",
      link: "https://openstax.org/details/books/chemistry-2e",
    },
    {
      name: "ChemCollective",
      description:
        "Virtual chemistry laboratory activities and simulations for learning by doing.",
      bestFor: "Interactive learning",
      link: "https://chemcollective.org/",
    },
  ];

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
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
          Learn / Chemistry
        </p>

        <h1 className="text-4xl font-bold tracking-tight">
          Chemistry
        </h1>

        <p className="text-[#6F7782] mt-3 max-w-2xl leading-relaxed">
          Learn the chemistry concepts you can use in science,
          engineering, research, and real-world projects.
        </p>

      </section>

      <section className="max-w-6xl mx-auto mt-12">

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
                  `/learn/chemistry/${topic.title
                    .toLowerCase()
                    .replaceAll(" ", "-")}`
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

      <section className="max-w-6xl mx-auto mt-14">

        <div className="mb-6">

          <p className="text-sm text-[#5F7F91] font-medium">
            Where to learn
          </p>

          <h2 className="text-2xl font-bold mt-1">
            Recommended resources
          </h2>

          <p className="text-[#6F7782] mt-2">
            Free English-language resources for learning chemistry.
          </p>

        </div>

        <div className="grid md:grid-cols-2 gap-5">

          {resources.map((resource) => (
            <a
              key={resource.name}
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white border border-[#DFE1DE] rounded-xl p-6 shadow-sm hover:border-[#C9D4D9] hover:shadow-md transition"
            >

              <div className="flex items-center justify-between gap-4">

                <h3 className="text-xl font-semibold">
                  {resource.name}
                </h3>

                <span className="text-[#5F7F91]">
                  ↗
                </span>

              </div>

              <p className="text-[#6F7782] mt-3 leading-relaxed">
                {resource.description}
              </p>

              <p className="text-sm text-[#5F7F91] font-medium mt-5">
                Best for: {resource.bestFor}
              </p>

            </a>
          ))}

        </div>

      </section>

      <section className="max-w-6xl mx-auto mt-14 pb-20">

        <div className="bg-white border border-[#DFE1DE] rounded-xl p-7">

          <p className="text-sm text-[#5F7F91] font-medium">
            Ready to apply it?
          </p>

          <h2 className="text-2xl font-bold mt-1">
            Build something with chemistry
          </h2>

          <p className="text-[#6F7782] mt-3 max-w-2xl leading-relaxed">
            Explore projects involving materials, biotechnology,
            environmental science, energy, and chemical research.
          </p>

          <button
            onClick={() => router.push("/projects")}
            className="mt-5 px-5 py-2.5 rounded-lg bg-[#202733] text-white hover:bg-[#303948] transition"
          >
            Explore Projects
          </button>

        </div>

      </section>

    </main>
  );
}
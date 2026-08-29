"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function MathematicsPage() {
  const router = useRouter();

  const topics = [
    {
      title: "Algebra",
      description: "Equations, functions, graphs, and algebraic thinking.",
      level: "Start here",
    },
    {
      title: "Geometry",
      description: "Shapes, coordinates, proofs, and spatial reasoning.",
      level: "Foundation",
    },
    {
      title: "Trigonometry",
      description: "Angles, triangles, identities, and periodic functions.",
      level: "Foundation",
    },
    {
      title: "Calculus",
      description: "Limits, derivatives, integrals, and optimization.",
      level: "Advanced",
    },
    {
      title: "Linear Algebra",
      description: "Vectors, matrices, transformations, and eigenvalues.",
      level: "Advanced",
    },
    {
      title: "Probability & Statistics",
      description: "Probability, distributions, data, and inference.",
      level: "Advanced",
    },
    {
      title: "Number Theory",
      description: "Prime numbers, divisibility, modular arithmetic, and proofs.",
      level: "Problem solving",
    },
    {
      title: "Problem Solving",
      description: "Learn how to approach difficult mathematical problems.",
      level: "Olympiad",
    },
  ];

  const resources = [
    {
      name: "Khan Academy",
      description:
        "A good starting point for learning mathematics step by step and practicing each topic.",
      bestFor: "Learning + practice",
      link: "https://www.khanacademy.org/math",
    },
    {
      name: "MIT OpenCourseWare",
      description:
        "University-level courses with lectures, notes, assignments, and problem sets.",
      bestFor: "Deep understanding",
      link: "https://ocw.mit.edu/search/?d=Mathematics",
    },
    {
      name: "3Blue1Brown",
      description:
        "Visual explanations that make difficult ideas in calculus and linear algebra easier to understand.",
      bestFor: "Visual intuition",
      link: "https://www.3blue1brown.com/",
    },
    {
      name: "Art of Problem Solving",
      description:
        "Challenging problems and resources for mathematical problem solving and competitions.",
      bestFor: "Olympiads + problem solving",
      link: "https://artofproblemsolving.com/resources",
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
          Learn / Mathematics
        </p>

        <h1 className="text-4xl font-bold tracking-tight">
          Mathematics
        </h1>

        <p className="text-[#6F7782] mt-3 max-w-2xl leading-relaxed">
          Build the mathematical foundation you need for STEM projects,
          research, and problem solving.
        </p>

      </section>

      <section className="max-w-6xl mx-auto mt-12">

        <div className="flex items-center justify-between mb-6">

          <div>
            <p className="text-sm text-[#5F7F91] font-medium">
              What to learn
            </p>

            <h2 className="text-2xl font-bold mt-1">
              Core topics
            </h2>
          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-5">

          {topics.map((topic) => (
            <div
              key={topic.title}
              className="bg-white border border-[#DFE1DE] rounded-xl p-6 shadow-sm"
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

            </div>
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
            All resources are in English and are useful for independent
            learning.
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
            Ready to build?
          </p>

          <h2 className="text-2xl font-bold mt-1">
            Apply your mathematics
          </h2>

          <p className="text-[#6F7782] mt-3 max-w-2xl leading-relaxed">
            Once you have the basics, explore projects that use mathematics
            in programming, science, data analysis, and research.
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
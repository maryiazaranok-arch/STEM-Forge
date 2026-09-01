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
      topic: "algebra",
    },
    {
      title: "Geometry",
      description: "Shapes, coordinates, proofs, and spatial reasoning.",
      level: "Foundation",
      topic: "geometry",
    },
    {
      title: "Trigonometry",
      description: "Angles, triangles, identities, and periodic functions.",
      level: "Foundation",
      topic: "trigonometry",
    },
    {
      title: "Calculus",
      description: "Limits, derivatives, integrals, and optimization.",
      level: "Advanced",
      topic: "calculus",
    },
    {
      title: "Linear Algebra",
      description: "Vectors, matrices, transformations, and eigenvalues.",
      level: "Advanced",
      topic: "linear-algebra",
    },
    {
      title: "Probability & Statistics",
      description: "Probability, distributions, data analysis, and inference.",
      level: "Advanced",
      topic: "probability",
    },
    {
      title: "Number Theory",
      description: "Prime numbers, divisibility, modular arithmetic, and proofs.",
      level: "Problem solving",
      topic: "number-theory",
    },
    {
      title: "Problem Solving",
      description: "Learn how to approach difficult mathematical problems.",
      level: "Olympiad",
      topic: "problem-solving",
    },
  ];

  const resources = [
    {
      name: "Khan Academy",
      description:
        "Step-by-step lessons and practice for mathematics.",
      bestFor: "Learning + practice",
      link: "https://www.khanacademy.org/math",
    },
    {
      name: "MIT OpenCourseWare",
      description:
        "University-level mathematics courses and problem sets.",
      bestFor: "Deep understanding",
      link: "https://ocw.mit.edu/search/?d=Mathematics",
    },
    {
      name: "3Blue1Brown",
      description:
        "Visual explanations for difficult mathematical ideas.",
      bestFor: "Visual intuition",
      link: "https://www.3blue1brown.com/",
    },
    {
      name: "Art of Problem Solving",
      description:
        "Problems and resources for advanced mathematics and competitions.",
      bestFor: "Problem solving",
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

        <button
          onClick={() => router.push("/learn")}
          className="text-sm text-[#5F7F91] hover:text-[#202733] transition mb-6"
        >
          ← Learn
        </button>

        <p className="text-sm text-[#5F7F91] font-medium mb-3">
          Learn / Mathematics
        </p>

        <h1 className="text-4xl font-bold tracking-tight">
          Mathematics
        </h1>

        <p className="text-[#6F7782] mt-3 max-w-2xl leading-relaxed">
          Build the mathematical foundation you need for STEM projects,
          programming, science, and research.
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
                  `/learn/mathematics/topic-page?topic=${topic.topic}`
                )
              }
              className="w-full text-left bg-white border border-[#DFE1DE] rounded-xl p-6 shadow-sm hover:border-[#C9D4D9] hover:shadow-md transition"
            >

              <div className="flex items-start justify-between gap-4">

                <h3 className="text-xl font-semibold">
                  {topic.title}
                </h3>

                <span className="text-xs text-[#5F7F91] border border-[#D9DDDA] rounded-lg px-2.5 py-1 whitespace-nowrap">
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
            Free English-language resources for independent learning.
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
            Use mathematics in programming, science, engineering, data
            analysis, and research projects.
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
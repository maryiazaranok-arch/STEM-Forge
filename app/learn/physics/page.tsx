"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function PhysicsPage() {
  const router = useRouter();

  const topics = [
    {
      title: "Mechanics",
      description:
        "Motion, forces, energy, momentum, rotation, and gravitation.",
      level: "Start here",
    },
    {
      title: "Electricity & Magnetism",
      description:
        "Electric fields, circuits, magnetism, induction, and electromagnetism.",
      level: "Foundation",
    },
    {
      title: "Waves & Optics",
      description:
        "Waves, sound, light, reflection, refraction, and interference.",
      level: "Foundation",
    },
    {
      title: "Thermodynamics",
      description:
        "Temperature, heat, energy transfer, entropy, and thermodynamic systems.",
      level: "Intermediate",
    },
    {
      title: "Modern Physics",
      description:
        "Relativity, quantum mechanics, atomic physics, and nuclear physics.",
      level: "Advanced",
    },
    {
      title: "Mathematical Physics",
      description:
        "Use mathematics to model physical systems and solve physics problems.",
      level: "Advanced",
    },
  ];

  const resources = [
    {
      name: "Khan Academy",
      description:
        "A structured introduction to physics with explanations, videos, and practice.",
      bestFor: "Learning + practice",
      link: "https://www.khanacademy.org/science/physics",
    },
    {
      name: "MIT OpenCourseWare",
      description:
        "University-level physics courses with lectures, notes, assignments, and exams.",
      bestFor: "Deep understanding",
      link: "https://ocw.mit.edu/search/?d=Physics",
    },
    {
      name: "PhET Interactive Simulations",
      description:
        "Interactive simulations for mechanics, electricity, waves, and many other physics concepts.",
      bestFor: "Interactive learning",
      link: "https://phet.colorado.edu/",
    },
    {
      name: "OpenStax Physics",
      description:
        "Free physics textbooks with explanations, examples, and exercises.",
      bestFor: "Textbook + reference",
      link: "https://openstax.org/subjects/science",
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
          Learn / Physics
        </p>

        <h1 className="text-4xl font-bold tracking-tight">
          Physics
        </h1>

        <p className="text-[#6F7782] mt-3 max-w-2xl leading-relaxed">
          Learn the physics concepts that help you understand, model, and
          build real-world systems.
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
                  `/learn/physics/${topic.title
                    .toLowerCase()
                    .replaceAll(" ", "-")
                    .replaceAll("&", "and")}`
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
            Free English-language resources for learning physics.
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
            Build something with physics
          </h2>

          <p className="text-[#6F7782] mt-3 max-w-2xl leading-relaxed">
            Explore projects involving mechanics, simulation, electronics,
            energy, waves, and scientific research.
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
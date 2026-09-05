"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

const topicData: Record<string, any> = {
  mechanics: {
    title: "Mechanics",
    description:
      "Understand motion, forces, energy, momentum, and gravitation.",
    topics: [
      "Kinematics",
      "Newton's laws",
      "Work and energy",
      "Momentum",
      "Circular motion",
      "Rotation",
      "Gravitation",
    ],
    resources: [
      {
        name: "Khan Academy",
        description: "Structured physics lessons and practice.",
        link: "https://www.khanacademy.org/science/physics",
      },
      {
        name: "MIT OpenCourseWare",
        description: "University-level physics courses and problem sets.",
        link: "https://ocw.mit.edu/search/?d=Physics",
      },
      {
        name: "PhET",
        description: "Interactive physics simulations.",
        link: "https://phet.colorado.edu/",
      },
    ],
    usefulFor: [
      "Engineering",
      "Robotics",
      "Simulation",
      "Mechanical systems",
    ],
  },

  "electricity-and-magnetism": {
    title: "Electricity & Magnetism",
    description:
      "Learn how electric charges, fields, circuits, and magnetic fields work.",
    topics: [
      "Electric charge",
      "Electric fields",
      "Electric potential",
      "Circuits",
      "Resistance",
      "Magnetic fields",
      "Electromagnetic induction",
    ],
    resources: [
      {
        name: "Khan Academy",
        description: "Electricity and magnetism lessons.",
        link: "https://www.khanacademy.org/science/physics",
      },
      {
        name: "MIT OpenCourseWare",
        description: "University-level electricity and magnetism.",
        link: "https://ocw.mit.edu/search/?d=Physics",
      },
      {
        name: "PhET",
        description: "Interactive circuit and field simulations.",
        link: "https://phet.colorado.edu/",
      },
    ],
    usefulFor: [
      "Electronics",
      "Robotics",
      "Engineering",
      "Sensors",
    ],
  },

  "waves-optics": {
    title: "Waves & Optics",
    description:
      "Explore sound, light, waves, reflection, refraction, and interference.",
    topics: [
      "Wave properties",
      "Sound",
      "Reflection",
      "Refraction",
      "Lenses",
      "Interference",
      "Diffraction",
    ],
    resources: [
      {
        name: "Khan Academy",
        description: "Waves and optics lessons.",
        link: "https://www.khanacademy.org/science/physics",
      },
      {
        name: "PhET",
        description: "Interactive waves, sound, and optics simulations.",
        link: "https://phet.colorado.edu/",
      },
    ],
    usefulFor: [
      "Optics",
      "Acoustics",
      "Computer vision",
      "Engineering",
    ],
  },

  thermodynamics: {
    title: "Thermodynamics",
    description:
      "Study heat, temperature, energy transfer, and thermodynamic systems.",
    topics: [
      "Temperature",
      "Heat",
      "Thermal expansion",
      "First law of thermodynamics",
      "Entropy",
      "Heat engines",
    ],
    resources: [
      {
        name: "Khan Academy",
        description: "Introductory thermodynamics lessons.",
        link: "https://www.khanacademy.org/science/physics",
      },
      {
        name: "MIT OpenCourseWare",
        description: "University-level physics materials.",
        link: "https://ocw.mit.edu/search/?d=Physics",
      },
    ],
    usefulFor: [
      "Energy systems",
      "Engineering",
      "Climate science",
      "Materials",
    ],
  },

  "modern-physics": {
    title: "Modern Physics",
    description:
      "Explore relativity, quantum mechanics, atomic physics, and nuclear physics.",
    topics: [
      "Special relativity",
      "Photons",
      "Quantum mechanics",
      "Atomic physics",
      "Nuclear physics",
      "Radioactivity",
    ],
    resources: [
      {
        name: "Khan Academy",
        description: "Introduction to modern physics.",
        link: "https://www.khanacademy.org/science/physics",
      },
      {
        name: "MIT OpenCourseWare",
        description: "Advanced university physics materials.",
        link: "https://ocw.mit.edu/search/?d=Physics",
      },
    ],
    usefulFor: [
      "Quantum computing",
      "Nuclear science",
      "Research",
      "Astrophysics",
    ],
  },

  "mathematical-physics": {
    title: "Mathematical Physics",
    description:
      "Use mathematical tools to describe and solve physical systems.",
    topics: [
      "Vectors",
      "Differential equations",
      "Complex numbers",
      "Linear algebra",
      "Partial derivatives",
      "Fourier analysis",
    ],
    resources: [
      {
        name: "MIT OpenCourseWare",
        description: "Advanced mathematics and physics courses.",
        link: "https://ocw.mit.edu/",
      },
      {
        name: "3Blue1Brown",
        description: "Visual explanations of mathematics.",
        link: "https://www.3blue1brown.com/",
      },
    ],
    usefulFor: [
      "Physics research",
      "Scientific computing",
      "Simulation",
      "Engineering",
    ],
  },
};

export default function PhysicsTopicPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const topic = searchParams.get("topic");
  const data = topic ? topicData[topic] : null;

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  if (!data) {
    return (
      <main className="min-h-screen bg-[#F5F4F0] text-[#202733] px-6 py-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold">Topic not found</h1>

          <button
            onClick={() => router.push("/learn/physics")}
            className="mt-5 px-5 py-2.5 rounded-lg bg-[#202733] text-white"
          >
            Back to Physics
          </button>
        </div>
      </main>
    );
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

      <section className="max-w-4xl mx-auto mt-16 pb-20">

        <button
          onClick={() => router.push("/learn/physics")}
          className="text-sm text-[#5F7F91] hover:text-[#202733] transition"
        >
          ← Physics
        </button>

        <p className="text-sm text-[#5F7F91] font-medium mt-8 mb-3">
          Physics
        </p>

        <h1 className="text-4xl font-bold tracking-tight">
          {data.title}
        </h1>

        <p className="text-lg text-[#6F7782] mt-4 max-w-2xl leading-relaxed">
          {data.description}
        </p>

        <div className="mt-10 bg-white border border-[#DFE1DE] rounded-xl p-7 shadow-sm">

          <p className="text-sm text-[#5F7F91] font-medium">
            What to learn
          </p>

          <h2 className="text-2xl font-bold mt-1">
            Core concepts
          </h2>

          <div className="mt-6 space-y-3">

            {data.topics.map((item: string) => (
              <div key={item} className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#5F7F91]" />
                <p className="text-[#555E69]">{item}</p>
              </div>
            ))}

          </div>

        </div>

        <div className="mt-10">

          <p className="text-sm text-[#5F7F91] font-medium">
            Where to learn
          </p>

          <h2 className="text-2xl font-bold mt-1 mb-6">
            Recommended resources
          </h2>

          <div className="space-y-4">

            {data.resources.map((resource: any) => (
              <a
                key={resource.name}
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white border border-[#DFE1DE] rounded-xl p-6 shadow-sm hover:border-[#C9D4D9] hover:shadow-md transition"
              >
                <div className="flex items-center justify-between">

                  <h3 className="text-xl font-semibold">
                    {resource.name}
                  </h3>

                  <span className="text-[#5F7F91]">
                    ↗
                  </span>

                </div>

                <p className="text-[#6F7782] mt-3">
                  {resource.description}
                </p>

                <p className="text-sm text-[#5F7F91] mt-4">
                  Open resource →
                </p>
              </a>
            ))}

          </div>

        </div>

        <div className="mt-8 bg-white border border-[#DFE1DE] rounded-xl p-7 shadow-sm">

          <p className="text-sm text-[#5F7F91] font-medium">
            Useful for
          </p>

          <h2 className="text-2xl font-bold mt-1">
            What can you use it for?
          </h2>

          <div className="flex flex-wrap gap-2 mt-5">

            {data.usefulFor.map((item: string) => (
              <span
                key={item}
                className="px-3 py-1.5 rounded-lg bg-[#E8EFF2] text-[#526C7A] text-sm"
              >
                {item}
              </span>
            ))}

          </div>

        </div>

        <div className="mt-8 flex gap-3">

          <button
            onClick={() => router.push("/learn/physics")}
            className="px-5 py-2.5 rounded-lg border border-[#D9DDDA] text-[#6F7782] hover:bg-white transition"
          >
            Back
          </button>

          <button
            onClick={() => router.push("/projects")}
            className="px-5 py-2.5 rounded-lg bg-[#202733] text-white hover:bg-[#303948] transition"
          >
            Explore Projects
          </button>

        </div>

      </section>

    </main>
  );
}
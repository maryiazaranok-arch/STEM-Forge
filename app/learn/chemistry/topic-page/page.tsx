"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

const topicData: Record<string, any> = {
  "general-chemistry": {
    title: "General Chemistry",
    description:
      "Build a foundation in atoms, compounds, reactions, and chemical principles.",
    topics: [
      "Matter",
      "Atoms",
      "Molecules",
      "Chemical bonding",
      "Stoichiometry",
      "Chemical reactions",
      "Solutions",
    ],
    resources: [
      {
        name: "Khan Academy",
        description: "Structured chemistry lessons and practice.",
        link: "https://www.khanacademy.org/science/chemistry",
      },
      {
        name: "OpenStax Chemistry",
        description: "Free introductory chemistry textbook.",
        link: "https://openstax.org/details/books/chemistry-2e",
      },
      {
        name: "ChemCollective",
        description: "Virtual chemistry laboratory activities.",
        link: "https://chemcollective.org/",
      },
    ],
    usefulFor: [
      "Science projects",
      "Materials",
      "Engineering",
      "Laboratory work",
    ],
  },

  "atomic-structure": {
    title: "Atomic Structure",
    description:
      "Understand how atoms are organized and how electrons determine chemical behavior.",
    topics: [
      "Protons and neutrons",
      "Electrons",
      "Atomic orbitals",
      "Electron configuration",
      "Periodic trends",
      "Periodic table",
    ],
    resources: [
      {
        name: "Khan Academy",
        description: "Lessons on atoms and periodic trends.",
        link: "https://www.khanacademy.org/science/chemistry",
      },
      {
        name: "OpenStax Chemistry",
        description: "Detailed atomic structure material.",
        link: "https://openstax.org/details/books/chemistry-2e",
      },
    ],
    usefulFor: [
      "Materials science",
      "Nanotechnology",
      "Physics",
      "Chemistry research",
    ],
  },

  "chemical-reactions": {
    title: "Chemical Reactions",
    description:
      "Learn how substances transform and how to model chemical reactions.",
    topics: [
      "Balancing equations",
      "Reaction types",
      "Stoichiometry",
      "Limiting reactants",
      "Reaction rates",
      "Chemical equilibrium",
    ],
    resources: [
      {
        name: "Khan Academy",
        description: "Chemical reaction lessons and practice.",
        link: "https://www.khanacademy.org/science/chemistry",
      },
      {
        name: "ChemCollective",
        description: "Virtual chemistry experiments and activities.",
        link: "https://chemcollective.org/",
      },
    ],
    usefulFor: [
      "Laboratory projects",
      "Materials",
      "Environmental science",
      "Engineering",
    ],
  },

  "organic-chemistry": {
    title: "Organic Chemistry",
    description:
      "Study the chemistry of carbon-based molecules and their reactions.",
    topics: [
      "Carbon bonding",
      "Functional groups",
      "Isomers",
      "Reaction mechanisms",
      "Hydrocarbons",
      "Organic synthesis",
    ],
    resources: [
      {
        name: "Khan Academy",
        description: "Organic chemistry lessons and practice.",
        link: "https://www.khanacademy.org/science/organic-chemistry",
      },
      {
        name: "OpenStax",
        description: "Free chemistry textbook resources.",
        link: "https://openstax.org/",
      },
    ],
    usefulFor: [
      "Biochemistry",
      "Medicine",
      "Materials",
      "Chemical research",
    ],
  },

  "physical-chemistry": {
    title: "Physical Chemistry",
    description:
      "Connect chemistry with mathematics, physics, energy, and molecular behavior.",
    topics: [
      "Thermodynamics",
      "Chemical kinetics",
      "Equilibrium",
      "Quantum chemistry",
      "Molecular motion",
      "Energy landscapes",
    ],
    resources: [
      {
        name: "MIT OpenCourseWare",
        description: "Advanced university chemistry resources.",
        link: "https://ocw.mit.edu/search/?d=Chemistry",
      },
      {
        name: "OpenStax",
        description: "Free chemistry reference materials.",
        link: "https://openstax.org/",
      },
    ],
    usefulFor: [
      "Materials science",
      "Energy research",
      "Chemical engineering",
      "Scientific modeling",
    ],
  },

  biochemistry: {
    title: "Biochemistry",
    description:
      "Learn how chemistry explains biological molecules and cellular processes.",
    topics: [
      "Proteins",
      "Carbohydrates",
      "Lipids",
      "Nucleic acids",
      "Enzymes",
      "Metabolism",
    ],
    resources: [
      {
        name: "Khan Academy",
        description: "Biochemistry and biology lessons.",
        link: "https://www.khanacademy.org/science/biology",
      },
      {
        name: "OpenStax Biology",
        description: "Free biology and biochemistry resources.",
        link: "https://openstax.org/details/books/biology-2e",
      },
    ],
    usefulFor: [
      "Biotechnology",
      "Medicine",
      "Genetics",
      "Biomedical research",
    ],
  },
};

export default function ChemistryTopicPage() {
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
          <h1 className="text-3xl font-bold">
            Topic not found
          </h1>

          <button
            onClick={() => router.push("/learn/chemistry")}
            className="mt-5 px-5 py-2.5 rounded-lg bg-[#202733] text-white"
          >
            Back to Chemistry
          </button>
        </div>
      </main>
    );
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

      <section className="max-w-4xl mx-auto mt-16 pb-20">

        <button
          onClick={() => router.push("/learn/chemistry")}
          className="text-sm text-[#5F7F91] hover:text-[#202733] transition"
        >
          ← Chemistry
        </button>

        <p className="text-sm text-[#5F7F91] font-medium mt-8 mb-3">
          Chemistry
        </p>

        <h1 className="text-4xl font-bold tracking-tight">
          {data.title}
        </h1>

        <p className="text-lg text-[#6F7782] mt-4 max-w-2xl leading-relaxed">
          {data.description}
        </p>

        <div className="mt-10 bg-white border border-[#DFE1DE] rounded-xl p-7">

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

                  <span className="text-[#5F7F91]">↗</span>

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

        <div className="mt-8 bg-white border border-[#DFE1DE] rounded-xl p-7">

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
            onClick={() => router.push("/learn/chemistry")}
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
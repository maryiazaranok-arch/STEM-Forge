"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

const topicData: Record<string, any> = {
  "cell-biology": {
    title: "Cell Biology",
    description:
      "Understand the structure and function of cells and their internal processes.",
    topics: [
      "Cell structure",
      "Organelles",
      "Cell membranes",
      "Transport",
      "Cell signaling",
      "Cell division",
      "Cellular energy",
    ],
    resources: [
      {
        name: "Khan Academy",
        description: "Clear biology lessons and practice.",
        link: "https://www.khanacademy.org/science/biology",
      },
      {
        name: "OpenStax Biology",
        description: "Free biology textbook and reference.",
        link: "https://openstax.org/details/books/biology-2e",
      },
      {
        name: "HHMI BioInteractive",
        description: "Interactive biology activities and resources.",
        link: "https://www.biointeractive.org/",
      },
    ],
    usefulFor: [
      "Biotechnology",
      "Medicine",
      "Research",
      "Biological experiments",
    ],
  },

  genetics: {
    title: "Genetics",
    description:
      "Learn how DNA, genes, inheritance, and mutations shape living organisms.",
    topics: [
      "DNA structure",
      "Genes",
      "Mendelian genetics",
      "Inheritance",
      "Mutations",
      "Gene expression",
      "Genomics",
    ],
    resources: [
      {
        name: "Khan Academy",
        description: "Genetics lessons and practice.",
        link: "https://www.khanacademy.org/science/biology",
      },
      {
        name: "HHMI BioInteractive",
        description: "Interactive genetics resources.",
        link: "https://www.biointeractive.org/",
      },
      {
        name: "OpenStax Biology",
        description: "Free genetics textbook material.",
        link: "https://openstax.org/details/books/biology-2e",
      },
    ],
    usefulFor: [
      "Biotechnology",
      "Genomics",
      "Medicine",
      "Research",
      "Bioinformatics",
    ],
  },

  "molecular-biology": {
    title: "Molecular Biology",
    description:
      "Explore how DNA, RNA, proteins, and molecular mechanisms work together.",
    topics: [
      "DNA replication",
      "Transcription",
      "Translation",
      "Proteins",
      "Enzymes",
      "Gene regulation",
      "Molecular techniques",
    ],
    resources: [
      {
        name: "Khan Academy",
        description: "Molecular biology lessons.",
        link: "https://www.khanacademy.org/science/biology",
      },
      {
        name: "HHMI BioInteractive",
        description: "Molecular biology activities and animations.",
        link: "https://www.biointeractive.org/",
      },
    ],
    usefulFor: [
      "Biotechnology",
      "Bioinformatics",
      "Medicine",
      "Research",
    ],
  },

  ecology: {
    title: "Ecology",
    description:
      "Study relationships between organisms and their environments.",
    topics: [
      "Populations",
      "Communities",
      "Food webs",
      "Ecosystems",
      "Biodiversity",
      "Biogeochemical cycles",
      "Conservation",
    ],
    resources: [
      {
        name: "Khan Academy",
        description: "Ecology lessons and practice.",
        link: "https://www.khanacademy.org/science/biology",
      },
      {
        name: "OpenStax Biology",
        description: "Free ecology textbook resources.",
        link: "https://openstax.org/details/books/biology-2e",
      },
    ],
    usefulFor: [
      "Environmental science",
      "Climate research",
      "Conservation",
      "Data analysis",
    ],
  },

  evolution: {
    title: "Evolution",
    description:
      "Understand natural selection, adaptation, variation, and evolutionary change.",
    topics: [
      "Natural selection",
      "Variation",
      "Adaptation",
      "Speciation",
      "Population genetics",
      "Phylogenetics",
    ],
    resources: [
      {
        name: "Khan Academy",
        description: "Evolution lessons and practice.",
        link: "https://www.khanacademy.org/science/biology",
      },
      {
        name: "HHMI BioInteractive",
        description: "Interactive evolution resources.",
        link: "https://www.biointeractive.org/",
      },
    ],
    usefulFor: [
      "Research",
      "Ecology",
      "Genetics",
      "Biostatistics",
    ],
  },

  "human-biology": {
    title: "Human Biology",
    description:
      "Learn about human anatomy, physiology, and major body systems.",
    topics: [
      "Nervous system",
      "Circulatory system",
      "Respiratory system",
      "Digestive system",
      "Endocrine system",
      "Immune system",
    ],
    resources: [
      {
        name: "Khan Academy",
        description: "Human biology lessons and practice.",
        link: "https://www.khanacademy.org/science/biology",
      },
      {
        name: "OpenStax Biology",
        description: "Free biology reference material.",
        link: "https://openstax.org/details/books/biology-2e",
      },
    ],
    usefulFor: [
      "Medicine",
      "Health research",
      "Biotechnology",
      "Neuroscience",
    ],
  },

  microbiology: {
    title: "Microbiology",
    description:
      "Study microorganisms and how they interact with living systems.",
    topics: [
      "Bacteria",
      "Viruses",
      "Fungi",
      "Microbial genetics",
      "Microbial metabolism",
      "Host-pathogen interactions",
    ],
    resources: [
      {
        name: "OpenStax",
        description: "Free biology and microbiology resources.",
        link: "https://openstax.org/",
      },
      {
        name: "HHMI BioInteractive",
        description: "Interactive microbiology resources.",
        link: "https://www.biointeractive.org/",
      },
    ],
    usefulFor: [
      "Biotechnology",
      "Medicine",
      "Public health",
      "Research",
    ],
  },

  biostatistics: {
    title: "Biostatistics",
    description:
      "Use mathematics and statistics to analyze biological data.",
    topics: [
      "Descriptive statistics",
      "Probability",
      "Distributions",
      "Hypothesis testing",
      "Confidence intervals",
      "Regression",
      "Experimental design",
    ],
    resources: [
      {
        name: "Khan Academy",
        description: "Statistics and probability lessons.",
        link: "https://www.khanacademy.org/math/statistics-probability",
      },
      {
        name: "MIT OpenCourseWare",
        description: "University-level probability and statistics.",
        link: "https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/",
      },
    ],
    usefulFor: [
      "Biological research",
      "Clinical studies",
      "Data science",
      "Bioinformatics",
    ],
  },
};

export default function BiologyTopicPage() {
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
            onClick={() => router.push("/learn/biology")}
            className="mt-5 px-5 py-2.5 rounded-lg bg-[#202733] text-white"
          >
            Back to Biology
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
          onClick={() => router.push("/learn/biology")}
          className="text-sm text-[#5F7F91] hover:text-[#202733] transition"
        >
          ← Biology
        </button>

        <p className="text-sm text-[#5F7F91] font-medium mt-8 mb-3">
          Biology
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
            onClick={() => router.push("/learn/biology")}
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
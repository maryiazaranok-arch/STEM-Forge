"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function BiologyPage() {
  const router = useRouter();

  const topics = [
    {
      title: "Cell Biology",
      description:
        "Learn how cells are structured, organized, and how they function.",
      level: "Start here",
    },
    {
      title: "Genetics",
      description:
        "Understand DNA, genes, inheritance, mutations, and gene expression.",
      level: "Foundation",
    },
    {
      title: "Molecular Biology",
      description:
        "Explore proteins, DNA, RNA, enzymes, and molecular processes.",
      level: "Intermediate",
    },
    {
      title: "Ecology",
      description:
        "Study ecosystems, populations, biodiversity, and environmental systems.",
      level: "Foundation",
    },
    {
      title: "Evolution",
      description:
        "Learn natural selection, adaptation, variation, and evolutionary change.",
      level: "Intermediate",
    },
    {
      title: "Human Biology",
      description:
        "Explore human anatomy, physiology, organs, and body systems.",
      level: "Foundation",
    },
    {
      title: "Microbiology",
      description:
        "Study bacteria, viruses, fungi, and other microorganisms.",
      level: "Intermediate",
    },
    {
      title: "Biostatistics",
      description:
        "Use statistics and data analysis to understand biological research.",
      level: "Advanced",
    },
  ];

  const resources = [
    {
      name: "Khan Academy",
      description:
        "Clear explanations and practice for many core biology topics.",
      bestFor: "Learning + practice",
      link: "https://www.khanacademy.org/science/biology",
    },
    {
      name: "MIT OpenCourseWare",
      description:
        "University-level biology and life science courses with lectures and assignments.",
      bestFor: "Deep understanding",
      link: "https://ocw.mit.edu/search/?d=Biology",
    },
    {
      name: "OpenStax Biology",
      description:
        "Free biology textbooks covering cells, genetics, evolution, ecology, and more.",
      bestFor: "Textbook + reference",
      link: "https://openstax.org/details/books/biology-2e",
    },
    {
      name: "HHMI BioInteractive",
      description:
        "Free interactive resources, animations, activities, and videos for biology.",
      bestFor: "Interactive learning",
      link: "https://www.biointeractive.org/",
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
          Learn / Biology
        </p>

        <h1 className="text-4xl font-bold tracking-tight">
          Biology
        </h1>

        <p className="text-[#6F7782] mt-3 max-w-2xl leading-relaxed">
          Learn the principles of life, biology, and scientific research
          before applying them to real STEM projects.
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
                  `/learn/biology/${topic.title
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
            Free English-language resources for learning biology.
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
            Build something with biology
          </h2>

          <p className="text-[#6F7782] mt-3 max-w-2xl leading-relaxed">
            Explore projects involving biotechnology, genetics, ecology,
            health, environmental science, and biological data.
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
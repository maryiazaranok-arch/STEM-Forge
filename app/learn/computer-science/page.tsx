"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ComputerSciencePage() {
  const router = useRouter();

  const topics = [
    {
      title: "Programming Fundamentals",
      description:
        "Learn variables, functions, conditionals, loops, and problem solving.",
      level: "Start here",
    },
    {
      title: "Data Structures",
      description:
        "Understand arrays, linked lists, stacks, queues, trees, and graphs.",
      level: "Foundation",
    },
    {
      title: "Algorithms",
      description:
        "Learn searching, sorting, recursion, complexity, and algorithmic thinking.",
      level: "Foundation",
    },
    {
      title: "Web Development",
      description:
        "Build websites and web applications with HTML, CSS, JavaScript, and modern frameworks.",
      level: "Project ready",
    },
    {
      title: "Artificial Intelligence",
      description:
        "Explore machine learning, neural networks, data, and AI fundamentals.",
      level: "Advanced",
    },
    {
      title: "Computer Systems",
      description:
        "Learn how computers, operating systems, memory, networks, and hardware work.",
      level: "Advanced",
    },
    {
      title: "Databases",
      description:
        "Learn SQL, relational databases, data modeling, and how applications store data.",
      level: "Project ready",
    },
    {
      title: "Software Engineering",
      description:
        "Learn Git, testing, debugging, APIs, architecture, and building larger projects.",
      level: "Project ready",
    },
  ];

  const resources = [
    {
      name: "CS50",
      description:
        "A free introduction to computer science and programming from Harvard.",
      bestFor: "Strong foundation",
      link: "https://cs50.harvard.edu/x/",
    },
    {
      name: "freeCodeCamp",
      description:
        "Free interactive courses for programming, web development, data, and more.",
      bestFor: "Learning + projects",
      link: "https://www.freecodecamp.org/",
    },
    {
      name: "MIT OpenCourseWare",
      description:
        "University-level computer science courses with lectures, notes, assignments, and exams.",
      bestFor: "Deep understanding",
      link: "https://ocw.mit.edu/search/?d=Electrical%20Engineering%20and%20Computer%20Science",
    },
    {
      name: "The Odin Project",
      description:
        "A project-based path for learning web development through building real applications.",
      bestFor: "Web development",
      link: "https://www.theodinproject.com/",
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
          Learn / Computer Science
        </p>

        <h1 className="text-4xl font-bold tracking-tight">
          Computer Science
        </h1>

        <p className="text-[#6F7782] mt-3 max-w-2xl leading-relaxed">
          Build the programming and computer science skills you need to
          create real projects.
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
                  `/learn/computer-science/${topic.title
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
            Free English-language resources for learning computer science.
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
            Build something with computer science
          </h2>

          <p className="text-[#6F7782] mt-3 max-w-2xl leading-relaxed">
            Explore projects involving software, AI, data science, web
            development, algorithms, and research.
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
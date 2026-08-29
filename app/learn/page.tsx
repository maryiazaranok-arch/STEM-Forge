"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LearnPage() {
  const router = useRouter();

  const subjects = [
    {
      title: "Mathematics",
      description: "Build the foundation for STEM projects.",
    },
    {
      title: "Physics",
      description: "Understand how the world around us works.",
    },
    {
      title: "Chemistry",
      description: "Learn about matter, reactions, and materials.",
    },
    {
      title: "Biology",
      description: "Explore life, organisms, and natural systems.",
    },
    {
      title: "Computer Science",
      description: "Learn programming, algorithms, and problem solving.",
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
          Learn
        </p>

        <h1 className="text-4xl font-bold tracking-tight">
          Build the skills you need
        </h1>

        <p className="text-[#6F7782] mt-3 max-w-2xl leading-relaxed">
          Explore useful topics and find resources to prepare for real STEM
          projects.
        </p>

      </section>

      <section className="max-w-6xl mx-auto mt-10 pb-20">

        <div className="grid md:grid-cols-2 gap-5">

          {subjects.map((subject) => (
            <button
              key={subject.title}
              onClick={() =>
                router.push(
                  `/learn/${subject.title.toLowerCase().replaceAll(" ", "-")}`
                )
              }
              className="text-left bg-white border border-[#DFE1DE] rounded-xl p-6 shadow-sm hover:border-[#C9D4D9] hover:shadow-md transition"
            >

              <h2 className="text-xl font-semibold">
                {subject.title}
              </h2>

              <p className="text-[#6F7782] mt-2 leading-relaxed">
                {subject.description}
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
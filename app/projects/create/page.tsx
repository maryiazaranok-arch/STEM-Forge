"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function CreateProjectPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");

  async function handleCreateProject() {
    if (!title || !description) {
      alert("Please fill in the project title and description.");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("You need to be logged in.");
      return;
    }

    const { error } = await supabase
      .from("projects")
      .insert({
        owner_id: user.id,
        title: title,
        description: description,
        required_skills: skills,
      });

    if (error) {
      console.error(error);
      alert("Could not create project.");
      return;
    }

    alert("Project created!");
    router.push("/projects");
  }

  return (
    <main className="min-h-screen bg-[#F5F0E8] text-[#2C211B] px-6 py-8">

      {/* Navigation */}
      <nav className="max-w-6xl mx-auto flex items-center justify-between">

        <button
          onClick={() => router.push("/dashboard")}
          className="text-xl font-bold tracking-tight hover:text-[#7A6A5A] transition"
        >
          STEM Forge
        </button>

        <div className="flex items-center gap-8">

          <button
            onClick={() => router.push("/dashboard")}
            className="text-[#796B60] hover:text-[#6B5B4D] transition"
          >
            Dashboard
          </button>

          <button
            onClick={() => router.push("/projects")}
            className="text-[#796B60] hover:text-[#6B5B4D] transition"
          >
            Projects
          </button>

          <button
            onClick={() => router.push("/profile")}
            className="text-[#796B60] hover:text-[#6B5B4D] transition"
          >
            Profile
          </button>

        </div>

      </nav>

      {/* Page */}
      <section className="max-w-3xl mx-auto mt-20 pb-20">

        {/* Editorial heading */}
        <div className="mb-10">

          <p className="text-sm uppercase tracking-[0.2em] text-[#8A5A3B] font-medium mb-4">
            STEM Forge / Projects
          </p>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Create a project
          </h1>

          <p className="text-lg text-[#796B60] mt-4 max-w-xl leading-relaxed">
            Turn your idea into something real and find students who want to
            build it with you.
          </p>

        </div>

        {/* Form */}
        <div className="bg-[#FFFDF8] border border-[#E5D9CA] rounded-3xl p-7 md:p-9 shadow-sm">

          {/* Title */}
          <div className="mb-6">

            <label className="block text-sm font-medium text-[#4A3B32] mb-2">
              Project title
            </label>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. AI-powered study assistant"
              className="w-full bg-[#F8F3EC] border border-[#E2D5C6] rounded-xl px-4 py-3.5 text-[#2C211B] placeholder:text-[#A69A8F] outline-none focus:border-[#8A5A3B] focus:ring-2 focus:ring-[#8A5A3B]/10 transition"
            />

          </div>

          {/* Description */}
          <div className="mb-6">

            <label className="block text-sm font-medium text-[#4A3B32] mb-2">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What are you building? What problem does it solve?"
              rows={7}
              className="w-full bg-[#F8F3EC] border border-[#E2D5C6] rounded-xl px-4 py-3.5 text-[#2C211B] placeholder:text-[#A69A8F] outline-none focus:border-[#8A5A3B] focus:ring-2 focus:ring-[#8A5A3B]/10 transition resize-none"
            />

          </div>

          {/* Skills */}
          <div className="mb-8">

            <label className="block text-sm font-medium text-[#4A3B32] mb-2">
              Required skills
            </label>

            <input
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="Python, React, AI, Research..."
              className="w-full bg-[#F8F3EC] border border-[#E2D5C6] rounded-xl px-4 py-3.5 text-[#2C211B] placeholder:text-[#A69A8F] outline-none focus:border-[#8A5A3B] focus:ring-2 focus:ring-[#8A5A3B]/10 transition"
            />

            <p className="text-xs text-[#9A8C80] mt-2">
              Separate skills with commas.
            </p>

          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">

            <button
              onClick={handleCreateProject}
              className="flex-1 py-3.5 rounded-full bg-[#6B5B4D] text-white font-medium hover:bg-[#51443A] hover:-translate-y-0.5 transition-all shadow-md shadow-[#6B5B4D]/15"
            >
              Create Project
            </button>

            <button
              onClick={() => router.push("/projects")}
              className="px-7 py-3.5 rounded-full border border-[#D9CBBB] text-[#6B5B4D] font-medium hover:bg-[#F1E9DF] transition"
            >
              Cancel
            </button>

          </div>

        </div>

        {/* Small editorial footer */}
        <p className="text-center text-sm text-[#A69A8F] mt-7">
          Build. Research. Create.
        </p>

      </section>

    </main>
  );
}
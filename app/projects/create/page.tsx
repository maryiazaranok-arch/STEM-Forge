"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function CreateProjectPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");

  async function handleCreateProject() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

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
    return;
  }

  alert("Project created!");
}

  return (
    <main className="min-h-screen bg-[#0D1117] text-white px-6 py-12">

      <div className="max-w-2xl mx-auto">

        <h1 className="text-4xl font-bold mb-2">
          Create Project
        </h1>

        <p className="text-gray-400 mb-8">
          Start a new project and find teammates.
        </p>

        <div className="bg-[#161B22] border border-gray-800 rounded-2xl p-8">

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Project Title"
            className="w-full mb-4 bg-[#0D1117] border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-purple-500"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Project Description"
            rows={5}
            className="w-full mb-4 bg-[#0D1117] border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-purple-500 resize-none"
          />

          <input
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="Required Skills"
            className="w-full mb-6 bg-[#0D1117] border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-purple-500"
          />

          <button
            onClick={handleCreateProject}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-violet-500/70 to-blue-500/70 hover:from-violet-500 hover:to-blue-500 transition"
          >
            Create Project
          </button>

        </div>

      </div>

    </main>
  );
}
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

function toArray(value: any): string[] {
  if (Array.isArray(value)) {
    return value.filter(Boolean).map(String);
  }

  if (typeof value === "string") {
    const trimmed = value.trim();

    if (!trimmed) {
      return [];
    }

    try {
      const parsed = JSON.parse(trimmed);

      if (Array.isArray(parsed)) {
        return parsed.filter(Boolean).map(String);
      }
    } catch {
      return trimmed
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }
  }

  return [];
}

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [goals, setGoals] = useState<string[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    setUser(user);

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    if (profileError) {
      console.error(profileError);
    }

    if (profile) {
      setName(profile.full_name || "");
      setBio(profile.bio || "");
      setSkills(toArray(profile.skills));
      setInterests(toArray(profile.interests));
      setGoals(toArray(profile.goals));
    }

    const { data: projectData, error: projectError } = await supabase
      .from("projects")
      .select("*")
      .eq("owner_id", user.id)
      .order("created_at", { ascending: false });

    if (projectError) {
      console.error(projectError);
    }

    setProjects(projectData || []);
    setLoading(false);
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F5F4F0] text-[#202733] flex items-center justify-center">
        <p className="text-[#6F7782]">Loading profile...</p>
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
            className="text-[#6F7782] hover:text-[#202733] transition"
          >
            Learn
          </button>

          <button
            onClick={() => router.push("/profile")}
            className="text-[#202733] font-medium"
          >
            Profile
          </button>

        </div>

      </nav>

      <section className="max-w-4xl mx-auto mt-16 pb-20">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

          <div>
            <p className="text-sm text-[#5F7F91] font-medium mb-2">
              Profile
            </p>

            <h1 className="text-4xl font-bold tracking-tight">
              {name || "Your Profile"}
            </h1>

            <p className="text-[#6F7782] mt-2">
              {user?.email}
            </p>
          </div>

          <button
            onClick={() => router.push("/profile/edit")}
            className="w-fit px-5 py-3 rounded-lg bg-[#202733] text-white font-medium hover:bg-[#303948] transition"
          >
            Edit Profile
          </button>

        </div>

        <div className="mt-10 space-y-5">

          <div className="bg-white border border-[#DFE1DE] rounded-xl p-7 shadow-sm">

            <h2 className="text-xl font-semibold">
              About Me
            </h2>

            <p className="text-[#6F7782] mt-3 leading-relaxed">
              {bio || "No bio yet."}
            </p>

          </div>

          <div className="bg-white border border-[#DFE1DE] rounded-xl p-7 shadow-sm">

            <h2 className="text-xl font-semibold">
              Skills
            </h2>

            {skills.length > 0 ? (
              <div className="flex flex-wrap gap-2 mt-4">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 rounded-lg bg-[#E8EFF2] text-[#526C7A] text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-[#6F7782] mt-3">
                No skills added yet.
              </p>
            )}

          </div>

          <div className="bg-white border border-[#DFE1DE] rounded-xl p-7 shadow-sm">

            <h2 className="text-xl font-semibold">
              Interests
            </h2>

            {interests.length > 0 ? (
              <div className="flex flex-wrap gap-2 mt-4">
                {interests.map((interest, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 rounded-lg border border-[#D9DDDA] text-[#6F7782] text-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-[#6F7782] mt-3">
                No interests added yet.
              </p>
            )}

          </div>

          <div className="bg-white border border-[#DFE1DE] rounded-xl p-7 shadow-sm">

            <h2 className="text-xl font-semibold">
              Goals
            </h2>

            {goals.length > 0 ? (
              <div className="flex flex-wrap gap-2 mt-4">
                {goals.map((goal, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 rounded-lg bg-[#E8EFF2] text-[#526C7A] text-sm"
                  >
                    {goal}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-[#6F7782] mt-3">
                No goals added yet.
              </p>
            )}

          </div>

          <div className="bg-white border border-[#DFE1DE] rounded-xl p-7 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-[#5F7F91] font-medium">
                  Your work
                </p>

                <h2 className="text-2xl font-bold mt-1">
                  Projects
                </h2>
              </div>

              <span className="text-2xl font-bold">
                {projects.length}
              </span>

            </div>

            {projects.length === 0 ? (
              <div className="mt-6">

                <p className="text-[#6F7782]">
                  You haven't created any projects yet.
                </p>

                <button
                  onClick={() => router.push("/projects/create")}
                  className="mt-5 px-5 py-2.5 rounded-lg bg-[#202733] text-white hover:bg-[#303948] transition"
                >
                  Create Project
                </button>

              </div>
            ) : (
              <div className="mt-6 space-y-3">

                {projects.slice(0, 3).map((project) => (
                  <div
                    key={project.id}
                    className="border border-[#E5E6E2] rounded-lg p-4"
                  >
                    <h3 className="font-semibold">
                      {project.title}
                    </h3>

                    <p className="text-sm text-[#6F7782] mt-1">
                      {project.description}
                    </p>
                  </div>
                ))}

                {projects.length > 3 && (
                  <button
                    onClick={() => router.push("/projects")}
                    className="text-sm text-[#5F7F91] hover:text-[#202733] transition pt-2"
                  >
                    View all projects →
                  </button>
                )}

              </div>
            )}

          </div>

        </div>

      </section>

    </main>
  );
}
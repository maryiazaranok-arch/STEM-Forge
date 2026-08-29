"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const goalOptions = [
  "Find Teammates",
  "Build a Project",
  "Join a Project",
  "Conduct Research",
  "Find a Mentor",
  "Start a Startup",
  "Participate in Competitions",
  "Build a Portfolio",
];

const skillOptions = [
  "Programming",
  "Mathematics",
  "Physics",
  "Biology",
  "Chemistry",
  "Research",
  "Engineering",
  "Artificial Intelligence",
  "Robotics",
  "Data Science",
  "Entrepreneurship",
  "Design",
  "Public Speaking",
  "Leadership",
];

export default function EditProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [interests, setInterests] = useState("");
  const [goals, setGoals] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    if (data) {
      setName(data.full_name || "");
      setBio(data.bio || "");
      setSkills(Array.isArray(data.skills) ? data.skills : []);
      setInterests(
        Array.isArray(data.interests)
          ? data.interests.join(", ")
          : ""
      );
      setGoals(Array.isArray(data.goals) ? data.goals : []);
    }

    setLoading(false);
  }

  function toggleSkill(skill: string) {
    setSkills((current) =>
      current.includes(skill)
        ? current.filter((item) => item !== skill)
        : [...current, skill]
    );
  }

  function toggleGoal(goal: string) {
    setGoals((current) =>
      current.includes(goal)
        ? current.filter((item) => item !== goal)
        : [...current, goal]
    );
  }

  async function saveProfile() {
    if (!user) return;

    setSaving(true);

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: name,
        bio: bio,
        skills: skills,
        interests: interests
          ? interests
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean)
          : [],
        goals: goals,
      })
      .eq("id", user.id);

    if (error) {
      console.error(error);
      alert("Could not save your profile.");
      setSaving(false);
      return;
    }

    alert("Profile saved!");
    router.push("/profile");
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
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

          <button
            onClick={handleLogout}
            className="text-[#6F7782] hover:text-[#202733] transition"
          >
            Logout
          </button>

        </div>

      </nav>

      <section className="max-w-2xl mx-auto mt-16 pb-20">

        <div className="mb-8">

          <p className="text-sm text-[#5F7F91] font-medium mb-2">
            Profile
          </p>

          <h1 className="text-4xl font-bold tracking-tight">
            Edit Profile
          </h1>

          <p className="text-[#6F7782] mt-3">
            Update your information, skills, interests, and goals.
          </p>

        </div>

        <div className="bg-white border border-[#DFE1DE] rounded-2xl p-8 shadow-sm">

          <div className="space-y-7">

            <div>
              <label className="block text-sm font-medium mb-2">
                Email
              </label>

              <input
                value={user?.email || ""}
                disabled
                className="w-full px-4 py-3.5 rounded-lg bg-[#F1F2F0] border border-[#DFE1DE] text-[#8C939D]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Full Name
              </label>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full px-4 py-3.5 rounded-lg bg-[#F8F8F6] border border-[#DFE1DE] outline-none placeholder:text-[#9BA2AA] focus:border-[#5F7F91] transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                About Me
              </label>

              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell other students about yourself..."
                rows={4}
                className="w-full px-4 py-3.5 rounded-lg bg-[#F8F8F6] border border-[#DFE1DE] outline-none placeholder:text-[#9BA2AA] focus:border-[#5F7F91] transition resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-3">
                Skills
              </label>

              <div className="flex flex-wrap gap-2">

                {skillOptions.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={`px-3.5 py-2 rounded-lg border text-sm transition ${
                      skills.includes(skill)
                        ? "bg-[#5F7F91] border-[#5F7F91] text-white"
                        : "bg-white border-[#D9DDDA] text-[#6F7782] hover:border-[#5F7F91] hover:text-[#202733]"
                    }`}
                  >
                    {skill}
                  </button>
                ))}

              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Interests
              </label>

              <textarea
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                placeholder="Mathematics, AI, space, medicine..."
                rows={3}
                className="w-full px-4 py-3.5 rounded-lg bg-[#F8F8F6] border border-[#DFE1DE] outline-none placeholder:text-[#9BA2AA] focus:border-[#5F7F91] transition resize-none"
              />

              <p className="text-xs text-[#8C939D] mt-2">
                Separate interests with commas.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-3">
                Goals
              </label>

              <div className="flex flex-wrap gap-2">

                {goalOptions.map((goal) => (
                  <button
                    key={goal}
                    type="button"
                    onClick={() => toggleGoal(goal)}
                    className={`px-3.5 py-2 rounded-lg border text-sm transition ${
                      goals.includes(goal)
                        ? "bg-[#5F7F91] border-[#5F7F91] text-white"
                        : "bg-white border-[#D9DDDA] text-[#6F7782] hover:border-[#5F7F91] hover:text-[#202733]"
                    }`}
                  >
                    {goal}
                  </button>
                ))}

              </div>
            </div>

            <div className="flex gap-3 pt-2">

              <button
                onClick={saveProfile}
                disabled={saving}
                className="flex-1 py-3.5 rounded-lg bg-[#202733] text-white font-medium hover:bg-[#303948] disabled:opacity-50 transition"
              >
                {saving ? "Saving..." : "Save Profile"}
              </button>

              <button
                onClick={() => router.push("/profile")}
                className="px-6 py-3.5 rounded-lg border border-[#DFE1DE] text-[#6F7782] hover:bg-[#F5F4F0] hover:text-[#202733] transition"
              >
                Cancel
              </button>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

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

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [goals, setGoals] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

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

  async function handleRegister() {
    if (!name || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
        emailRedirectTo: "http://localhost:3000/profile",
      },
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    const user = data.user;

    if (!user) {
      alert("Account could not be created.");
      setLoading(false);
      return;
    }

    const { error: profileError } = await supabase
      .from("profiles")
      .insert({
        id: user.id,
        full_name: name,
        skills,
        interests: [],
        goals,
      });

    if (profileError) {
      console.error(profileError);
      alert("Account created, but profile could not be created.");
      setLoading(false);
      return;
    }

    alert("Account created! Check your email.");
    router.push("/profile/edit");
  }

  return (
    <main className="min-h-screen bg-[#F5F4F0] text-[#202733] px-6 py-8">

      <div className="max-w-2xl mx-auto">

        <div className="flex items-center justify-between mb-12">

          <button
            onClick={() => router.push("/")}
            className="text-xl font-bold tracking-tight hover:text-[#5F7F91] transition"
          >
            STEM Forge
          </button>

          <button
            onClick={() => router.push("/login")}
            className="text-sm text-[#6F7782] hover:text-[#202733] transition"
          >
            Log in
          </button>

        </div>

        <div className="max-w-xl mb-8">

          <p className="text-xs uppercase tracking-[0.18em] font-semibold text-[#5F7F91] mb-3">
            Get started
          </p>

          <h1 className="text-4xl font-bold tracking-tight">
            Create your account
          </h1>

          <p className="mt-3 text-[#6F7782] leading-relaxed">
            Tell us about yourself and what you want to build.
          </p>

        </div>

        <div className="bg-white border border-[#DFE1DE] rounded-2xl p-7 md:p-9 shadow-sm">

          <div className="space-y-7">

            <div>
              <label className="block text-sm font-medium mb-2">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[#F8F8F6] border border-[#DFE1DE] text-[#202733] placeholder:text-[#9BA2AA] outline-none focus:border-[#5F7F91] transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Email
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[#F8F8F6] border border-[#DFE1DE] text-[#202733] placeholder:text-[#9BA2AA] outline-none focus:border-[#5F7F91] transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Password
              </label>

              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[#F8F8F6] border border-[#DFE1DE] text-[#202733] placeholder:text-[#9BA2AA] outline-none focus:border-[#5F7F91] transition"
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

            <button
              onClick={handleRegister}
              disabled={loading}
              className="w-full py-3.5 rounded-lg bg-[#273855] text-white font-medium hover:bg-[#364257] disabled:opacity-50 transition"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>

          </div>

          <p className="text-center text-sm text-[#6F7782] mt-7">
            Already have an account?{" "}
            <button
              onClick={() => router.push("/login")}
              className="font-medium text-[#5F7F91] hover:text-[#202733] transition"
            >
              Log in
            </button>
          </p>

        </div>

      </div>

    </main>
  );
}

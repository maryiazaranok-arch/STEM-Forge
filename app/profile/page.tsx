"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { IBM_Plex_Sans } from "next/font/google";
import { useRouter } from "next/navigation";

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

export const logoFont = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["700"],
});


export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [interests, setInterests] = useState("");
  const [goals, setGoals] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    getUserAndProfile();
  }, []);

  async function getUserAndProfile() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  setUser(user);

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error || !data) return;

  setName(data.full_name || "");
  setBio(data.bio || "");

  if (Array.isArray(data.skills)) {
    setSkills(data.skills);
  }

  if (Array.isArray(data.goals)) {
    setGoals(data.goals);
  }

  if (Array.isArray(data.interests)) {
    setInterests(data.interests.join(", "));
  }
}

  function toggleGoal(goal: string) {
  if (goals.includes(goal)) {
    setGoals(goals.filter((item) => item !== goal));
  } else {
    setGoals([...goals, goal]);
  }
}

  function toggleSkill(skill: string) {
  if (skills.includes(skill)) {
    setSkills(skills.filter((item) => item !== skill));
  } else {
    setSkills([...skills, skill]);
  }
}

  async function saveProfile() {
    if (!user) return;

    const { error } = await supabase
    .from("profiles")
    .upsert({
      id: user.id,
      full_name: name,
      skills: skills,
      interests: interests
      ? interests.split(",").map((item) => item.trim())
      : [],
    goals: goals,
    });

  if (error) {
  console.error(error);
  return;
  }

  alert("Profile saved!");

  router.push("/dashboard");}

  return (
    <main className="min-h-screen bg-[#0D1117] text-white px-6 py-12">

      <div className="max-w-2xl mx-auto">

        <div className="mb-8">           
          <h1
            className={`${logoFont.className} text-2xl font-bold tracking-tight bg-linear-to-r from-violet-500/70 to-blue-500/70 bg-clip-text text-transparent`}>
            STEM Forge
          </h1>

          <h1 className="text-4xl font-bold">
            My Profile
          </h1>

          <p className="text-gray-400 mt-2">
            Tell the community about yourself.
          </p>
        </div>


        <div className="bg-[#161B22] border border-gray-800 rounded-2xl p-8">

          <div className="mb-6">

            <p className="text-sm text-gray-500">
              ACCOUNT
            </p>

            <p className="mt-2 text-gray-300">
              {user?.email}
            </p>

          </div>


          <div className="mb-6">

            <label className="block text-sm text-gray-400 mb-2">
              Full Name
            </label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full bg-[#0D1117] border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-purple-500"
            />

          </div>


          <div className="mb-6">

            <label className="block text-sm text-gray-400 mb-2">
              About Me
            </label>

            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell other students about yourself..."
              rows={4}
              className="w-full bg-[#0D1117] border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-purple-500"
            />

          </div>


          <div className="mb-8">

  <label className="block text-sm text-gray-400 mb-3">
    Skills
  </label>

  <div className="flex flex-wrap gap-3">

    {skillOptions.map((skill) => (
      <button
        key={skill}
        type="button"
        onClick={() => toggleSkill(skill)}
        className={`px-4 py-2 rounded-full border transition ${
        skills.includes(skill)
          ? "bg-gradient-to-r from-violet-500/70 to-blue-500/70 border-violet-400/50 text-white"
          : "border-gray-700 text-gray-300 hover:border-purple-500"
          }`} >
          {skill}
        </button>
      ))}

    </div>

  </div>


          <div className="mb-8">

            <label className="block text-sm text-gray-400 mb-2">
              Interests
            </label>

          <textarea
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            placeholder="Tell us what you're interested in..."
            rows={3}
            className="w-full bg-[#0D1117] border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-purple-500 resize-none"
          />

          <p className="text-gray-500 text-sm mt-2">
            You can write anything — from space exploration to cancer research.
          </p>

        </div>


          <div className="mb-8">

  <label className="block text-sm text-gray-400 mb-3">
    Goals
  </label>

  <div className="flex flex-wrap gap-3">

    {goalOptions.map((goal) => (
      <button
        key={goal}
        type="button"
        onClick={() => toggleGoal(goal)}
        className={`px-4 py-2 rounded-full border transition ${
          goals.includes(goal)
            ? "bg-gradient-to-r from-violet-500/50 to-blue-500/50 border-violet-400/40 text-white"
            : "border-gray-700 text-gray-300 hover:border-purple-500"
        }`}
      >
        {goal}
      </button>
    ))}

    </div>

  </div>


          <button
            onClick={saveProfile}
            className="w-full bg-[#8B5CF6] py-3 rounded-lg hover:bg-purple-700 transition"
          >
            Save Profile
          </button>

        </div>

      </div>

    </main>
  );
}


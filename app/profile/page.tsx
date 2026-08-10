"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");
  const [interests, setInterests] = useState("");
  const [goals, setGoals] = useState("");

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user);
  }

  async function saveProfile() {
    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .upsert({
        id: user.id,
        full_name: name,
        bio: bio,
        skills: skills ? skills.split(",") : [],
        interests: interests ? interests.split(",") : [],
        goals: goals ? goals.split(",") : [],
      });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Profile saved!");
  }

  return (
    <main className="min-h-screen bg-[#0D1117] text-white px-6 py-12">

      <div className="max-w-2xl mx-auto">

        <div className="mb-8">
          <p className="text-purple-400 text-sm mb-2">
            STEM FORGE
          </p>

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


          <div className="mb-6">

            <label className="block text-sm text-gray-400 mb-2">
              Skills
            </label>

            <input
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="Programming, Physics, Biology"
              className="w-full bg-[#0D1117] border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-purple-500"
            />

          </div>


          <div className="mb-6">

            <label className="block text-sm text-gray-400 mb-2">
              Interests
            </label>

            <input
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              placeholder="AI, Space, Robotics"
              className="w-full bg-[#0D1117] border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-purple-500"
            />

          </div>


          <div className="mb-8">

            <label className="block text-sm text-gray-400 mb-2">
              Goals
            </label>

            <input
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
              placeholder="Find teammates, research..."
              className="w-full bg-[#0D1117] border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-purple-500"
            />

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


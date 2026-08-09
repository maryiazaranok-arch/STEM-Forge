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

    alert("Saved!");
  }

  return (
    <main className="min-h-screen bg-[#0D1117] text-white p-8">

      <h1 className="text-3xl font-bold">
        My Profile
      </h1>

      <p className="mt-4">
        Email: {user?.email}
      </p>

      <div className="mt-8 max-w-md">

        <p>Name</p>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mt-1 mb-4 text-black"
        />


        <p>About me</p>

        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full p-2 mt-1 mb-4 text-black"
        />


        <p>Skills</p>

        <input
          placeholder="Programming, Physics, Biology"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          className="w-full p-2 mt-1 mb-4 text-black"
        />


        <p>Interests</p>

        <input
          placeholder="AI, Space, Robotics"
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
          className="w-full p-2 mt-1 mb-4 text-black"
        />


        <p>Goals</p>

        <input
          placeholder="Find teammates, research"
          value={goals}
          onChange={(e) => setGoals(e.target.value)}
          className="w-full p-2 mt-1 mb-4 text-black"
        />


        <button
          onClick={saveProfile}
          className="bg-purple-600 px-5 py-2"
        >
          Save
        </button>

      </div>

    </main>
  );
}


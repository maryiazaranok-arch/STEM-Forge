"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabase"

const goalData: Record<
  string,
  {
    title: string
    description: string
    subjects: string[]
    order: string[]
    resources: { name: string; description: string }[]
    projectIdeas: string[]
  }
> = {
  "ai-project": {
    title: "Build an AI Project",
    description:
      "Learn the mathematics, programming, statistics, and AI concepts needed to build your own intelligent system.",
    subjects: [
      "Mathematics",
      "Computer Science",
      "Statistics",
      "Artificial Intelligence",
    ],
    order: [
      "Python programming",
      "Algebra and functions",
      "Probability and statistics",
      "Data structures and algorithms",
      "Linear algebra",
      "Machine learning fundamentals",
      "Build an AI project",
    ],
    resources: [
      {
        name: "CS50",
        description:
          "Build strong programming and computer science foundations.",
      },
      {
        name: "Khan Academy",
        description:
          "Study algebra, statistics, probability, and other mathematics.",
      },
      {
        name: "3Blue1Brown",
        description:
          "Develop visual intuition for linear algebra and mathematical concepts.",
      },
    ],
    projectIdeas: [
      "Build a recommendation system",
      "Create an image classification model",
      "Build a study assistant",
      "Predict a real-world dataset",
    ],
  },

  "scientific-research": {
    title: "Do Scientific Research",
    description:
      "Develop the mathematical, scientific, and analytical skills needed to investigate real questions.",
    subjects: [
      "Mathematics",
      "Physics",
      "Biology",
      "Statistics",
      "Research",
    ],
    order: [
      "Mathematical foundations",
      "Choose a scientific field",
      "Learn experimental design",
      "Learn statistics",
      "Practice data analysis",
      "Read scientific papers",
      "Design your own research project",
    ],
    resources: [
      {
        name: "MIT OpenCourseWare",
        description:
          "University-level mathematics, physics, biology, and research-related courses.",
      },
      {
        name: "Khan Academy",
        description:
          "Build foundations in mathematics and science.",
      },
      {
        name: "HHMI BioInteractive",
        description:
          "Interactive biology materials and scientific investigations.",
      },
    ],
    projectIdeas: [
      "Analyze an open scientific dataset",
      "Conduct a small computational experiment",
      "Build a mathematical model",
      "Investigate a biological question",
    ],
  },

  robot: {
    title: "Build a Robot",
    description:
      "Combine programming, mathematics, physics, and engineering to design and build robotic systems.",
    subjects: [
      "Mathematics",
      "Physics",
      "Computer Science",
      "Engineering",
      "Robotics",
    ],
    order: [
      "Python or C++ programming",
      "Algebra and geometry",
      "Mechanics",
      "Electricity and circuits",
      "Sensors and motors",
      "Control systems",
      "Build a robot",
    ],
    resources: [
      {
        name: "Khan Academy",
        description:
          "Study mathematics and physics foundations.",
      },
      {
        name: "MIT OpenCourseWare",
        description:
          "Explore engineering, mechanics, electronics, and robotics.",
      },
      {
        name: "PhET",
        description:
          "Use simulations to understand physics and electrical systems.",
      },
    ],
    projectIdeas: [
      "Build an autonomous line-following robot",
      "Create a robotic arm",
      "Build a sensor-based robot",
      "Design a simple autonomous vehicle",
    ],
  },

  "work-with-data": {
    title: "Work with Data",
    description:
      "Learn how to collect, clean, analyze, visualize, and interpret real-world data.",
    subjects: [
      "Statistics",
      "Mathematics",
      "Computer Science",
      "Data Science",
    ],
    order: [
      "Python",
      "Basic statistics",
      "Probability",
      "Data cleaning",
      "Data visualization",
      "Regression",
      "Real-world data project",
    ],
    resources: [
      {
        name: "Khan Academy",
        description:
          "Learn probability, statistics, and data analysis.",
      },
      {
        name: "CS50",
        description:
          "Build programming and computational thinking skills.",
      },
      {
        name: "MIT OpenCourseWare",
        description:
          "Explore statistics, mathematics, and computer science.",
      },
    ],
    projectIdeas: [
      "Analyze public transportation data",
      "Explore climate data",
      "Analyze sports statistics",
      "Build a data visualization dashboard",
    ],
  },

  biotechnology: {
    title: "Explore Biotechnology",
    description:
      "Combine biology, chemistry, statistics, and computational methods to explore biotechnology.",
    subjects: [
      "Biology",
      "Chemistry",
      "Statistics",
      "Computer Science",
      "Biotechnology",
    ],
    order: [
      "Cell biology",
      "Genetics",
      "Molecular biology",
      "Chemistry fundamentals",
      "Biostatistics",
      "Bioinformatics",
      "Biotechnology project",
    ],
    resources: [
      {
        name: "Khan Academy",
        description:
          "Study biology, chemistry, genetics, and statistics.",
      },
      {
        name: "HHMI BioInteractive",
        description:
          "Explore interactive biology and genetics resources.",
      },
      {
        name: "MIT OpenCourseWare",
        description:
          "University-level biology, chemistry, and computational science.",
      },
    ],
    projectIdeas: [
      "Analyze a genomic dataset",
      "Build a simple bioinformatics tool",
      "Study population genetics",
      "Model a biological system",
    ],
  },

  competitions: {
    title: "Prepare for Competitions",
    description:
      "Develop the mathematical reasoning, problem-solving, and scientific thinking needed for challenging competitions.",
    subjects: [
      "Mathematics",
      "Physics",
      "Problem Solving",
      "Computer Science",
    ],
    order: [
      "Algebra",
      "Geometry",
      "Number theory",
      "Combinatorics",
      "Probability",
      "Advanced problem solving",
      "Competition practice",
    ],
    resources: [
      {
        name: "Art of Problem Solving",
        description:
          "Problems, discussions, and materials for mathematical competitions.",
      },
      {
        name: "Khan Academy",
        description:
          "Strengthen mathematics fundamentals.",
      },
      {
        name: "MIT OpenCourseWare",
        description:
          "Advanced mathematics and physics materials.",
      },
    ],
    projectIdeas: [
      "Solve olympiad problem sets",
      "Build a problem-solving notebook",
      "Create your own mathematical problems",
      "Build a competition preparation tool",
    ],
  },
}

export default function GoalPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const goal = searchParams.get("goal")
  const data = goal ? goalData[goal] : null

  const logout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  if (!data) {
    return (
      <main className="min-h-screen bg-[#F5F4F0] text-[#202733]">
        <nav className="border-b border-[#DFE1DE] bg-white">
          <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
            <button
              onClick={() => router.push("/learn")}
              className="font-bold text-xl"
            >
              STEM Forge
            </button>

            <div className="flex items-center gap-6 text-sm">
              <button onClick={() => router.push("/dashboard")}>
                Dashboard
              </button>
              <button onClick={() => router.push("/projects")}>
                Projects
              </button>
              <button onClick={() => router.push("/learn")}>
                Learn
              </button>
              <button onClick={() => router.push("/profile")}>
                Profile
              </button>
              <button onClick={logout}>Logout</button>
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Goal not found</h1>

          <button
            onClick={() => router.push("/learn")}
            className="bg-[#202733] text-white px-5 py-3 rounded-lg"
          >
            Back to Learn
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#F5F4F0] text-[#202733]">
      <nav className="border-b border-[#DFE1DE] bg-white">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <button
            onClick={() => router.push("/")}
            className="font-bold text-xl"
          >
            STEM Forge
          </button>

          <div className="flex items-center gap-6 text-sm">
            <button onClick={() => router.push("/dashboard")}>
              Dashboard
            </button>
            <button onClick={() => router.push("/projects")}>
              Projects
            </button>
            <button onClick={() => router.push("/learn")}>
              Learn
            </button>
            <button onClick={() => router.push("/profile")}>
              Profile
            </button>
            <button onClick={logout}>Logout</button>
          </div>
        </div>
      </nav>

      <section className="max-w-5xl mx-auto px-6 pt-16 pb-10">
        <button
          onClick={() => router.push("/learn")}
          className="text-sm text-[#6F7782] hover:text-[#202733] mb-6"
        >
          ← Learn
        </button>

        <h1 className="text-4xl font-bold mb-4">
          {data.title}
        </h1>

        <p className="text-lg text-[#6F7782] max-w-3xl">
          {data.description}
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border border-[#DFE1DE] rounded-xl p-7">
            <h2 className="text-xl font-semibold mb-5">
              Skills you need
            </h2>

            <div className="flex flex-wrap gap-3">
              {data.subjects.map((item) => (
                <span
                  key={item}
                  className="bg-[#E8EFF2] text-[#526C7A] px-4 py-2 rounded-lg text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white border border-[#DFE1DE] rounded-xl p-7">
            <h2 className="text-xl font-semibold mb-5">
              Suggested order
            </h2>

            <div className="space-y-3">
              {data.order.map((item, index) => (
                <div
                  key={item}
                  className="flex items-start gap-3"
                >
                  <div className="w-7 h-7 rounded-full bg-[#E8EFF2] text-[#526C7A] flex items-center justify-center text-sm font-semibold shrink-0">
                    {index + 1}
                  </div>

                  <span className="pt-1">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold mb-6">
          Recommended resources
        </h2>

        <div className="grid md:grid-cols-3 gap-5">
          {data.resources.map((resource) => (
            <div
              key={resource.name}
              className="bg-white border border-[#DFE1DE] rounded-xl p-6"
            >
              <h3 className="font-semibold text-lg mb-2">
                {resource.name}
              </h3>

              <p className="text-sm text-[#6F7782] leading-6">
                {resource.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-8 pb-20">
        <div className="bg-[#202733] rounded-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-5">
            Project ideas
          </h2>

          <div className="grid md:grid-cols-2 gap-3">
            {data.projectIdeas.map((idea) => (
              <div
                key={idea}
                className="bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-sm"
              >
                {idea}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
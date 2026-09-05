"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabase"

const topicData: Record<
  string,
  {
    title: string
    description: string
    learn: string[]
    order: string[]
    resources: { name: string; description: string }[]
    usefulFor: string[]
  }
> = {
  algebra: {
    title: "Algebra",
    description:
      "Build the foundations for solving equations, understanding functions, and modeling real problems.",
    learn: [
      "Equations and inequalities",
      "Systems of equations",
      "Polynomials",
      "Functions",
      "Exponents and logarithms",
      "Graphs and transformations",
      "Mathematical modeling",
    ],
    order: [
      "Equations and inequalities",
      "Functions and graphs",
      "Systems of equations",
      "Polynomials",
      "Exponents and logarithms",
      "Modeling",
    ],
    resources: [
      {
        name: "Khan Academy",
        description: "Structured lessons, explanations, and practice problems.",
      },
      {
        name: "MIT OpenCourseWare",
        description: "University-level mathematics courses and materials.",
      },
      {
        name: "3Blue1Brown",
        description: "Visual explanations of mathematical ideas.",
      },
    ],
    usefulFor: [
      "Mathematical modeling",
      "Programming",
      "Physics",
      "Data science",
      "Competitions",
    ],
  },

  geometry: {
    title: "Geometry",
    description:
      "Understand shapes, spatial relationships, proofs, coordinates, and transformations.",
    learn: [
      "Angles and triangles",
      "Circles",
      "Polygons",
      "Coordinate geometry",
      "Transformations",
      "Vectors",
      "Geometric proofs",
    ],
    order: [
      "Angles and basic constructions",
      "Triangles",
      "Circles and polygons",
      "Coordinate geometry",
      "Transformations",
      "Proofs",
      "Vectors",
    ],
    resources: [
      {
        name: "Khan Academy",
        description: "Geometry lessons with practice and visual explanations.",
      },
      {
        name: "Art of Problem Solving",
        description: "Challenging geometry problems and olympiad techniques.",
      },
      {
        name: "MIT OpenCourseWare",
        description: "More advanced mathematical and geometric topics.",
      },
    ],
    usefulFor: [
      "Physics",
      "Engineering",
      "Computer graphics",
      "Robotics",
      "Olympiads",
    ],
  },

  trigonometry: {
    title: "Trigonometry",
    description:
      "Learn how angles and triangles connect to waves, geometry, physics, and periodic systems.",
    learn: [
      "Right triangle trigonometry",
      "Sine, cosine, and tangent",
      "Unit circle",
      "Trigonometric identities",
      "Radians",
      "Graphs of trigonometric functions",
      "Applications",
    ],
    order: [
      "Right triangle trigonometry",
      "Sine, cosine, tangent",
      "Unit circle",
      "Radians",
      "Identities",
      "Graphs",
      "Applications",
    ],
    resources: [
      {
        name: "Khan Academy",
        description: "Step-by-step trigonometry lessons and practice.",
      },
      {
        name: "3Blue1Brown",
        description: "Visual intuition for sine, cosine, and periodic functions.",
      },
      {
        name: "MIT OpenCourseWare",
        description: "More advanced mathematical applications.",
      },
    ],
    usefulFor: [
      "Physics",
      "Engineering",
      "Signal processing",
      "Robotics",
      "Computer graphics",
    ],
  },

  calculus: {
    title: "Calculus",
    description:
      "Study change, accumulation, optimization, and mathematical models of real systems.",
    learn: [
      "Limits",
      "Derivatives",
      "Applications of derivatives",
      "Integrals",
      "Applications of integrals",
      "Sequences and series",
      "Optimization",
      "Differential equations",
    ],
    order: [
      "Functions review",
      "Limits",
      "Derivatives",
      "Applications of derivatives",
      "Integrals",
      "Applications of integrals",
      "Sequences and series",
      "Differential equations",
    ],
    resources: [
      {
        name: "Khan Academy",
        description: "Complete calculus pathway with theory and practice.",
      },
      {
        name: "MIT OpenCourseWare",
        description: "University-level calculus courses.",
      },
      {
        name: "3Blue1Brown",
        description: "Visual intuition for derivatives and integrals.",
      },
    ],
    usefulFor: [
      "Physics",
      "Machine learning",
      "Artificial intelligence",
      "Optimization",
      "Scientific research",
    ],
  },

  "linear-algebra": {
    title: "Linear Algebra",
    description:
      "Learn vectors, matrices, transformations, and the mathematics behind modern computing.",
    learn: [
      "Vectors",
      "Matrices",
      "Systems of linear equations",
      "Vector spaces",
      "Linear transformations",
      "Eigenvalues and eigenvectors",
      "Matrix applications",
    ],
    order: [
      "Vectors",
      "Matrices",
      "Linear systems",
      "Vector spaces",
      "Linear transformations",
      "Eigenvalues and eigenvectors",
    ],
    resources: [
      {
        name: "3Blue1Brown",
        description: "Visual introduction to linear algebra.",
      },
      {
        name: "MIT OpenCourseWare",
        description: "University-level linear algebra courses.",
      },
      {
        name: "Khan Academy",
        description: "Practice and foundational explanations.",
      },
    ],
    usefulFor: [
      "Machine learning",
      "Computer graphics",
      "Robotics",
      "Physics",
      "Data science",
    ],
  },

  probability: {
    title: "Probability & Statistics",
    description:
      "Understand uncertainty, data, distributions, inference, and mathematical decision-making.",
    learn: [
      "Basic probability",
      "Conditional probability",
      "Random variables",
      "Probability distributions",
      "Expected value",
      "Hypothesis testing",
      "Confidence intervals",
      "Regression",
    ],
    order: [
      "Basic probability",
      "Conditional probability",
      "Random variables",
      "Distributions",
      "Expected value",
      "Statistical inference",
      "Regression",
    ],
    resources: [
      {
        name: "Khan Academy",
        description: "Probability and statistics courses with practice.",
      },
      {
        name: "MIT OpenCourseWare",
        description: "University-level probability and statistics.",
      },
      {
        name: "Art of Problem Solving",
        description: "Interesting probability problems and problem solving.",
      },
    ],
    usefulFor: [
      "Data science",
      "Artificial intelligence",
      "Machine learning",
      "Scientific research",
      "Experiments",
    ],
  },

  "number-theory": {
    title: "Number Theory",
    description:
      "Explore integers, primes, divisibility, modular arithmetic, and mathematical proofs.",
    learn: [
      "Prime numbers",
      "Divisibility",
      "Greatest common divisor",
      "Modular arithmetic",
      "Diophantine equations",
      "Congruences",
      "Proof techniques",
    ],
    order: [
      "Divisibility",
      "Prime numbers",
      "GCD and Euclidean algorithm",
      "Modular arithmetic",
      "Congruences",
      "Diophantine equations",
      "Proofs",
    ],
    resources: [
      {
        name: "Art of Problem Solving",
        description: "Excellent number theory problems and olympiad material.",
      },
      {
        name: "Khan Academy",
        description: "Foundational explanations and practice.",
      },
      {
        name: "MIT OpenCourseWare",
        description: "More advanced mathematical material.",
      },
    ],
    usefulFor: [
      "Mathematical competitions",
      "Cryptography",
      "Algorithms",
      "Proofs",
      "Theoretical computer science",
    ],
  },

  "problem-solving": {
    title: "Problem Solving",
    description:
      "Develop the reasoning skills needed to solve unfamiliar mathematical and scientific problems.",
    learn: [
      "Logical reasoning",
      "Proof strategies",
      "Combinatorics",
      "Pattern recognition",
      "Induction",
      "Contradiction",
      "Creative problem solving",
    ],
    order: [
      "Logical reasoning",
      "Patterns and invariants",
      "Proof techniques",
      "Combinatorics",
      "Induction",
      "Contradiction",
      "Olympiad-style problems",
    ],
    resources: [
      {
        name: "Art of Problem Solving",
        description: "Large collection of challenging competition problems.",
      },
      {
        name: "Khan Academy",
        description: "Foundational mathematics and problem practice.",
      },
      {
        name: "3Blue1Brown",
        description: "Visual mathematical intuition and explanations.",
      },
    ],
    usefulFor: [
      "Olympiads",
      "Research",
      "Programming",
      "Competitive programming",
      "Any STEM project",
    ],
  },
}

export default function TopicPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const topic = searchParams.get("topic")
  const data = topic ? topicData[topic] : null

  const logout = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  if (!data) {
    return (
      <main className="min-h-screen bg-[#F5F4F0] text-[#202733]">
        <nav className="border-b border-[#DFE1DE] bg-white">
          <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
            <button
              onClick={() => router.push("/learn/mathematics")}
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
              <button onClick={() => router.push("/learn")}>Learn</button>
              <button onClick={() => router.push("/profile")}>Profile</button>
              <button onClick={logout}>Logout</button>
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Topic not found</h1>
          <button
            onClick={() => router.push("/learn/mathematics")}
            className="bg-[#202733] text-white px-5 py-3 rounded-lg"
          >
            Back to Mathematics
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
            onClick={() => router.push("/learn/mathematics")}
            className="font-bold text-xl"
          >
            STEM Forge
          </button>

          <div className="flex items-center gap-6 text-sm">
            <button onClick={() => router.push("/dashboard")}>
              Dashboard
            </button>
            <button onClick={() => router.push("/projects")}>Projects</button>
            <button onClick={() => router.push("/learn")}>Learn</button>
            <button onClick={() => router.push("/profile")}>Profile</button>
            <button onClick={logout}>Logout</button>
          </div>
        </div>
      </nav>

      <section className="max-w-5xl mx-auto px-6 pt-16 pb-10">
        <button
          onClick={() => router.push("/learn/mathematics")}
          className="text-sm text-[#6F7782] hover:text-[#202733] mb-6"
        >
          ← Mathematics
        </button>

        <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
        <p className="text-lg text-[#6F7782] max-w-3xl">
          {data.description}
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border border-[#DFE1DE] rounded-xl p-7">
            <h2 className="text-xl font-semibold mb-5">What to learn</h2>

            <div className="space-y-3">
              {data.learn.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-[#6F7782]"
                >
                  <div className="w-2 h-2 rounded-full bg-[#5F7F91]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-[#DFE1DE] rounded-xl p-7">
            <h2 className="text-xl font-semibold mb-5">Suggested order</h2>

            <div className="space-y-3">
              {data.order.map((item, index) => (
                <div key={item} className="flex items-start gap-3">
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
        <h2 className="text-2xl font-bold mb-6">Recommended resources</h2>

        <div className="grid md:grid-cols-3 gap-5">
          {data.resources.map((resource) => (
            <div
              key={resource.name}
              className="bg-white border border-[#DFE1DE] rounded-xl p-6"
            >
              <h3 className="font-semibold text-lg mb-2">{resource.name}</h3>
              <p className="text-sm text-[#6F7782] leading-6">
                {resource.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-8 pb-20">
        <div className="bg-[#202733] rounded-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-5">Useful for</h2>

          <div className="flex flex-wrap gap-3">
            {data.usefulFor.map((item) => (
              <span
                key={item}
                className="bg-white/10 border border-white/10 px-4 py-2 rounded-lg text-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
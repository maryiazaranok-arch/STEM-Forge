"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

const topicData: Record<
  string,
  {
    title: string;
    description: string;
    topics: string[];
    resources: {
      name: string;
      description: string;
      link: string;
    }[];
    usefulFor: string[];
  }
> = {
  algebra: {
    title: "Algebra",
    description:
      "Build the foundation for functions, equations, mathematical modeling, and programming.",
    topics: [
      "Equations and inequalities",
      "Systems of equations",
      "Polynomials",
      "Functions",
      "Exponents and logarithms",
      "Graphs",
      "Mathematical modeling",
    ],
    resources: [
      {
        name: "Khan Academy",
        description: "Step-by-step algebra lessons and practice.",
        link: "https://www.khanacademy.org/math/algebra",
      },
      {
        name: "MIT OpenCourseWare",
        description: "University-level mathematics materials.",
        link: "https://ocw.mit.edu/search/?d=Mathematics",
      },
      {
        name: "Art of Problem Solving",
        description: "More challenging algebra problems.",
        link: "https://artofproblemsolving.com/resources",
      },
    ],
    usefulFor: [
      "Programming",
      "Data analysis",
      "Scientific modeling",
      "Engineering",
    ],
  },

  geometry: {
    title: "Geometry",
    description:
      "Develop spatial reasoning, coordinate geometry, and mathematical proof skills.",
    topics: [
      "Angles and triangles",
      "Circles",
      "Polygons",
      "Coordinate geometry",
      "Transformations",
      "Vectors",
      "Geometric proofs",
    ],
    resources: [
      {
        name: "Khan Academy",
        description: "Interactive geometry lessons and practice.",
        link: "https://www.khanacademy.org/math/geometry",
      },
      {
        name: "Art of Problem Solving",
        description: "Challenging geometry problems.",
        link: "https://artofproblemsolving.com/resources",
      },
      {
        name: "MIT OpenCourseWare",
        description: "University mathematics resources.",
        link: "https://ocw.mit.edu/search/?d=Mathematics",
      },
    ],
    usefulFor: [
      "Computer graphics",
      "Robotics",
      "Physics",
      "3D modeling",
    ],
  },

  trigonometry: {
    title: "Trigonometry",
    description:
      "Learn how angles and periodic functions connect mathematics with physics and engineering.",
    topics: [
      "Right-triangle trigonometry",
      "Sine and cosine",
      "Tangent",
      "Unit circle",
      "Trigonometric identities",
      "Radians",
      "Graphs of trigonometric functions",
    ],
    resources: [
      {
        name: "Khan Academy",
        description: "Structured trigonometry lessons and practice.",
        link: "https://www.khanacademy.org/math/trigonometry",
      },
      {
        name: "3Blue1Brown",
        description: "Visual mathematical explanations.",
        link: "https://www.3blue1brown.com/",
      },
      {
        name: "Art of Problem Solving",
        description: "Challenging mathematical problems.",
        link: "https://artofproblemsolving.com/resources",
      },
    ],
    usefulFor: [
      "Physics simulations",
      "Robotics",
      "Engineering",
      "Computer graphics",
    ],
  },

  calculus: {
    title: "Calculus",
    description:
      "Understand change, motion, accumulation, optimization, and mathematical modeling.",
    topics: [
      "Limits",
      "Derivatives",
      "Applications of derivatives",
      "Integrals",
      "Applications of integrals",
      "Sequences and series",
      "Optimization",
      "Differential equations",
    ],
    resources: [
      {
        name: "Khan Academy",
        description: "Lessons and practice for calculus.",
        link: "https://www.khanacademy.org/math/calculus-1",
      },
      {
        name: "MIT OpenCourseWare",
        description: "University-level calculus materials.",
        link: "https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/",
      },
      {
        name: "3Blue1Brown",
        description: "Visual explanations of calculus.",
        link: "https://www.3blue1brown.com/topics/calculus",
      },
    ],
    usefulFor: [
      "Physics",
      "Optimization",
      "AI and machine learning",
      "Scientific simulations",
      "Population models",
    ],
  },

  "linear-algebra": {
    title: "Linear Algebra",
    description:
      "Learn the mathematics behind vectors, matrices, transformations, and computational methods.",
    topics: [
      "Vectors",
      "Matrices",
      "Linear systems",
      "Matrix transformations",
      "Vector spaces",
      "Eigenvalues and eigenvectors",
      "Linear transformations",
    ],
    resources: [
      {
        name: "MIT OpenCourseWare",
        description: "Complete university-level linear algebra materials.",
        link: "https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/",
      },
      {
        name: "3Blue1Brown",
        description: "Visual explanations of linear algebra.",
        link: "https://www.3blue1brown.com/topics/linear-algebra",
      },
      {
        name: "Khan Academy",
        description: "Interactive linear algebra lessons.",
        link: "https://www.khanacademy.org/math/linear-algebra",
      },
    ],
    usefulFor: [
      "Machine learning",
      "Computer graphics",
      "Computer vision",
      "Physics",
      "Data science",
    ],
  },

  probability: {
    title: "Probability & Statistics",
    description:
      "Learn how to reason about uncertainty, analyze data, and understand statistical evidence.",
    topics: [
      "Basic probability",
      "Conditional probability",
      "Random variables",
      "Probability distributions",
      "Expected value",
      "Hypothesis testing",
      "Confidence intervals",
      "Linear regression",
    ],
    resources: [
      {
        name: "Khan Academy",
        description: "Probability and statistics lessons and practice.",
        link: "https://www.khanacademy.org/math/statistics-probability",
      },
      {
        name: "MIT OpenCourseWare",
        description: "University-level probability and statistics.",
        link: "https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/",
      },
      {
        name: "Art of Problem Solving",
        description: "Probability and counting problems.",
        link: "https://artofproblemsolving.com/resources",
      },
    ],
    usefulFor: [
      "Data science",
      "Scientific research",
      "AI and machine learning",
      "Experiments",
      "Data analysis",
    ],
  },

  "number-theory": {
    title: "Number Theory",
    description:
      "Explore the properties of integers and develop strong mathematical problem-solving skills.",
    topics: [
      "Prime numbers",
      "Divisibility",
      "Greatest common divisor",
      "Modular arithmetic",
      "Diophantine equations",
      "Congruences",
      "Number-theoretic proofs",
    ],
    resources: [
      {
        name: "Art of Problem Solving",
        description: "Number theory problems and resources.",
        link: "https://artofproblemsolving.com/resources",
      },
      {
        name: "Khan Academy",
        description: "Foundational mathematics practice.",
        link: "https://www.khanacademy.org/math",
      },
      {
        name: "MIT OpenCourseWare",
        description: "Broader mathematics resources.",
        link: "https://ocw.mit.edu/search/?d=Mathematics",
      },
    ],
    usefulFor: [
      "Algorithms",
      "Cryptography",
      "Programming",
      "Olympiad mathematics",
    ],
  },

  "problem-solving": {
    title: "Problem Solving",
    description:
      "Develop the ability to approach unfamiliar mathematical problems and reason creatively.",
    topics: [
      "Logical reasoning",
      "Proof strategies",
      "Combinatorics",
      "Creative problem solving",
      "Pattern recognition",
      "Proof by contradiction",
      "Mathematical induction",
    ],
    resources: [
      {
        name: "Art of Problem Solving",
        description: "A large collection of mathematical problems.",
        link: "https://artofproblemsolving.com/resources",
      },
      {
        name: "Khan Academy",
        description: "Practice foundational mathematical concepts.",
        link: "https://www.khanacademy.org/math",
      },
    ],
    usefulFor: [
      "Mathematical competitions",
      "Research",
      "Programming",
      "Algorithms",
      "Scientific reasoning",
    ],
  },
};

export default function TopicPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const topic = searchParams.get("topic");
  const data = topic ? topicData[topic] : null;

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  if (!data) {
    return (
      <main className="min-h-screen bg-[#F5F4F0] text-[#202733] px-6 py-10">
        <div className="max-w-4xl mx-auto">

          <h1 className="text-3xl font-bold">
            Topic not found
          </h1>

          <button
            onClick={() => router.push("/learn/mathematics")}
            className="mt-5 px-5 py-2.5 rounded-lg bg-[#202733] text-white hover:bg-[#303948] transition"
          >
            Back to Mathematics
          </button>

        </div>
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
            className="text-[#202733] font-medium"
          >
            Learn
          </button>

          <button
            onClick={() => router.push("/profile")}
            className="text-[#6F7782] hover:text-[#202733] transition"
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

      <section className="max-w-4xl mx-auto mt-16 pb-20">

        <button
          onClick={() => router.push("/learn/mathematics")}
          className="text-sm text-[#5F7F91] hover:text-[#202733] transition"
        >
          ← Mathematics
        </button>

        <p className="text-sm text-[#5F7F91] font-medium mt-8 mb-3">
          Mathematics
        </p>

        <h1 className="text-4xl font-bold tracking-tight">
          {data.title}
        </h1>

        <p className="text-lg text-[#6F7782] mt-4 max-w-2xl leading-relaxed">
          {data.description}
        </p>

        <div className="mt-10 bg-white border border-[#DFE1DE] rounded-xl p-7 shadow-sm">

          <p className="text-sm text-[#5F7F91] font-medium">
            What to learn
          </p>

          <h2 className="text-2xl font-bold mt-1">
            Core concepts
          </h2>

          <div className="mt-6 space-y-3">

            {data.topics.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3"
              >
                <span className="w-2 h-2 rounded-full bg-[#5F7F91]" />

                <p className="text-[#555E69]">
                  {item}
                </p>
              </div>
            ))}

          </div>

        </div>

        <section className="mt-10">

          <p className="text-sm text-[#5F7F91] font-medium">
            Where to learn
          </p>

          <h2 className="text-2xl font-bold mt-1 mb-6">
            Recommended resources
          </h2>

          <div className="space-y-4">

            {data.resources.map((resource) => (
              <a
                key={resource.name}
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white border border-[#DFE1DE] rounded-xl p-6 shadow-sm hover:border-[#C9D4D9] hover:shadow-md transition"
              >

                <div className="flex items-center justify-between">

                  <h3 className="text-xl font-semibold">
                    {resource.name}
                  </h3>

                  <span className="text-[#5F7F91]">
                    ↗
                  </span>

                </div>

                <p className="text-[#6F7782] mt-3 leading-relaxed">
                  {resource.description}
                </p>

                <p className="text-sm text-[#5F7F91] mt-4">
                  Open resource →
                </p>

              </a>
            ))}

          </div>

        </section>

        <div className="mt-8 bg-white border border-[#DFE1DE] rounded-xl p-7 shadow-sm">

          <p className="text-sm text-[#5F7F91] font-medium">
            Useful for
          </p>

          <h2 className="text-2xl font-bold mt-1">
            What can you use it for?
          </h2>

          <div className="flex flex-wrap gap-2 mt-5">

            {data.usefulFor.map((item) => (
              <span
                key={item}
                className="px-3 py-1.5 rounded-lg bg-[#E8EFF2] text-[#526C7A] text-sm"
              >
                {item}
              </span>
            ))}

          </div>

        </div>

        <div className="mt-8 flex gap-3">

          <button
            onClick={() => router.push("/learn/mathematics")}
            className="px-5 py-2.5 rounded-lg border border-[#D9DDDA] text-[#6F7782] hover:bg-white hover:text-[#202733] transition"
          >
            Back
          </button>

          <button
            onClick={() => router.push("/projects")}
            className="px-5 py-2.5 rounded-lg bg-[#202733] text-white hover:bg-[#303948] transition"
          >
            Explore Projects
          </button>

        </div>

      </section>

    </main>
  );
}
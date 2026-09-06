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
  "programming-fundamentals": {
    title: "Programming Fundamentals",
    description:
      "Build the core programming skills needed to understand code and create your own software.",
    learn: [
      "Variables and data types",
      "Conditionals",
      "Loops",
      "Functions",
      "Lists and dictionaries",
      "File handling",
      "Basic debugging",
    ],
    order: [
      "Variables and data types",
      "Conditionals",
      "Loops",
      "Functions",
      "Collections",
      "Files and errors",
      "Small programming projects",
    ],
    resources: [
      {
        name: "CS50",
        description:
          "A strong introduction to computer science and programming.",
      },
      {
        name: "freeCodeCamp",
        description:
          "Practice programming through interactive lessons and projects.",
      },
      {
        name: "The Odin Project",
        description:
          "Learn programming through practical project-based development.",
      },
    ],
    usefulFor: [
      "Software development",
      "Web development",
      "Algorithms",
      "AI",
      "Automation",
    ],
  },

  "data-structures": {
    title: "Data Structures",
    description:
      "Learn how information is organized in programs and how different structures affect efficiency.",
    learn: [
      "Arrays",
      "Linked lists",
      "Stacks",
      "Queues",
      "Hash tables",
      "Trees",
      "Graphs",
    ],
    order: [
      "Arrays and lists",
      "Stacks and queues",
      "Hash tables",
      "Trees",
      "Binary search trees",
      "Graphs",
      "Choosing the right data structure",
    ],
    resources: [
      {
        name: "CS50",
        description:
          "Learn fundamental data structures as part of computer science.",
      },
      {
        name: "freeCodeCamp",
        description:
          "Practice data structures and programming concepts.",
      },
      {
        name: "MIT OpenCourseWare",
        description:
          "Explore deeper computer science and algorithms material.",
      },
    ],
    usefulFor: [
      "Algorithms",
      "Competitive programming",
      "Software engineering",
      "AI",
      "Systems",
    ],
  },

  algorithms: {
    title: "Algorithms",
    description:
      "Learn how to design efficient step-by-step solutions to computational problems.",
    learn: [
      "Searching",
      "Sorting",
      "Recursion",
      "Complexity",
      "Greedy algorithms",
      "Dynamic programming",
      "Graph algorithms",
    ],
    order: [
      "Algorithmic thinking",
      "Searching",
      "Sorting",
      "Recursion",
      "Time and space complexity",
      "Greedy algorithms",
      "Dynamic programming",
      "Graphs",
    ],
    resources: [
      {
        name: "CS50",
        description:
          "Build algorithmic thinking through practical computer science.",
      },
      {
        name: "MIT OpenCourseWare",
        description:
          "Study algorithms at a university level.",
      },
      {
        name: "Art of Problem Solving",
        description:
          "Develop advanced mathematical and algorithmic problem solving.",
      },
    ],
    usefulFor: [
      "Competitive programming",
      "AI",
      "Software engineering",
      "Research",
      "Problem solving",
    ],
  },

  "web-development": {
    title: "Web Development",
    description:
      "Learn how modern websites and web applications are designed, built, and deployed.",
    learn: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Next.js",
      "APIs",
      "Databases",
    ],
    order: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Next.js",
      "APIs",
      "Databases",
      "Build a complete web application",
    ],
    resources: [
      {
        name: "MDN Web Docs",
        description:
          "Detailed documentation for HTML, CSS, JavaScript, and web technologies.",
      },
      {
        name: "freeCodeCamp",
        description:
          "Interactive web development courses and projects.",
      },
      {
        name: "The Odin Project",
        description:
          "Project-based web development curriculum.",
      },
    ],
    usefulFor: [
      "STEM Forge",
      "Startups",
      "Portfolio projects",
      "Software engineering",
      "Entrepreneurship",
    ],
  },

  "artificial-intelligence": {
    title: "Artificial Intelligence",
    description:
      "Explore the mathematical and computational foundations behind intelligent systems.",
    learn: [
      "Machine learning",
      "Supervised learning",
      "Unsupervised learning",
      "Neural networks",
      "Model evaluation",
      "Feature engineering",
      "AI applications",
    ],
    order: [
      "Python",
      "Probability and statistics",
      "Linear algebra",
      "Machine learning basics",
      "Model evaluation",
      "Neural networks",
      "AI project",
    ],
    resources: [
      {
        name: "Khan Academy",
        description:
          "Build the mathematics foundations used in machine learning.",
      },
      {
        name: "CS50",
        description:
          "Explore artificial intelligence through practical computer science.",
      },
      {
        name: "MIT OpenCourseWare",
        description:
          "Advanced computer science and AI course materials.",
      },
    ],
    usefulFor: [
      "Machine learning",
      "Scientific research",
      "Data science",
      "Robotics",
      "AI projects",
    ],
  },

  "computer-systems": {
    title: "Computer Systems",
    description:
      "Understand what happens inside a computer and how software interacts with hardware.",
    learn: [
      "Computer architecture",
      "Memory",
      "CPU",
      "Operating systems",
      "Processes",
      "Networking",
      "Binary and digital logic",
    ],
    order: [
      "Binary and data representation",
      "Computer architecture",
      "CPU and memory",
      "Operating systems",
      "Processes and threads",
      "Networking",
      "System-level programming",
    ],
    resources: [
      {
        name: "CS50",
        description:
          "Learn how software works closer to the hardware level.",
      },
      {
        name: "MIT OpenCourseWare",
        description:
          "University-level systems and computer architecture courses.",
      },
      {
        name: "freeCodeCamp",
        description:
          "Additional explanations and programming practice.",
      },
    ],
    usefulFor: [
      "Systems programming",
      "Cybersecurity",
      "Networking",
      "Engineering",
      "Software development",
    ],
  },

  databases: {
    title: "Databases",
    description:
      "Learn how applications store, retrieve, organize, and manage large amounts of information.",
    learn: [
      "Relational databases",
      "SQL",
      "Tables and relationships",
      "Keys",
      "Indexes",
      "Database design",
      "APIs and databases",
    ],
    order: [
      "Database concepts",
      "Tables and relationships",
      "SQL basics",
      "Filtering and joins",
      "Database design",
      "Indexes",
      "Connect databases to applications",
    ],
    resources: [
      {
        name: "freeCodeCamp",
        description:
          "Practice SQL and database development.",
      },
      {
        name: "MDN Web Docs",
        description:
          "Learn how databases connect to modern web applications.",
      },
      {
        name: "CS50",
        description:
          "Explore databases as part of a broader computer science curriculum.",
      },
    ],
    usefulFor: [
      "Web applications",
      "STEM Forge",
      "Data science",
      "Backend development",
      "Software engineering",
    ],
  },

  "software-engineering": {
    title: "Software Engineering",
    description:
      "Learn how to plan, build, test, organize, and maintain software projects.",
    learn: [
      "Software architecture",
      "Git and version control",
      "Testing",
      "Debugging",
      "APIs",
      "Project structure",
      "Deployment",
    ],
    order: [
      "Git and GitHub",
      "Project structure",
      "Clean and readable code",
      "Debugging",
      "Testing",
      "APIs",
      "Deployment",
      "Maintaining a real project",
    ],
    resources: [
      {
        name: "CS50",
        description:
          "Develop practical computer science and software development skills.",
      },
      {
        name: "The Odin Project",
        description:
          "Learn software development by building real projects.",
      },
      {
        name: "MDN Web Docs",
        description:
          "Use high-quality web development documentation.",
      },
    ],
    usefulFor: [
      "STEM Forge",
      "Startups",
      "Team projects",
      "Open source",
      "Software development",
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
    router.push("/login")
  }

  if (!data) {
    return (
      <main className="min-h-screen bg-[#F5F4F0] text-[#202733]">
        <nav className="border-b border-[#DFE1DE] bg-white">
          <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
            <button
              onClick={() => router.push("/learn/computer-science")}
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
          <h1 className="text-3xl font-bold mb-4">
            Topic not found
          </h1>

          <button
            onClick={() => router.push("/learn/computer-science")}
            className="bg-[#202733] text-white px-5 py-3 rounded-lg"
          >
            Back to Computer Science
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
          onClick={() => router.push("/learn/computer-science")}
          className="text-sm text-[#6F7782] hover:text-[#202733] mb-6"
        >
          ← Computer Science
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
              What to learn
            </h2>

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
            Useful for
          </h2>

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
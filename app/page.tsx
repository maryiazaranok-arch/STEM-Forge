import Link from "next/link";
import { IBM_Plex_Sans } from "next/font/google";

export const logoFont = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

export default function Home() {
  const features = [
    {
      title: "Find Teammates",
      text: "Connect with students who share your interests.",
    },
    {
      title: "Build Projects",
      text: "Create STEM projects and research together.",
    },
    {
      title: "Grow Your Portfolio",
      text: "Showcase what you build and learn.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Create Profile",
      text: "Add your skills, interests, and goals.",
    },
    {
      number: "02",
      title: "Find Teammates",
      text: "Discover students with similar interests.",
    },
    {
      number: "03",
      title: "Build Projects",
      text: "Work together on something real.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#F5F4F0] text-[#202733]">

      <nav className="max-w-6xl mx-auto px-6 py-7 flex items-center justify-between">

        <Link
          href="/"
          className={`${logoFont.className} text-xl hover:text-[#5F7F91] transition`}
        >
          STEM Forge
        </Link>

        <div className="flex items-center gap-6">

          <Link
            href="/login"
            className="text-[#6F7782] hover:text-[#202733] transition"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="px-4 py-2 rounded-lg bg-[#202733] text-white hover:bg-[#303948] transition"
          >
            Sign Up
          </Link>

        </div>

      </nav>

      <section className="max-w-6xl mx-auto px-6 pt-20 md:pt-28 pb-24">

        <div className="max-w-3xl">

          <p className="text-sm font-medium text-[#5F7F91] mb-4">
            Student STEM platform
          </p>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight">
            Find your team.
            <br />
            Build something real.
          </h1>

          <p className="mt-6 text-lg text-[#6F7782] max-w-2xl leading-relaxed">
            STEM Forge helps students learn useful skills, find teammates,
            and build projects together.
          </p>

          <div className="flex flex-wrap gap-3 mt-8">

            <Link
              href="/register"
              className="px-6 py-3 rounded-lg bg-[#202733] text-white font-medium hover:bg-[#303948] transition"
            >
              Get Started
            </Link>

            <Link
              href="/projects"
              className="px-6 py-3 rounded-lg border border-[#D9DDDA] bg-white font-medium text-[#202733] hover:bg-[#F8F8F6] transition"
            >
              Explore Projects
            </Link>

          </div>

        </div>

      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">

        <div className="mb-8">

          <p className="text-sm font-medium text-[#5F7F91] mb-2">
            Why STEM Forge
          </p>

          <h2 className="text-3xl font-bold">
            Learn, build, collaborate.
          </h2>

        </div>

        <div className="grid gap-5 md:grid-cols-3">

          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white border border-[#DFE1DE] rounded-xl p-6"
            >
              <h3 className="text-xl font-semibold">
                {feature.title}
              </h3>

              <p className="text-[#6F7782] mt-3 leading-relaxed">
                {feature.text}
              </p>
            </div>
          ))}

        </div>

      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">

        <div className="mb-8">

          <p className="text-sm font-medium text-[#5F7F91] mb-2">
            How it works
          </p>

          <h2 className="text-3xl font-bold">
            Start in three steps.
          </h2>

        </div>

        <div className="grid gap-5 md:grid-cols-3">

          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-white border border-[#DFE1DE] rounded-xl p-6"
            >
              <p className="text-sm font-medium text-[#5F7F91]">
                {step.number}
              </p>

              <h3 className="text-xl font-semibold mt-4">
                {step.title}
              </h3>

              <p className="text-[#6F7782] mt-3 leading-relaxed">
                {step.text}
              </p>
            </div>
          ))}

        </div>

      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">

        <div className="bg-[#202733] rounded-2xl px-8 py-10 text-white text-center">

          <h2 className="text-3xl font-bold">
            Ready to build something?
          </h2>

          <p className="text-white/65 mt-3">
            Create your profile and start exploring STEM Forge.
          </p>

          <Link
            href="/register"
            className="inline-block mt-6 px-6 py-3 rounded-lg bg-white text-[#202733] font-medium hover:bg-[#F1F2EF] transition"
          >
            Join STEM Forge
          </Link>

        </div>

      </section>

      <footer className="max-w-6xl mx-auto px-6 py-8 border-t border-[#DFE1DE]">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

          <p className={`${logoFont.className} text-lg`}>
            STEM Forge
          </p>

          <p className="text-sm text-[#8C939D]">
            Building the future of student collaboration.
          </p>

        </div>

      </footer>

    </main>
  );
}
import Link from "next/link";
import { IBM_Plex_Sans } from "next/font/google";

export const logoFont = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F5F0E8] text-[#2C211B]">

      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-6 py-7 flex justify-between items-center">

        <Link
          href="/"
          className={`${logoFont.className} text-2xl tracking-tight hover:text-[#8A5A3B] transition`}
        >
          STEM Forge
        </Link>

        <div className="flex items-center gap-3">

          <Link
            href="/login"
            className="px-5 py-2.5 rounded-full text-[#796B60] hover:text-[#8A5A3B] transition"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="px-5 py-2.5 rounded-full bg-[#8A5A3B] text-white hover:bg-[#68422D] transition shadow-sm"
          >
            Sign Up
          </Link>

        </div>

      </nav>

      {}
      <section className="max-w-7xl mx-auto px-6 pt-24 md:pt-32">

        <div className="max-w-3xl">

          <p className="text-sm uppercase tracking-[0.2em] text-[#8A5A3B] font-medium mb-5">
            Student collaboration platform
          </p>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.08]">

            Find Your Team.
            <br />

            <span className="text-[#6b4831]">
              Build The Future.
            </span>

          </h1>

          <p className="mt-7 text-lg md:text-xl text-[#796B60] max-w-2xl leading-relaxed">
            STEM Forge connects ambitious students worldwide to create
            projects, research, and startups together.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">

            <Link
              href="/register"
              className="px-7 py-3.5 rounded-full bg-[#815b42] text-white font-medium hover:bg-[#68422D] hover:-translate-y-0.5 transition-all shadow-md shadow-[#8A5A3B]/15"
            >
              Get Started
            </Link>

            <Link
              href="/projects"
              className="px-7 py-3.5 rounded-full bg-[#FFFDF8] border border-[#E5D9CA] text-[#68422D] font-medium hover:border-[#CDBBA7] hover:-translate-y-0.5 transition-all"
            >
              Explore Projects
            </Link>

          </div>

        </div>

      </section>

      {}
      <section className="max-w-7xl mx-auto px-6 mt-32">

        <div className="max-w-2xl mb-10">

          <p className="text-sm uppercase tracking-[0.2em] text-[#8A5A3B] font-medium mb-3">
            Why STEM Forge
          </p>

          <h2 className="text-4xl font-bold tracking-tight">
            Build more than a profile.
          </h2>

        </div>

        <div className="grid gap-6 md:grid-cols-3">

          <div className="bg-[#FFFDF8] p-8 rounded-3xl border border-[#E5D9CA] shadow-sm hover:shadow-lg hover:shadow-[#8A5A3B]/10 hover:-translate-y-1 transition-all">

            <div className="w-11 h-11 rounded-2xl bg-[#EFE4D6] flex items-center justify-center mb-6">
              <span className="text-[#8A5A3B]">✦</span>
            </div>

            <h3 className="font-bold text-xl">
              Find Teammates
            </h3>

            <p className="text-[#796B60] mt-3 leading-relaxed">
              Connect with students who share your interests and ambitions.
            </p>

          </div>

          <div className="bg-[#FFFDF8] p-8 rounded-3xl border border-[#E5D9CA] shadow-sm hover:shadow-lg hover:shadow-[#8A5A3B]/10 hover:-translate-y-1 transition-all">

            <div className="w-11 h-11 rounded-2xl bg-[#EFE4D6] flex items-center justify-center mb-6">
              <span className="text-[#8A5A3B]">◇</span>
            </div>

            <h3 className="font-bold text-xl">
              Build Projects
            </h3>

            <p className="text-[#796B60] mt-3 leading-relaxed">
              Launch STEM projects and research initiatives with your team.
            </p>

          </div>

          <div className="bg-[#FFFDF8] p-8 rounded-3xl border border-[#E5D9CA] shadow-sm hover:shadow-lg hover:shadow-[#8A5A3B]/10 hover:-translate-y-1 transition-all">

            <div className="w-11 h-11 rounded-2xl bg-[#EFE4D6] flex items-center justify-center mb-6">
              <span className="text-[#8A5A3B]">↗</span>
            </div>

            <h3 className="font-bold text-xl">
              Grow Your Portfolio
            </h3>

            <p className="text-[#796B60] mt-3 leading-relaxed">
              Showcase projects, achievements, research, and everything you
              build.
            </p>

          </div>

        </div>

      </section>

      {}
      <section className="max-w-7xl mx-auto px-6 mt-32">

        <div className="max-w-2xl mb-10">

          <p className="text-sm uppercase tracking-[0.2em] text-[#8A5A3B] font-medium mb-3">
            The process
          </p>

          <h2 className="text-4xl font-bold tracking-tight">
            How STEM Forge works
          </h2>

        </div>

        <div className="grid gap-5 md:grid-cols-4">

          {[
            {
              number: "01",
              title: "Create Profile",
              text: "Share your skills, interests, and goals.",
            },
            {
              number: "02",
              title: "Find Teammates",
              text: "Connect with ambitious students worldwide.",
            },
            {
              number: "03",
              title: "Build Projects",
              text: "Create STEM projects and research together.",
            },
            {
              number: "04",
              title: "Showcase Work",
              text: "Build your portfolio and achievements.",
            },
          ].map((step) => (

            <div
              key={step.number}
              className="bg-[#FFFDF8] p-7 rounded-3xl border border-[#E5D9CA] shadow-sm"
            >

              <p className="text-sm font-medium text-[#8A5A3B]">
                {step.number}
              </p>

              <h3 className="font-bold text-xl mt-5">
                {step.title}
              </h3>

              <p className="text-[#796B60] mt-3 leading-relaxed">
                {step.text}
              </p>

            </div>

          ))}

        </div>

      </section>

      {/* Built for */}
      <section className="max-w-7xl mx-auto px-6 mt-32">

        <div className="bg-[#2C211B] text-[#FFFDF8] rounded-[2rem] p-10 md:p-14">

          <div className="max-w-3xl">

            <p className="text-sm uppercase tracking-[0.2em] text-[#D7B99E] font-medium mb-4">
              Built for ambitious students
            </p>

            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Your ideas deserve a place to grow.
            </h2>

            <p className="text-[#D2C4B8] text-lg mt-5 leading-relaxed">
              STEM Forge brings together students who want to collaborate,
              research, and build the future together.
            </p>

          </div>

          <div className="grid gap-4 md:grid-cols-2 mt-12">

            <div className="bg-[#3A2C24] rounded-2xl p-6 border border-[#4B3A30]">
              <h3 className="text-xl font-bold">
                Students
              </h3>

              <p className="text-[#CBBDB1] mt-2">
                Find teammates and build ambitious STEM projects.
              </p>
            </div>

            <div className="bg-[#3A2C24] rounded-2xl p-6 border border-[#4B3A30]">
              <h3 className="text-xl font-bold">
                Researchers
              </h3>

              <p className="text-[#CBBDB1] mt-2">
                Collaborate on research ideas and discoveries.
              </p>
            </div>

            <div className="bg-[#3A2C24] rounded-2xl p-6 border border-[#4B3A30]">
              <h3 className="text-xl font-bold">
                Young Founders
              </h3>

              <p className="text-[#CBBDB1] mt-2">
                Turn innovative ideas into real projects.
              </p>
            </div>

            <div className="bg-[#3A2C24] rounded-2xl p-6 border border-[#4B3A30]">
              <h3 className="text-xl font-bold">
                Olympiad Students
              </h3>

              <p className="text-[#CBBDB1] mt-2">
                Meet students with similar goals.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 mt-32">

        <div className="text-center max-w-2xl mx-auto">

          <p className="text-sm uppercase tracking-[0.2em] text-[#8A5A3B] font-medium">
            Start building
          </p>

          <h2 className="text-4xl font-bold mt-4">
            Ready to build something?
          </h2>

          <p className="text-[#796B60] mt-4">
            Create your profile and start finding your team.
          </p>

          <Link
            href="/register"
            className="inline-block mt-7 px-7 py-3.5 rounded-full bg-[#8A5A3B] text-white font-medium hover:bg-[#68422D] hover:-translate-y-0.5 transition-all shadow-md"
          >
            Join STEM Forge
          </Link>

        </div>

      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 mt-32 py-10 border-t border-[#E0D4C7]">

        <div className="flex flex-col md:flex-row justify-between gap-4">

          <div>

            <h2 className="font-bold text-xl">
              STEM Forge
            </h2>

            <p className="text-[#796B60] mt-2">
              Building the future of student collaboration.
            </p>

          </div>

          <p className="text-sm text-[#A69A8F]">
            © 2026 STEM Forge
          </p>

        </div>

      </footer>

    </main>
  );
}
import Link from 'next/link';


export default function Home() {
  return (
    <main className="min-h-screen bg-[#0D1117] text-white">

      <div className="p-6 flex justify-between items-center">
        <h1 className="font-bold text-xl">
          STEM Forge
        </h1>

      <Link href="/register">
        <button className="bg-[#8B5CF6] px-5 py-2 rounded-lg hover:bg-purple-700 transition">
        Sign Up
        </button>
      </Link>
      </div>


      <section className="px-6 pt-24 max-w-5xl">

        <h2 className="text-6xl font-bold leading-tight">
          Find Your Team.
          <br />

          <span className="bg-gradient-to-r from-violet-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            Build The Future.
          </span>

        </h2>


        <p className="mt-6 text-gray-400 text-lg max-w-xl">
          STEM Forge connects ambitious students worldwide
          to create projects, research and startups together.
        </p>


        <div className="mt-8 flex gap-4">

          <button className="bg-[#794ae9] px-7 py-3 rounded-xl hover:scale-105 transition">
            Get Started
          </button>


          <button className="border border-gray-700 px-7 py-3 rounded-xl hover:bg-gray-800 transition">
            Explore Projects
          </button>

        </div>

      </section>


      <section className="px-6 mt-32">

        <h3 className="text-4xl font-bold mb-10">
          Why STEM Forge?
        </h3>


        <div className="grid gap-6 md:grid-cols-3">


          <div className="bg-[#161B22] p-8 rounded-2xl border border-gray-800 hover:-translate-y-1 transition">

            <h4 className="font-bold text-xl">
              Find Teammates
            </h4>

            <p className="text-gray-400 mt-3">
              Connect with students who share your interests.
            </p>

          </div>


          <div className="bg-[#161B22] p-8 rounded-2xl border border-gray-800 hover:-translate-y-1 transition">

            <h4 className="font-bold text-xl">
              Build Projects
            </h4>

            <p className="text-gray-400 mt-3">
              Launch STEM projects and research initiatives.
            </p>

          </div>


          <div className="bg-[#161B22] p-8 rounded-2xl border border-gray-800 hover:-translate-y-1 transition">

            <h4 className="font-bold text-xl">
              Grow Portfolio
            </h4>

            <p className="text-gray-400 mt-3">
              Showcase achievements and research.
            </p>

          </div>


        </div>

      </section>


      <section className="px-6 mt-32">


        <h3 className="text-4xl font-bold mb-10">
          How STEM Forge Works
        </h3>


        <div className="grid gap-6 md:grid-cols-4">


          <div className="bg-[#161B22] p-6 rounded-2xl border border-gray-800 hover:-translate-y-1 transition">

            <h4 className="font-bold text-xl">
              01. Create Profile
            </h4>

            <p className="text-gray-400 mt-3">
              Share your skills, interests and goals.
            </p>

          </div>



          <div className="bg-[#161B22] p-6 rounded-2xl border border-gray-800 hover:-translate-y-1 transition">

            <h4 className="font-bold text-xl">
              02. Find Teammates
            </h4>

            <p className="text-gray-400 mt-3">
              Connect with ambitious students worldwide.
            </p>

          </div>



          <div className="bg-[#161B22] p-6 rounded-2xl border border-gray-800 hover:-translate-y-1 transition">

            <h4 className="font-bold text-xl">
              03. Build Projects
            </h4>

            <p className="text-gray-400 mt-3">
              Create STEM projects and research together.
            </p>

          </div>



          <div className="bg-[#161B22] p-6 rounded-2xl border border-gray-800 hover:-translate-y-1 transition">

            <h4 className="font-bold text-xl">
              04. Showcase Work
            </h4>

            <p className="text-gray-400 mt-3">
              Build your portfolio and achievements.
            </p>

          </div>


        </div>

      </section>



      <section className="px-6 mt-32">


        <div className="max-w-3xl">

          <h3 className="text-4xl font-bold">
            Built for ambitious STEM students
          </h3>


          <p className="text-gray-400 text-lg mt-5">
            STEM Forge brings together students who want to
            collaborate, research and build the future together.
          </p>

        </div>


        <div className="grid gap-6 md:grid-cols-2 mt-12">


          <div className="bg-[#161B22] p-8 rounded-2xl border border-gray-800">
            <h4 className="text-2xl font-bold">
              🎓 Students
            </h4>

            <p className="text-gray-400 mt-3">
              Find teammates and build ambitious STEM projects.
            </p>
          </div>



          <div className="bg-[#161B22] p-8 rounded-2xl border border-gray-800">
            <h4 className="text-2xl font-bold">
              🔬 Researchers
            </h4>

            <p className="text-gray-400 mt-3">
              Collaborate on research ideas and discoveries.
            </p>
          </div>



          <div className="bg-[#161B22] p-8 rounded-2xl border border-gray-800">
            <h4 className="text-2xl font-bold">
              🚀 Young Founders
            </h4>

            <p className="text-gray-400 mt-3">
              Turn innovative ideas into real projects.
            </p>
          </div>



          <div className="bg-[#161B22] p-8 rounded-2xl border border-gray-800">
            <h4 className="text-2xl font-bold">
              🏆 Olympiad Students
            </h4>

            <p className="text-gray-400 mt-3">
              Meet students with similar goals.
            </p>
          </div>


        </div>


      </section>



      <footer className="px-6 mt-32 py-10 border-t border-gray-800">

        <h2 className="font-bold text-xl">
          STEM Forge
        </h2>


        <p className="text-gray-400 mt-3">
          Building the future of student collaboration.
        </p>

      </footer>


    </main>
  );
}
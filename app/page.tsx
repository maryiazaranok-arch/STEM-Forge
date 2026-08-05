export default function Home() {
  return (
    <main className="min-h-screen bg-[#0D1117] text-white">

      <nav className="p-6 flex justify-between items-center">
        <h1 className="font-bold text-xl">
          STEM Forge
        </h1>

        <button className="bg-[#8B5CF6] px-5 py-2 rounded-lg hover:bg-purple-700 transition">
          Sign Up
        </button>
      </nav>


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


          <div className="bg-[#161B22] p-8 rounded-2xl border border-gray-800">
            <h4 className="font-bold text-xl">
              Find Teammates
            </h4>

            <p className="text-gray-400 mt-3">
              Connect with students who share your interests.
            </p>
          </div>


          <div className="bg-[#161B22] p-8 rounded-2xl border border-gray-800">
            <h4 className="font-bold text-xl">
              Build Projects
            </h4>

            <p className="text-gray-400 mt-3">
              Launch STEM projects and research initiatives.
            </p>
          </div>


          <div className="bg-[#161B22] p-8 rounded-2xl border border-gray-800">
            <h4 className="font-bold text-xl">
              Grow Portfolio
            </h4>

            <p className="text-gray-400 mt-3">
              Showcase achievements and research.
            </p>
          </div>


        </div>

      </section>

    </main>
  );
}
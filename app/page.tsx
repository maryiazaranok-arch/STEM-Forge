export default function Home() {
  return (
    <main className="min-h-screen bg-[#0D1117] text-white">

      <nav className="p-6 flex justify-between">
        <h1 className="font-bold text-xl">
          STEM Forge
        </h1>

        <button className="bg-[#8B5CF6] px-4 py-2 rounded">
          Sign Up
        </button>
      </nav>

      <section className="px-6 pt-24">

        <h2 className="text-5xl font-bold max-w-2xl">
          Find Your Team.
          <br />
          Build The Future.
        </h2>

        <p className="mt-6 text-gray-400 max-w-xl">
          Join ambitious students from around the world
          to launch STEM projects, research and startups.
        </p>

        <button className="mt-8 bg-[#8B5CF6] px-6 py-3 rounded">
          Get Started
        </button>

      </section>
      <section className="px-6 mt-32">

  <h3 className="text-3xl font-bold mb-8">
    Why STEM Forge?
  </h3>

  <div className="grid gap-6 md:grid-cols-3">

    <div className="bg-[#161B22] p-6 rounded-xl">
      <h4 className="font-bold text-lg">
        Find Teammates
      </h4>

      <p className="text-gray-400 mt-2">
        Connect with students who share your interests.
      </p>
    </div>

    <div className="bg-[#161B22] p-6 rounded-xl">
      <h4 className="font-bold text-lg">
        Build Projects
      </h4>

      <p className="text-gray-400 mt-2">
        Launch STEM projects and research initiatives.
      </p>
    </div>

    <div className="bg-[#161B22] p-6 rounded-xl">
      <h4 className="font-bold text-lg">
        Grow Your Portfolio
      </h4>

      <p className="text-gray-400 mt-2">
        Showcase your work and achievements.
      </p>
    </div>

  </div>

</section>

    </main>
  );
}
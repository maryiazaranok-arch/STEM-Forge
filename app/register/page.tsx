export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-[#0D1117] text-white flex items-center justify-center">

      <div className="w-full max-w-md bg-[#161B22] p-8 rounded-2xl border border-gray-800">

        <h1 className="text-3xl font-bold mb-6">
          Create Account
        </h1>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 rounded-lg bg-[#0D1117] border border-gray-700"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-[#0D1117] border border-gray-700"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-[#0D1117] border border-gray-700"
          />

          <button className="w-full bg-[#8B5CF6] p-3 rounded-lg">
            Create Account
          </button>

        </div>

      </div>

    </main>
  );
}
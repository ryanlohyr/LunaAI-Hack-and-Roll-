import Dashboard from "@/features/dashboard/components/Dashboard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col mx-auto max-w-7xl">
      <div className="flex flex-col justify-start px-16 py-8 space-y-4">
        <h1 className="font-bold text-4xl">Dashboard</h1>
        <p className="text-gray-400">Quick insights to important information about Luna</p>
        <Dashboard/>
      </div>
    </main>
  );
}

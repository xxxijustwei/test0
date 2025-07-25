import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <main className="text-center">
        <h1 className="text-6xl font-bold mb-4">Welcome</h1>
        <p className="text-xl text-muted-foreground">
          This is a simple landing page with dark mode support
        </p>
      </main>
    </div>
  );
}

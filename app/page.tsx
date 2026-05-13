import { ValueCalculator } from "@/components/calculator/value-calculator";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Braze Value Calculator
            </h1>
            <p className="text-sm text-muted-foreground">
              Calculate the incremental value of Braze Decisioning Studio for your business
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Instructions Banner */}
        <div className="mb-8 rounded-lg border-2 border-accent bg-accent/10 p-4">
          <p className="text-sm text-accent-foreground">
            <span className="font-semibold">Instructions:</span> Fill in the key inputs below to calculate the projected value. 
            Use Notes or Comments to explain assumptions. Reach out to your ASC with questions.
          </p>
        </div>

        <ValueCalculator />
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-12">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-muted-foreground">
            Braze Value Calculator - Hackathon Edition
          </p>
        </div>
      </footer>
    </div>
  );
}

import { FeatureCard } from "@/components/FeatureCard";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header variant="default" />

      {/* Hero Section - First Fold */}
      <section className="flex min-h-screen flex-col items-center justify-center px-6 pt-32">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-5xl leading-tight tracking-[-0.06em] text-black md:text-6xl lg:text-7xl">
            Context that follows you across your AI tools.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg tracking-[-0.04em] text-gray-600">
            Memory store syncs your context across every AI tool and team member—automatically.
          </p>
          <div className="mt-10">
            <button className="rounded-lg bg-black px-6 py-3 font-medium text-white transition-colors hover:bg-gray-800">
              Start Building Your Memory
            </button>
          </div>
        </div>

        {/* Hero Visual - UI Mockup with Background */}
        <div className="mx-auto mt-16 w-full max-w-5xl">
          <div className="relative flex items-center justify-center p-8">
            {/* Background placeholder for painting/image */}
            <div className="absolute inset-0 rounded-3xl bg-gray-300" />

            {/* Screen mockup */}
            <div className="relative z-10 w-full max-w-4xl">
              <div className="overflow-hidden rounded-xl bg-white shadow-2xl">
                {/* Title bar */}
                <div className="flex items-center gap-2 border-b border-gray-200 bg-gray-100 px-4 py-3">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-gray-300" />
                    <div className="h-3 w-3 rounded-full bg-gray-300" />
                    <div className="h-3 w-3 rounded-full bg-gray-300" />
                  </div>
                  <span className="ml-4 text-sm text-gray-500">
                    memory.store
                  </span>
                </div>
                {/* Screen content placeholder */}
                <div className="aspect-[16/10] bg-gray-50 p-8">
                  <div className="flex h-full w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-200">
                    <span className="text-sm text-gray-400">
                      Hero UI screenshot here
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Slider Section */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center">
            <h2 className="font-serif text-4xl tracking-[-0.06em] text-black md:text-5xl">
              Work with your tools
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg tracking-[-0.04em] text-gray-600">
              Seamlessly integrates with the tools you already use
            </p>
          </div>

          {/* Infinite Logo Slider */}
          <div className="relative mt-12 overflow-hidden">
            {/* Left fade gradient */}
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-[#ece9e2] to-transparent" />

            {/* Right fade gradient */}
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-[#ece9e2] to-transparent" />

            <div className="flex animate-scroll gap-8">
              {/* First set of logos */}
              <div className="flex min-w-max gap-8">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div
                    key={`logo-${i}`}
                    className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm"
                  >
                    <div className="h-8 w-8 rounded-lg bg-gray-300" />
                  </div>
                ))}
              </div>
              {/* Duplicate set for seamless loop */}
              <div className="flex min-w-max gap-8">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div
                    key={`logo-duplicate-${i}`}
                    className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm"
                  >
                    <div className="h-8 w-8 rounded-lg bg-gray-300" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Second Fold - Feature Cards */}
      <section id="features" className="py-24">
        <div className="mx-auto max-w-7xl space-y-12 px-6">
          <FeatureCard
            title="Connect your tools"
            description="Memory.store connects your AI tools via MCP, Claude, ChatGPT, Cursor—they share the same context instead of working in isolation. Need a different integration? Talk to us and we'll build it."
            linkText="Learn about Memory"
            linkHref="#"
            backgroundImage="/feature-bg.png"
          />

          <FeatureCard
            title="Record what matters as you work"
            description="Insights don't stay where you found them. Record in Claude, access in Cursor and ChatGPT. As we integrate deeper—Slack, Notion, your full toolkit—everything connects. information appear as your conversation unfolds."
            linkText="Explore Recall"
            linkHref="#"
            backgroundImage="/feature-bg-2.png"
            reverse={true}
          />

          <FeatureCard
            title="Recall anywhere"
            description="Context you've already explained. Insights you've already captured. Memory surfaces when you need it—ask directly or let relevant information appear as your conversation unfolds."
            linkText="See Connections"
            linkHref="#"
            backgroundImage="/feature-bg-3.png"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-gray-300 py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-serif text-3xl tracking-[-0.06em] text-black md:text-4xl">
            Ready to build your second brain?
          </h2>
          <p className="mx-auto mt-4 max-w-xl tracking-[-0.04em] text-gray-700">
            Join thousands who have already transformed how they think and
            remember.
          </p>
          <button className="mt-8 rounded-lg bg-black px-8 py-4 font-medium text-white transition-colors hover:bg-gray-800">
            Get Started — It&apos;s Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-300 py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <span className="font-serif text-lg text-black">memory.store</span>
            <div className="flex gap-6 text-sm text-gray-700">
              <a href="#" className="hover:text-black">
                Privacy
              </a>
              <a href="#" className="hover:text-black">
                Terms
              </a>
              <a href="#" className="hover:text-black">
                Contact
              </a>
            </div>
            <span className="text-sm text-gray-600">
              © 2025 memory.store. All rights reserved.
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}


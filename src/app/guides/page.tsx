import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = {
  title: "Setup Guides - Connect Your Tools",
  description:
    "Step-by-step setup guides to connect Memory Store with Raycast, Cursor, Claude Code, ChatGPT, and more.",
  openGraph: {
    title: "Setup Guides - memory.store",
    description:
      "Step-by-step setup guides to connect Memory Store with your favorite tools.",
    type: "website",
  },
};

export default function GuidesPage() {
  return (
    <main className="min-h-screen bg-[#e8e5de]">
      <Header variant="blog" />

      {/* Main Content Card */}
      <div className="px-4 pb-8 pt-4 md:px-8">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-[#f3f1eb]">
          {/* Guides Header */}
          <header className="px-8 pb-12 pt-24 text-center md:px-16 md:pt-32">
            <p className="text-xs tracking-widest text-gray-400">SETUP & CONFIGURATION</p>
            <h1 className="mt-4 font-serif text-5xl tracking-[-0.06em] text-black md:text-6xl lg:text-7xl">
              Guides
            </h1>
            <p className="mx-auto mt-6 max-w-lg text-lg text-gray-600">
              Step-by-step setup guides to connect Memory Store with your favorite tools.
            </p>
          </header>

          {/* Empty State */}
          <section className="border-t border-gray-100 px-8 py-16 text-center md:px-16">
            <div className="mx-auto max-w-md">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                <svg
                  className="h-8 w-8 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h2 className="font-serif text-2xl tracking-[-0.04em] text-black">
                Guides coming soon
              </h2>
              <p className="mt-3 text-gray-600">
                We&apos;re working on comprehensive setup guides for all your favorite tools. 
                Join the waitlist to be notified when they&apos;re ready.
              </p>
            </div>
          </section>

          {/* CTA Section */}
          <section className="border-t border-gray-100 px-8 py-16 text-center md:px-16">
            <h3 className="font-serif text-3xl tracking-[-0.06em] text-black">
              Need help with setup?
            </h3>
            <p className="mt-3 text-gray-600">
              Join our Discord community for support and to connect with other users.
            </p>
            <form
              id="cta-waitlist"
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row sm:items-stretch"
            >
              <Input
                type="email"
                placeholder="you@beautifulperson.com"
                className="flex-1 border-2 border-gray-300 bg-white focus:border-[#0e0e0e] focus:ring-[#0e0e0e]/20"
                required
              />
              <Button type="submit" rounded="lg" className="h-12 whitespace-nowrap px-6">
                Join Waitlist
              </Button>
            </form>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}

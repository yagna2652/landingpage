import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#e8e5de]">
      <Header variant="blog" />

      {/* Main Content Card */}
      <div className="px-4 pb-8 pt-4 md:px-8">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-[#f3f1eb]">
          
          {/* Privacy Header */}
          <header className="px-8 pb-12 pt-24 text-center md:px-16 md:pt-32">
            <p className="text-xs tracking-widest text-gray-400">
              LEGAL
            </p>
            <h1 className="mt-4 font-serif text-5xl tracking-[-0.06em] text-black md:text-6xl lg:text-7xl">
              Privacy
            </h1>
            <p className="mx-auto mt-6 max-w-lg text-lg text-gray-600">
              How we handle and protect your data.
            </p>
          </header>

          {/* Featured Image */}
          <div className="px-8 md:px-16">
            <div className="aspect-[4/5] max-w-md mx-auto overflow-hidden rounded-2xl">
              <Image
                src="/privacy.jpeg"
                alt="Privacy illustration"
                width={600}
                height={750}
                className="h-full w-full object-cover"
              />
            </div>
            <p className="mt-3 text-center text-xs text-gray-400">
              Illustration by{" "}
              <a 
                href="https://instagram.com/theshortladder" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:text-gray-600"
              >
                @theshortladder
              </a>
            </p>
          </div>

          {/* Privacy Content */}
          <section className="border-t border-gray-100 px-6 py-16 md:px-8 md:py-24">
            <div className="mx-auto max-w-[34em]">
              <p className="mb-8 font-serif text-[1.3rem] leading-[1.58] tracking-[-0.04em] text-[#111] antialiased">
                We take the privacy of your data extremely seriously.
              </p>

              <p className="mb-6 font-serif text-[1.3rem] leading-[1.58] tracking-[-0.04em] text-[#111] antialiased">
                Your data is never used to train AI models. We&apos;ll never sell your data to third parties. You can delete your account and all your data at any time.
              </p>

              <p className="font-serif text-[1.3rem] leading-[1.58] tracking-[-0.04em] text-[#111] antialiased">
                We&apos;re proud to share that Memory store was not vibe coded. Memory store is built by engineers who&apos;ve built enterprise-grade software that has stood the test of time. We use industry standard security and encryption practices to safeguard your data.
              </p>
            </div>
          </section>

          {/* Footer section */}
          <section className="border-t border-gray-100 px-8 py-12 text-center md:px-16">
            <p className="text-sm text-gray-500">
              Last updated: December 2024
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}


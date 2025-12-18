import Image from "next/image";
import { ScreenMockup } from "@/components/ui/ScreenMockup";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";

export function HeroSection() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 pt-16">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="font-serif text-5xl leading-tight tracking-[-0.06em] text-black md:text-6xl lg:text-7xl">
          Context that follows you across your AI tools.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg tracking-[-0.04em] text-gray-600">
          Memory store syncs your context across every AI tool and team member—automatically.
        </p>
        <form id="hero-waitlist" className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row sm:items-stretch">
          <Input
            type="email"
            placeholder="you@beautifulperson.com"
            className="flex-1 border-2 border-gray-300 bg-white focus:border-[#0e0e0e] focus:ring-[#0e0e0e]/20"
            required
          />
          <Button type="submit" rounded="lg" className="h-12 px-6 whitespace-nowrap">Join Waitlist</Button>
        </form>
      </div>

      {/* Hero Visual - UI Mockup with Background */}
      <div className="mx-auto mt-16 w-full max-w-5xl">
        <div className="relative flex items-center justify-center p-8">
          {/* Background image */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl">
            <Image
              src="/background-2.jpeg"
              alt=""
              fill
              className="object-cover"
            />
          </div>

          {/* Screen mockup */}
          <div className="relative z-10 w-full max-w-4xl">
            <ScreenMockup aspectRatio="16/10">
              <div className="flex h-full w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-200 p-2">
                <span className="text-sm text-gray-400">
                  Hero UI screenshot here
                </span>
              </div>
            </ScreenMockup>
          </div>
        </div>
      </div>
    </section>
  );
}







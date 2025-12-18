import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";

export function CTASection() {
  return (
    <section className="border-t border-gray-300 py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-serif text-3xl tracking-[-0.06em] text-black md:text-4xl">
          Ready to build your second brain?
        </h2>
        <p className="mx-auto mt-4 max-w-xl tracking-[-0.04em] text-gray-700">
          We&apos;d love your feedback. Join the waitlist and help shape the future of memory.
        </p>
        <form id="cta-waitlist" className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
          <Input
            type="email"
            placeholder="you@beautifulperson.com"
            className="flex-1 border-2 border-gray-300 bg-white focus:border-[#0e0e0e] focus:ring-[#0e0e0e]/20"
            required
          />
          <Button type="submit" rounded="lg" className="h-12 px-6 whitespace-nowrap">Join Waitlist</Button>
        </form>
      </div>
    </section>
  );
}







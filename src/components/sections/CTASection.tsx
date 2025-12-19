import { WaitlistForm } from "@/components/WaitlistForm";

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
        <WaitlistForm
          source="cta"
          id="cta-waitlist"
          className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row sm:items-center sm:justify-center"
        />
      </div>
    </section>
  );
}







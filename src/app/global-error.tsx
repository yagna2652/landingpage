"use client";

import { Button } from "@/components/ui/Button";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="bg-[#ece9e2]">
        <main className="flex min-h-screen flex-col items-center justify-center px-6">
          <div className="text-center">
            <h1 className="font-serif text-4xl tracking-tight text-black">
              Something went wrong
            </h1>
            <p className="mt-4 text-gray-600">
              We encountered an unexpected error.
            </p>
            <Button onClick={reset} className="mt-8">
              Try again
            </Button>
          </div>
        </main>
      </body>
    </html>
  );
}







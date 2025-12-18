"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#ece9e2] px-6">
      <div className="text-center">
        <h1 className="font-serif text-4xl tracking-[-0.06em] text-black">
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
  );
}







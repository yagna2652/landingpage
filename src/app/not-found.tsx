import Link from "next/link";
import { buttonStyles } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#ece9e2] px-6">
      <div className="text-center">
        <h1 className="font-serif text-6xl tracking-[-0.06em] text-black">
          404
        </h1>
        <p className="mt-4 text-xl text-gray-600">Page not found</p>
        <p className="mt-2 text-gray-500">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className={`mt-8 ${buttonStyles.primary} ${buttonStyles.sizes.md} ${buttonStyles.rounded.full}`}
        >
          Go home
        </Link>
      </div>
    </main>
  );
}







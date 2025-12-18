import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#0e0e0e] py-16">
      <div className="mx-auto max-w-6xl px-6">
        {/* Main footer content */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Left side - GIF and tagline */}
          <div className="md:col-span-6">
            <div className="flex items-start gap-6">
              {/* Small GIF */}
              <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl">
                <Image
                  src="/everything-everywhere.gif"
                  alt=""
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              {/* Tagline */}
              <div>
                <h2
                  className="font-serif text-2xl font-normal tracking-[-0.02em] text-[#ece9e2] md:text-3xl"
                >
                  Everything everywhere,<br />all at once.
                </h2>
              </div>
            </div>
            <p className="mt-6 max-w-sm text-sm tracking-[-0.02em] text-gray-400">
              Memory for your entire stack. Sync conversations, snippets, and decisions across your team&apos;s tools.
            </p>
          </div>

          {/* Right side - Navigation columns */}
          <div className="grid grid-cols-2 gap-8 md:col-span-6 md:justify-end">
            {/* Discover */}
            <div>
              <h3 className="font-medium text-white">Discover</h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link href="/blog" className="text-sm text-gray-400 transition-colors hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/guides" className="text-sm text-gray-400 transition-colors hover:text-white">
                    Guides
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-medium text-white">Resources</h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link href="/privacy" className="text-sm text-gray-400 transition-colors hover:text-white">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-gray-700 pt-8 md:flex-row">
          <div className="flex items-center gap-6">
            <Image src="/logo.svg" alt="memory.store" width={120} height={16} className="brightness-0 invert" />
          </div>
          <p className="text-sm text-gray-500">
            © 2025 memory.store
          </p>
        </div>
      </div>
    </footer>
  );
}

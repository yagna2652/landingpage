"use client";

import Link from "next/link";
import Image from "next/image";

interface HeaderProps {
  variant?: "default" | "blog";
  sticky?: boolean;
}

export function Header({ variant = "default", sticky = true }: HeaderProps) {
  const baseClasses = "top-0 z-50 w-full";
  const positionClass = sticky ? "sticky" : "fixed";
  
  // Different background styles based on variant
  const bgClasses = variant === "default" 
    ? "border-b border-gray-300 bg-[#ece9e2]/80 backdrop-blur-sm"
    : "bg-[#e8e5de]";

  return (
    <header className={`${baseClasses} ${positionClass} ${bgClasses}`}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/">
          <Image src="/logo.svg" alt="memory.store" width={144} height={20} />
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/blog"
            className="text-sm text-gray-700 transition-colors hover:text-black"
          >
            Blog
          </Link>
          <button className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800">
            Get Started
          </button>
        </nav>
      </div>
    </header>
  );
}


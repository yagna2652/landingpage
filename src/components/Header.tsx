"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

interface HeaderProps {
  variant?: "default" | "blog";
}

export function Header({ variant = "default" }: HeaderProps) {
  const [showFloating, setShowFloating] = useState(false);
  const staticHeaderRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (staticHeaderRef.current) {
        const rect = staticHeaderRef.current.getBoundingClientRect();
        // Only show floating header when static header is completely out of view
        setShowFloating(rect.bottom <= 0);
      }
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Floating header styles based on variant
  const floatingBgClass = variant === "blog" 
    ? "bg-[#e8e5de]" 
    : "border-b border-gray-300/50 bg-[#ece9e2]/80 backdrop-blur-md";

  const NavContent = () => (
    <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
      <Link href="/">
        <Image src="/logo.svg" alt="memory.store" width={144} height={20} />
      </Link>
      <nav className="flex items-center gap-6">
        <Link
          href="/blog"
          className="text-sm text-gray-700 transition-colors hover:text-black hover:underline"
        >
          Blog
        </Link>
        <button className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800">
          Get Started
        </button>
      </nav>
    </div>
  );

  return (
    <>
      {/* Static header - always in document flow */}
      <header ref={staticHeaderRef} className="w-full">
        <NavContent />
      </header>

      {/* Floating header - slides down when static header is out of view */}
      <header
        className={`fixed left-0 right-0 z-50 transition-transform duration-300 ${floatingBgClass} ${
          showFloating ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ top: 0 }}
      >
        <NavContent />
      </header>
    </>
  );
}

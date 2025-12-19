"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

interface HeaderProps {
  variant?: "default" | "blog";
}

export function Header({ variant = "default" }: HeaderProps) {
  const [showFloating, setShowFloating] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const staticHeaderRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (staticHeaderRef.current) {
        const rect = staticHeaderRef.current.getBoundingClientRect();
        setShowFloating(rect.bottom <= 0);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const scrollToNearestWaitlist = useCallback(() => {
    setMobileMenuOpen(false);
    const heroForm = document.getElementById("hero-waitlist");
    const ctaForm = document.getElementById("cta-waitlist");

    if (!heroForm && !ctaForm) return;

    const viewportMiddle = window.scrollY + window.innerHeight / 2;
    const heroDistance = heroForm
      ? Math.abs(heroForm.getBoundingClientRect().top + window.scrollY - viewportMiddle)
      : Infinity;
    const ctaDistance = ctaForm
      ? Math.abs(ctaForm.getBoundingClientRect().top + window.scrollY - viewportMiddle)
      : Infinity;

    const targetForm = heroDistance <= ctaDistance ? heroForm : ctaForm;
    targetForm?.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => {
      const input = targetForm?.querySelector('input[type="email"]') as HTMLInputElement;
      input?.focus();
    }, 500);
  }, []);

  const floatingBgClass = "border-b border-gray-300/50 bg-[#ece9e2]/80 backdrop-blur-md";

  const NavContent = () => (
    <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
      <Link href="/" onClick={() => setMobileMenuOpen(false)}>
        <Image src="/logo.svg" alt="memory.store" width={144} height={20} />
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden items-center gap-6 md:flex">
        <Link
          href="/blog"
          className="text-sm text-gray-700 transition-colors hover:text-black hover:underline"
        >
          Blog
        </Link>
        <Link
          href="/guides"
          className="text-sm text-gray-700 transition-colors hover:text-black hover:underline"
        >
          Guides
        </Link>
        <Button size="sm" onClick={scrollToNearestWaitlist}>Join Waitlist</Button>
      </nav>

      {/* Mobile Navigation Controls */}
      <div className="flex items-center gap-2 md:hidden">
        <Button
          size="sm"
          onClick={scrollToNearestWaitlist}
          className="h-9 px-4 text-xs"
        >
          Join Waitlist
        </Button>
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="flex h-9 w-9 items-center justify-center"
          aria-label="Open menu"
        >
          <div className="flex w-5 flex-col gap-1.5">
            <span className="block h-[2px] w-full bg-black" />
            <span className="block h-[2px] w-full bg-black" />
            <span className="block h-[2px] w-full bg-black" />
          </div>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Static header */}
      <header ref={staticHeaderRef} className="w-full">
        <NavContent />
      </header>

      {/* Floating header */}
      <header
        className={`fixed left-0 right-0 z-50 transition-transform duration-300 ${floatingBgClass} ${
          showFloating ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ top: 0 }}
      >
        <NavContent />
      </header>

      {/* Full-screen Mobile Menu */}
      <div
        className={`fixed inset-0 z-50 bg-[#ece9e2] transition-all duration-300 ease-in-out md:hidden ${
          mobileMenuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      >
        {/* Mobile Menu Header */}
        <div className="flex h-16 items-center justify-between px-6">
          <Link href="/" onClick={() => setMobileMenuOpen(false)}>
            <Image src="/logo.svg" alt="memory.store" width={144} height={20} />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="flex h-10 w-10 items-center justify-center"
            aria-label="Close menu"
          >
            <svg
              className="h-6 w-6 text-black"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Links - Large Typography */}
        <nav className="flex flex-col px-6 pt-12">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="py-3 text-4xl font-medium tracking-tight text-black transition-opacity hover:opacity-60"
          >
            Home
          </Link>
          <Link
            href="/blog"
            onClick={() => setMobileMenuOpen(false)}
            className="py-3 text-4xl font-medium tracking-tight text-black transition-opacity hover:opacity-60"
          >
            Blog
          </Link>
          <Link
            href="/guides"
            onClick={() => setMobileMenuOpen(false)}
            className="py-3 text-4xl font-medium tracking-tight text-black transition-opacity hover:opacity-60"
          >
            Guides
          </Link>
          <button
            onClick={scrollToNearestWaitlist}
            className="py-3 text-left text-4xl font-medium tracking-tight text-black underline transition-opacity hover:opacity-60"
          >
            Join Waitlist
          </button>
        </nav>
      </div>
    </>
  );
}

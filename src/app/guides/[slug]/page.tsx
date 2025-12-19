import { notFound } from "next/navigation";
import type { Metadata } from "next";

// No guides available yet - all routes return 404
export function generateStaticParams() {
  return [];
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Guide Not Found",
  };
}

export default async function GuidePage() {
  // No guides available - return 404
  notFound();
}

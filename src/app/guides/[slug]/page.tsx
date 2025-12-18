import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import { client, guideQuery, relatedGuidesQuery, urlFor } from "@/lib/sanity";
import type { Guide } from "@/lib/sanity";
import { formatDateUppercase, formatDateShort, formatPlatform } from "@/lib/utils";
import { portableTextComponents } from "@/lib/portable-text";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";

async function getGuide(slug: string): Promise<Guide | null> {
  if (!client) return null;
  try {
    const guide = await client.fetch(guideQuery, { slug });
    return guide || null;
  } catch {
    return null;
  }
}

// Generate static params from Sanity only
export async function generateStaticParams() {
  if (!client) return [];
  try {
    const guides = await client.fetch<{ slug: { current: string } }[]>(
      `*[_type == "guide"]{ slug }`
    );
    return guides.map((guide) => ({ slug: guide.slug.current }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = await getGuide(slug);

  if (!guide) {
    return {
      title: "Guide Not Found",
    };
  }

  const ogImage = guide.mainImage
    ? urlFor(guide.mainImage).width(1200).height(630).url()
    : "/og-image.png";

  return {
    title: `${guide.title} - Setup Guide`,
    description: guide.excerpt,
    openGraph: {
      title: guide.title,
      description: guide.excerpt,
      type: "article",
      publishedTime: guide.publishedAt,
      authors: ["memory.store"],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: guide.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.excerpt,
      images: [ogImage],
    },
  };
}

// Get related guides from Sanity only (no demo fallback)
async function getRelatedGuides(currentSlug: string): Promise<Guide[]> {
  if (!client) return [];
  try {
    const guides = await client.fetch(relatedGuidesQuery, { currentSlug });
    return guides || [];
  } catch {
    return [];
  }
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = await getGuide(slug);

  if (!guide) {
    notFound();
  }

  const relatedGuides = await getRelatedGuides(slug);

  return (
    <main className="min-h-screen bg-[#e8e5de]">
      <Header variant="blog" />

      {/* Article Card */}
      <div className="px-4 pb-8 pt-4 md:px-8">
        <article className="mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-[#f3f1eb]">
          {/* Article Header */}
          <header className="px-8 pb-16 pt-24 text-center md:px-16 md:pt-32">
            {/* Date and Read Time */}
            <p className="text-xs tracking-widest text-gray-400">
              {formatDateUppercase(guide.publishedAt)}
              {guide.readTime && ` · ${guide.readTime.toUpperCase()}`}
            </p>

            {/* Platform */}
            {guide.platform && (
              <p className="mt-4 text-sm font-medium tracking-wider text-black">
                {formatPlatform(guide.platform).toUpperCase()}
              </p>
            )}

            {/* Title */}
            <h1 className="mx-auto mt-8 max-w-3xl font-serif text-5xl leading-[1.1] tracking-[-0.06em] text-black md:text-6xl lg:text-7xl">
              {guide.title}
            </h1>
          </header>

          {/* Featured Image */}
          {guide.mainImage && (
            <div className="px-8 md:px-16">
              <div className="relative aspect-[2/1] overflow-hidden rounded-2xl bg-gray-100">
                <Image
                  src={urlFor(guide.mainImage).width(1200).url()}
                  alt={guide.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 1200px"
                  priority
                />
              </div>
            </div>
          )}

          {/* Content */}
          <div className="px-6 py-16 md:px-8 md:py-24">
            <div className="mx-auto max-w-[34em]">
              {guide.body && Array.isArray(guide.body) ? (
                <PortableText value={guide.body} components={portableTextComponents} />
              ) : (
                <p className="font-serif text-[1.3rem] leading-[1.58] tracking-[-0.04em] text-[#111] antialiased">
                  {guide.excerpt}
                </p>
              )}
            </div>
          </div>

          {/* CTA Section */}
          <div className="border-t border-gray-100 px-8 py-16 text-center md:px-16">
            <h3 className="font-serif text-3xl tracking-[-0.06em] text-black">
              Ready to build your memory?
            </h3>
            <p className="mt-3 text-gray-600">
              Start capturing and connecting your ideas today.
            </p>
            <form
              id="cta-waitlist"
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row sm:items-stretch"
            >
              <Input
                type="email"
                placeholder="you@beautifulperson.com"
                className="flex-1 border-2 border-gray-300 bg-white focus:border-[#0e0e0e] focus:ring-[#0e0e0e]/20"
                required
              />
              <Button type="submit" rounded="lg" className="h-12 whitespace-nowrap px-6">
                Join Waitlist
              </Button>
            </form>
          </div>
        </article>
      </div>

      {/* Related Guides - Only shows if there are real guides from Sanity */}
      {relatedGuides.length > 0 && (
        <section className="px-4 pb-16 md:px-8">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-8 font-serif text-3xl tracking-[-0.06em] text-black">
              Related guides
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedGuides.map((relatedGuide) => (
                <Link
                  key={relatedGuide._id}
                  href={`/guides/${relatedGuide.slug.current}`}
                  className="group"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100">
                    {relatedGuide.mainImage ? (
                      <Image
                        src={urlFor(relatedGuide.mainImage).width(400).height(300).url()}
                        alt={relatedGuide.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                        <span className="text-xs text-gray-400">Image</span>
                      </div>
                    )}
                  </div>
                  {/* Meta */}
                  <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                    {relatedGuide.platform && (
                      <>
                        <span>{formatPlatform(relatedGuide.platform)}</span>
                        <span>•</span>
                      </>
                    )}
                    <span>{formatDateShort(relatedGuide.publishedAt)}</span>
                  </div>
                  {/* Title */}
                  <h3 className="mt-2 font-serif text-lg leading-tight tracking-[-0.04em] text-black group-hover:underline">
                    {relatedGuide.title}
                  </h3>
                  {/* Excerpt */}
                  {relatedGuide.excerpt && (
                    <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                      {relatedGuide.excerpt}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to Guides Link */}
      <div className="pb-12 text-center">
        <Link
          href="/guides"
          className="inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-black"
        >
          <span>←</span> Back to all guides
        </Link>
      </div>

      <Footer />
    </main>
  );
}

import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Guide } from "@/types";
import { formatDateUppercase, formatDateShort, calculateReadTime } from "@/lib/utils";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { sanityFetch } from "@/lib/sanity";
import { GUIDE_BY_SLUG_QUERY, RELATED_GUIDES_QUERY, GUIDE_SLUGS_QUERY } from "@/lib/queries";

export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string }[]>(GUIDE_SLUGS_QUERY) || [];
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = await sanityFetch<Guide>(GUIDE_BY_SLUG_QUERY, { slug });

  if (!guide) {
    return {
      title: "Guide Not Found",
    };
  }

  return {
    title: guide.title,
    description: guide.excerpt,
    openGraph: {
      title: guide.title,
      description: guide.excerpt,
      type: "article",
      publishedTime: guide.publishedAt,
      authors: ["memory.store"],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.excerpt,
    },
  };
}

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = await sanityFetch<Guide>(GUIDE_BY_SLUG_QUERY, { slug });

  if (!guide) {
    notFound();
  }

  // Fetch related guides
  const relatedGuides = await sanityFetch<Guide[]>(RELATED_GUIDES_QUERY, { slug }) || [];

  // Calculate read times
  const guideWithReadTime = {
    ...guide,
    readTime: calculateReadTime(guide.body)
  };

  const relatedGuidesWithReadTime = relatedGuides.map(g => ({
    ...g,
    readTime: calculateReadTime(g.body)
  }));

  return (
    <main className="min-h-screen bg-[#e8e5de]">
      <Header variant="blog" />

      {/* Article Card */}
      <div className="px-4 pb-8 pt-4 md:px-8">
        <article className="mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-[#f3f1eb]">
          {/* Article Header */}
          <header className="px-8 pb-16 pt-24 text-center md:px-16 md:pt-32">
            {/* Date */}
            <p className="text-xs tracking-widest text-gray-400">
              {formatDateUppercase(guideWithReadTime.publishedAt)}
            </p>

            {/* Platform */}
            {guideWithReadTime.platform && (
              <p className="mt-4 text-sm font-medium tracking-wider text-black">
                {guideWithReadTime.platform.toUpperCase()}
              </p>
            )}

            {/* Title */}
            <h1 className="mx-auto mt-8 max-w-3xl font-serif text-5xl leading-[1.1] tracking-[-0.06em] text-black md:text-6xl lg:text-7xl">
              {guideWithReadTime.title}
            </h1>
          </header>

          {/* Featured Image */}
          {guideWithReadTime.mainImage && (
            <div className="px-8 md:px-16">
              <div className="relative aspect-[2/1] overflow-hidden rounded-2xl bg-gray-100">
                <Image
                  src={guideWithReadTime.mainImage}
                  alt={guideWithReadTime.title}
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
              {guideWithReadTime.body ? (
                <div className="prose prose-lg">
                  {guideWithReadTime.body.split('\n\n').map((paragraph, index) => (
                    <p
                      key={index}
                      className="font-serif text-[1.3rem] leading-[1.58] tracking-[-0.04em] text-[#111] antialiased mb-6"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="font-serif text-[1.3rem] leading-[1.58] tracking-[-0.04em] text-[#111] antialiased">
                  {guideWithReadTime.excerpt}
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

      {/* Related Guides */}
      {relatedGuidesWithReadTime.length > 0 && (
        <section className="px-4 pb-16 md:px-8">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-8 font-serif text-3xl tracking-[-0.06em] text-black">
              Related guides
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedGuidesWithReadTime.map((relatedGuide) => (
                <Link
                  key={relatedGuide._id}
                  href={`/guides/${relatedGuide.slug.current}`}
                  className="group"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100">
                    {relatedGuide.mainImage ? (
                      <Image
                        src={relatedGuide.mainImage}
                        alt={relatedGuide.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        loading="lazy"
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
                        <span className="font-medium">{relatedGuide.platform}</span>
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

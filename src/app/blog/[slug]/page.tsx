import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Post } from "@/types";
import { formatDateUppercase, formatDateShort } from "@/lib/utils";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";

// Demo posts for static display
const demoPosts: (Post & { readTime: string })[] = [
  {
    _id: "1",
    title: "The museum of forgotten thoughts",
    slug: { current: "museum-of-forgotten-thoughts" },
    excerpt:
      "Many artists have said their big idea came from a very small one. A passing thought or a dream. We all have ideas like that, but most of us forget them.",
    body: "Many artists have said their big idea came from a very small one. A passing thought or a dream. We all have ideas like that, but most of us forget them.\n\nThe museum of forgotten thoughts is a place where all those ideas go. It's a vast, echoing hall filled with half-formed concepts, brilliant flashes that never quite materialized, and the seeds of masterpieces that were never planted.\n\nWhat if we could visit this museum? What if we could wander its halls and rediscover the thoughts we let slip away? That's the promise of building a second brain - a system that catches these fleeting ideas before they disappear forever.",
    category: "Thoughts",
    publishedAt: "2024-12-15",
    readTime: "3 min read",
  },
  {
    _id: "2",
    title: "The mess of moodboards & inspiration",
    slug: { current: "mess-of-moodboards" },
    excerpt:
      "How to organize your visual inspiration without losing the creative spark that made you save it in the first place.",
    body: "How to organize your visual inspiration without losing the creative spark that made you save it in the first place.\n\nWe've all been there - folders upon folders of saved images, screenshots, and references that we swore we'd come back to. But when the time comes to actually use them, we can't find what we're looking for.\n\nThe key isn't better organization - it's better connection. When you can link your inspirations to your projects, your notes, and your ideas, they stop being a mess and start being a resource.",
    category: "Tips & tricks",
    publishedAt: "2024-12-10",
    readTime: "4 min read",
  },
  {
    _id: "3",
    title: "On illusion, love & learning languages",
    slug: { current: "illusion-love-languages" },
    excerpt:
      "What language learning taught me about memory, perception, and the stories we tell ourselves.",
    body: "What language learning taught me about memory, perception, and the stories we tell ourselves.\n\nLearning a new language is an exercise in humility. You become a child again, stumbling over basic phrases, misunderstanding context, and constantly aware of how much you don't know.\n\nBut it also teaches you something profound about memory. The words that stick are the ones with emotional weight - the phrase a friend taught you, the song lyric that made you laugh, the mistake that embarrassed you. Memory is not a filing cabinet. It's a web of connections, emotions, and stories.",
    category: "Thoughts",
    publishedAt: "2024-12-05",
    readTime: "5 min read",
  },
  {
    _id: "4",
    title: "Travel through time",
    slug: { current: "travel-through-time" },
    excerpt:
      "Your memories are a time machine. Here's how to use them to spark creativity and find inspiration in your past.",
    body: "Your memories are a time machine. Here's how to use them to spark creativity and find inspiration in your past.\n\nEvery memory is a doorway. When you revisit a note from years ago, you're not just reading words - you're stepping back into who you were when you wrote them. Your concerns, your dreams, your perspective.\n\nThis is the magic of a well-maintained memory system. It doesn't just store information - it preserves context. And that context is often more valuable than the information itself.",
    category: "Featured",
    publishedAt: "2024-12-01",
    readTime: "3 min read",
  },
];

function getPost(slug: string): (Post & { readTime: string }) | null {
  return demoPosts.find((post) => post.slug.current === slug) || null;
}

function getRelatedPosts(currentSlug: string): (Post & { readTime: string })[] {
  return demoPosts.filter((post) => post.slug.current !== currentSlug).slice(0, 4);
}

export function generateStaticParams() {
  return demoPosts.map((post) => ({ slug: post.slug.current }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: ["memory.store"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug);

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
              {formatDateUppercase(post.publishedAt)}
            </p>

            {/* Category */}
            {post.category && (
              <p className="mt-4 text-sm font-medium tracking-wider text-black">
                {post.category.toUpperCase()}
              </p>
            )}

            {/* Title */}
            <h1 className="mx-auto mt-8 max-w-3xl font-serif text-5xl leading-[1.1] tracking-[-0.06em] text-black md:text-6xl lg:text-7xl">
              {post.title}
            </h1>
          </header>

          {/* Featured Image */}
          {post.mainImage && (
            <div className="px-8 md:px-16">
              <div className="relative aspect-[2/1] overflow-hidden rounded-2xl bg-gray-100">
                <Image
                  src={post.mainImage}
                  alt={post.title}
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
              {post.body ? (
                <div className="prose prose-lg">
                  {post.body.split('\n\n').map((paragraph, index) => (
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
                  {post.excerpt}
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

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="px-4 pb-16 md:px-8">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-8 font-serif text-3xl tracking-[-0.06em] text-black">
              Related articles
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost._id}
                  href={`/blog/${relatedPost.slug.current}`}
                  className="group"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100">
                    {relatedPost.mainImage ? (
                      <Image
                        src={relatedPost.mainImage}
                        alt={relatedPost.title}
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
                    {relatedPost.category && (
                      <>
                        <span>{relatedPost.category}</span>
                        <span>•</span>
                      </>
                    )}
                    <span>{formatDateShort(relatedPost.publishedAt)}</span>
                  </div>
                  {/* Title */}
                  <h3 className="mt-2 font-serif text-lg leading-tight tracking-[-0.04em] text-black group-hover:underline">
                    {relatedPost.title}
                  </h3>
                  {/* Excerpt */}
                  {relatedPost.excerpt && (
                    <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                      {relatedPost.excerpt}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to Blog Link */}
      <div className="pb-12 text-center">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-black"
        >
          <span>←</span> Back to all posts
        </Link>
      </div>

      <Footer />
    </main>
  );
}

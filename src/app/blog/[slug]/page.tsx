import Link from "next/link";
import { notFound } from "next/navigation";
import { client, postQuery, relatedPostsQuery, urlFor } from "@/lib/sanity";
import type { Post } from "@/lib/sanity";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// Demo post content
const demoPostContent: Record<string, Post & { content: string; readTime: string }> = {
  "museum-of-forgotten-thoughts": {
    _id: "1",
    title: "The museum of forgotten thoughts",
    slug: { current: "museum-of-forgotten-thoughts" },
    excerpt:
      "Many artists have said their big idea came from a very small one. A passing thought or a dream.",
    category: "Thoughts",
    publishedAt: "2024-12-15",
    readTime: "3 min read",
    content: `Many artists have said their big idea came from a very small one. A passing thought or a dream.

We all have ideas like that, but most of us forget them. We get distracted and they fade away.

But the artist collects those little gifts from the universe and trusts they'll reveal their meaning later.

You can do the same in your memory store.

If it shows up randomly in your real mind or sparks curiosity, save it. Don't worry about editing it or making it coherent. Just save it and move on.

Think of every idea or piece of inspiration as a quiet investment in your creative future.

Over time, you'll build up a bank of these little ideas. Later, when the time is right, you may use one of them. Or the little snippets will connect into something bigger.

That's what makes the artist: intention. A belief and commitment to their ideas, big and small.`,
  },
  "mess-of-moodboards": {
    _id: "2",
    title: "The mess of moodboards & inspiration",
    slug: { current: "mess-of-moodboards" },
    excerpt:
      "How to organize your visual inspiration without losing the creative spark.",
    category: "Tips & tricks",
    publishedAt: "2024-12-10",
    readTime: "4 min read",
    content: `The creative process is inherently messy. And that's okay.

When you're collecting inspiration, you're not supposed to know exactly how you'll use it. That's the whole point.

The problem with most tools is they force you to organize before you understand. They want folders and tags before you've had time to think.

But creativity doesn't work that way. Ideas need time to breathe, to connect, to reveal themselves.

The best system is one that lets you save now and organize later—or never. Because sometimes the best ideas come from unexpected connections between things you never thought belonged together.`,
  },
  "illusion-love-languages": {
    _id: "3",
    title: "On illusion, love & learning languages",
    slug: { current: "illusion-love-languages" },
    excerpt:
      "What language learning taught me about memory and perception.",
    category: "Thoughts",
    publishedAt: "2024-12-05",
    readTime: "5 min read",
    content: `Learning a new language is like seeing the world through different eyes.

Words aren't just labels for things—they're windows into how a culture sees reality. Some languages have words for emotions that don't exist in English. Others divide the color spectrum differently.

This taught me something important about memory: what we remember depends on the frameworks we have for understanding.

When you save something to your memory store, you're not just saving information. You're creating a new lens through which to see future experiences.

The more diverse your collection, the richer your perception becomes.`,
  },
  "travel-through-time": {
    _id: "4",
    title: "Travel through time",
    slug: { current: "travel-through-time" },
    excerpt:
      "Your memories are a time machine for creativity.",
    category: "Featured",
    publishedAt: "2024-12-01",
    readTime: "3 min read",
    content: `Your past self knew things your present self has forgotten.

That article you saved six months ago. That quote that resonated. That image that sparked something you couldn't quite name.

They're all still there, waiting to be rediscovered.

The magic happens when past and present collide. When something you saved months ago suddenly connects to a problem you're solving today.

This is why we built memory.store—not just to remember, but to create these moments of unexpected connection.

Your memory isn't just a record of the past. It's a tool for building the future.`,
  },
};

async function getPost(slug: string): Promise<(Post & { content?: string; readTime?: string }) | null> {
  try {
    if (!client) {
      return demoPostContent[slug] || null;
    }
    const post = await client.fetch(postQuery, { slug });
    return post || demoPostContent[slug] || null;
  } catch {
    return demoPostContent[slug] || null;
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).toUpperCase();
}

function formatDateShort(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// Get related posts (excluding current)
async function getRelatedPosts(currentSlug: string): Promise<Post[]> {
  try {
    if (!client) {
      // Return demo posts excluding current
      return Object.values(demoPostContent)
        .filter((p) => p.slug.current !== currentSlug)
        .slice(0, 4);
    }
    const posts = await client.fetch(relatedPostsQuery, { currentSlug });
    if (posts && posts.length > 0) {
      return posts;
    }
    // Fallback to demo posts
    return Object.values(demoPostContent)
      .filter((p) => p.slug.current !== currentSlug)
      .slice(0, 4);
  } catch {
    return Object.values(demoPostContent)
      .filter((p) => p.slug.current !== currentSlug)
      .slice(0, 4);
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(slug);

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
              {formatDate(post.publishedAt)}
              {post.readTime && ` · ${post.readTime.toUpperCase()}`}
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
          <div className="px-8 md:px-16">
            <div className="aspect-[2/1] overflow-hidden rounded-2xl bg-gray-100">
              {post.mainImage ? (
                <img
                  src={urlFor(post.mainImage).width(1200).url()}
                  alt={post.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                  <span className="text-sm text-gray-400">Featured Image</span>
                </div>
              )}
            </div>
          </div>

          {/* Content - Tufte-inspired typography */}
          <div className="px-6 py-16 md:px-8 md:py-24">
            <div className="mx-auto max-w-[34em]">
              {post.content ? (
                post.content.split("\n\n").map((paragraph, i) => (
                  <p 
                    key={i} 
                    className="mb-6 font-serif text-[1.3rem] leading-[1.58] tracking-[-0.04em] text-[#111] antialiased"
                  >
                    {paragraph}
                  </p>
                ))
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
            <button className="mt-8 rounded-full bg-black px-8 py-4 font-medium text-white transition-colors hover:bg-gray-800">
              Get Started — It&apos;s Free
            </button>
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
                  <div className="aspect-[4/3] overflow-hidden rounded-xl bg-gray-100">
                    {relatedPost.mainImage ? (
                      <img
                        src={urlFor(relatedPost.mainImage).width(400).url()}
                        alt={relatedPost.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
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

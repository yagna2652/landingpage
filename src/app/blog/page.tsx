import Link from "next/link";
import { client, postsQuery, featuredPostQuery, urlFor } from "@/lib/sanity";
import type { Post } from "@/lib/sanity";

// Demo posts for when Sanity is not configured
const demoPosts: (Post & { readTime: string })[] = [
  {
    _id: "1",
    title: "The museum of forgotten thoughts",
    slug: { current: "museum-of-forgotten-thoughts" },
    excerpt:
      "Many artists have said their big idea came from a very small one. A passing thought or a dream. We all have ideas like that, but most of us forget them.",
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
    category: "Featured",
    publishedAt: "2024-12-01",
    readTime: "3 min read",
  },
];

async function getPosts(): Promise<(Post & { readTime?: string })[]> {
  try {
    if (!client) {
      return demoPosts;
    }
    const posts = await client.fetch(postsQuery);
    return posts.length > 0 ? posts : demoPosts;
  } catch {
    return demoPosts;
  }
}

async function getFeaturedPost(): Promise<(Post & { readTime?: string }) | null> {
  try {
    if (!client) {
      return demoPosts[0];
    }
    const post = await client.fetch(featuredPostQuery);
    return post || demoPosts[0];
  } catch {
    return demoPosts[0];
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).toUpperCase();
}

export default async function BlogPage() {
  const [posts, featuredPost] = await Promise.all([
    getPosts(),
    getFeaturedPost(),
  ]);

  const otherPosts = posts.filter((p) => p._id !== featuredPost?._id);

  return (
    <main className="min-h-screen bg-[#e8e5de]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#e8e5de]">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link
            href="/"
            className="font-serif text-xl tracking-tight text-black"
          >
            memory.store
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/blog"
              className="text-sm font-medium text-black"
            >
              Blog
            </Link>
            <button className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800">
              Sign up
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Card */}
      <div className="px-4 pb-8 pt-4 md:px-8">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-white">
          
          {/* Blog Header */}
          <header className="px-8 pb-12 pt-24 text-center md:px-16 md:pt-32">
            <p className="text-xs tracking-widest text-gray-400">
              THOUGHTS & IDEAS
            </p>
            <h1 className="mt-4 font-serif text-5xl tracking-tight text-black md:text-6xl lg:text-7xl">
              Blog
            </h1>
            <p className="mx-auto mt-6 max-w-lg text-lg text-gray-600">
              Thoughts on memory, creativity, and building tools for thinking.
            </p>
          </header>

          {/* Featured Post */}
          {featuredPost && (
            <section className="border-t border-gray-100 px-8 py-16 md:px-16">
              <Link href={`/blog/${featuredPost.slug.current}`}>
                <article className="group">
                  {/* Image */}
                  <div className="aspect-[2/1] overflow-hidden rounded-2xl bg-gray-100">
                    {featuredPost.mainImage ? (
                      <img
                        src={urlFor(featuredPost.mainImage).width(1200).url()}
                        alt={featuredPost.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                        <span className="text-sm text-gray-400">Featured</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="mt-8 text-center">
                    <p className="text-xs tracking-widest text-gray-400">
                      {formatDate(featuredPost.publishedAt)}
                      {featuredPost.readTime && ` · ${featuredPost.readTime.toUpperCase()}`}
                    </p>
                    
                    {featuredPost.category && (
                      <p className="mt-3 text-sm font-medium tracking-wider text-black">
                        {featuredPost.category.toUpperCase()}
                      </p>
                    )}
                    
                    <h2 className="mx-auto mt-4 max-w-2xl font-serif text-3xl leading-tight tracking-tight text-black group-hover:underline md:text-4xl lg:text-5xl">
                      {featuredPost.title}
                    </h2>
                    
                    <p className="mx-auto mt-4 max-w-xl text-gray-600">
                      {featuredPost.excerpt}
                    </p>
                  </div>
                </article>
              </Link>
            </section>
          )}

          {/* Posts Grid */}
          <section className="border-t border-gray-100 px-8 py-16 md:px-16">
            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
              {otherPosts.map((post) => (
                <Link key={post._id} href={`/blog/${post.slug.current}`}>
                  <article className="group text-center">
                    {/* Image */}
                    <div className="aspect-[4/3] overflow-hidden rounded-xl bg-gray-100">
                      {post.mainImage ? (
                        <img
                          src={urlFor(post.mainImage).width(600).url()}
                          alt={post.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                          <span className="text-xs text-gray-400">Image</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="mt-5">
                      <p className="text-xs tracking-widest text-gray-400">
                        {formatDate(post.publishedAt)}
                      </p>
                      
                      {post.category && (
                        <p className="mt-2 text-xs font-medium tracking-wider text-black">
                          {post.category.toUpperCase()}
                        </p>
                      )}
                      
                      <h3 className="mt-3 font-serif text-xl leading-tight tracking-tight text-black group-hover:underline">
                        {post.title}
                      </h3>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="border-t border-gray-100 px-8 py-16 text-center md:px-16">
            <h3 className="font-serif text-3xl text-black">
              Ready to build your memory?
            </h3>
            <p className="mt-3 text-gray-600">
              Start capturing and connecting your ideas today.
            </p>
            <button className="mt-8 rounded-full bg-black px-8 py-4 font-medium text-white transition-colors hover:bg-gray-800">
              Get Started — It&apos;s Free
            </button>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 text-center">
        <div className="flex justify-center gap-6 text-sm text-gray-600">
          <a href="#" className="hover:text-black">Privacy</a>
          <a href="#" className="hover:text-black">Terms</a>
          <a href="#" className="hover:text-black">Contact</a>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          © 2025 memory.store
        </p>
      </footer>
    </main>
  );
}

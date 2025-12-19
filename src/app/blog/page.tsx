import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/types";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { sanityFetch } from "@/lib/sanity";
import { POSTS_QUERY } from "@/lib/queries";
import { calculateReadTime } from "@/lib/utils";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).toUpperCase();
}

export default async function BlogPage() {
  // Fetch all posts from Sanity
  const posts = await sanityFetch<Post[]>(POSTS_QUERY) || [];

  // Calculate readTime for each post
  const postsWithReadTime = posts.map(post => ({
    ...post,
    readTime: calculateReadTime(post.body)
  }));

  const featuredPost = postsWithReadTime[0];
  const otherPosts = postsWithReadTime.slice(1);

  return (
    <main className="min-h-screen bg-[#e8e5de]">
      <Header variant="blog" />

      {/* Main Content Card */}
      <div className="px-4 pb-8 pt-4 md:px-8">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-[#f3f1eb]">
          
          {/* Blog Header */}
          <header className="px-8 pb-12 pt-24 text-center md:px-16 md:pt-32">
            <p className="text-xs tracking-widest text-gray-400">
              THOUGHTS & IDEAS
            </p>
            <h1 className="mt-4 font-serif text-5xl tracking-[-0.06em] text-black md:text-6xl lg:text-7xl">
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
                  <div className="relative aspect-[2/1] overflow-hidden rounded-2xl bg-gray-100">
                    {featuredPost.mainImage ? (
                      <Image
                        src={featuredPost.mainImage}
                        alt={featuredPost.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                        priority
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
                    
                    <h2 className="mx-auto mt-4 max-w-2xl font-serif text-3xl leading-[1.1] tracking-[-0.06em] text-black group-hover:underline md:text-4xl lg:text-5xl">
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
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100">
                      {post.mainImage ? (
                        <Image
                          src={post.mainImage}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          loading="lazy"
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
                      
                      <h3 className="mt-3 font-serif text-xl leading-[1.2] tracking-[-0.04em] text-black group-hover:underline">
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
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}

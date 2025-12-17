import { createClient, type SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

/* eslint-disable @typescript-eslint/no-explicit-any */
type SanityImageSource = any;
type ImageBuilder = any;
/* eslint-enable @typescript-eslint/no-explicit-any */

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

// Only create client if projectId is configured
export const client: SanityClient | null = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2024-01-01",
      useCdn: true,
    })
  : null;

const builder = projectId
  ? imageUrlBuilder({ projectId, dataset })
  : null;

// Dummy builder for when Sanity is not configured
const dummyBuilder = {
  width: () => dummyBuilder,
  height: () => dummyBuilder,
  url: () => "",
};

export function urlFor(source: SanityImageSource): ImageBuilder {
  if (!builder || !source) return dummyBuilder;
  return builder.image(source);
}

// Types
export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  mainImage?: SanityImageSource;
  category?: string;
  publishedAt: string;
  body?: unknown[];
  content?: string;
}

// Queries
export const postsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  category,
  publishedAt
}`;

export const postQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  category,
  publishedAt,
  body
}`;

export const featuredPostQuery = `*[_type == "post" && featured == true][0] {
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  category,
  publishedAt
}`;

// Related posts query - excludes current post, optionally filters by category
export const relatedPostsQuery = `*[_type == "post" && slug.current != $currentSlug] | order(publishedAt desc) [0...4] {
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  category,
  publishedAt
}`;

// Related posts by category
export const relatedPostsByCategoryQuery = `*[_type == "post" && slug.current != $currentSlug && category == $category] | order(publishedAt desc) [0...4] {
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  category,
  publishedAt
}`;

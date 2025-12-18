// Shared types used across the application

/* eslint-disable @typescript-eslint/no-explicit-any */
export type SanityImageSource = any;
/* eslint-enable @typescript-eslint/no-explicit-any */

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

export interface Guide {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  mainImage?: SanityImageSource;
  platform?: string;
  difficulty?: string;
  readTime?: string;
  featured?: boolean;
  publishedAt: string;
  body?: unknown[];
}

export interface FeatureCardData {
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
  backgroundImage: string;
  reverse?: boolean;
}







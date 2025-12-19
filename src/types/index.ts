// Shared types used across the application

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  mainImage?: string;
  category?: string;
  publishedAt: string;
  body?: string;
}

export interface Guide {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  mainImage?: string;
  platform?: string;
  difficulty?: string;
  readTime?: string;
  featured?: boolean;
  publishedAt: string;
  body?: string;
}

export interface FeatureCardData {
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
  backgroundImage: string;
  reverse?: boolean;
}







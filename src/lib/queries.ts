// GROQ queries for Sanity CMS

// Query for blog listing - all posts ordered by date
export const POSTS_QUERY = `
  *[_type == "post" && defined(slug.current)]
  | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    category,
    publishedAt
  }
`;

// Query for single post by slug
export const POST_BY_SLUG_QUERY = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    category,
    publishedAt,
    body
  }
`;

// Query for related posts (excluding current, limit 4)
export const RELATED_POSTS_QUERY = `
  *[_type == "post" && slug.current != $slug && defined(slug.current)]
  | order(publishedAt desc) [0...4] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    category,
    publishedAt
  }
`;

// Query for all slugs (for generateStaticParams)
export const POST_SLUGS_QUERY = `
  *[_type == "post" && defined(slug.current)] {
    "slug": slug.current
  }
`;

// Guide queries - all guides ordered by date
export const GUIDES_QUERY = `
  *[_type == "guide" && defined(slug.current)]
  | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    platform,
    publishedAt
  }
`;

// Query for single guide by slug
export const GUIDE_BY_SLUG_QUERY = `
  *[_type == "guide" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    platform,
    publishedAt,
    body
  }
`;

// Query for related guides (excluding current, limit 4)
export const RELATED_GUIDES_QUERY = `
  *[_type == "guide" && slug.current != $slug && defined(slug.current)]
  | order(publishedAt desc) [0...4] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    platform,
    publishedAt
  }
`;

// Query for all guide slugs (for generateStaticParams)
export const GUIDE_SLUGS_QUERY = `
  *[_type == "guide" && defined(slug.current)] {
    "slug": slug.current
  }
`;

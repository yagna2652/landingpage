import { createClient } from '@sanity/client';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2024-01-01',
      useCdn: false, // Disable CDN for fresh data on every request
    })
  : null;

export async function sanityFetch<T = unknown>(
  query: string,
  params: Record<string, unknown> = {}
): Promise<T | null> {
  if (!client) {
    return null;
  }

  try {
    return await client.fetch<T>(query, params, {
      cache: 'no-store', // Always fetch fresh data (dynamic rendering)
    });
  } catch (error) {
    console.error('Sanity fetch error:', error);
    return null;
  }
}


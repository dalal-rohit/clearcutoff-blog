// lib/payload.ts
import 'server-only'; // Ensure this file is only used on the server

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL;

if (!PAYLOAD_URL) {
  throw new Error('NEXT_PUBLIC_PAYLOAD_URL is not defined');
}

export async function getPayloadData(collection: string, query?: string) {
  const url = `${PAYLOAD_URL}/api/${collection}${query ? `?${query}` : ''}`;
  console.log(`Fetching from: ${url}`); // For debugging
  try {
    const res = await fetch(url, {
      next: { revalidate: 60 }, // Revalidate data every 60 seconds
    });
    if (!res.ok) {
      const errorData = await res.json();
      console.error(`Error fetching ${collection}:`, errorData);
      throw new Error(`Failed to fetch ${collection}: ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error(`Network or parsing error for ${collection}:`, error);
    throw error;
  }
}

export async function getPayloadGlobal(slug: string, query?: string) {
  const url = `${PAYLOAD_URL}/api/globals/${slug}${query ? `?${query}` : ''}`;
  console.log(`Fetching global: ${url}`); // For debugging
  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 }, // Global settings might revalidate less often
    });
    if (!res.ok) {
      const errorData = await res.json();
      console.error(`Error fetching global ${slug}:`, errorData);
      throw new Error(`Failed to fetch global ${slug}: ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error(`Network or parsing error for global ${slug}:`, error);
    throw error;
  }
}

export async function getPayloadDocument(collection: string, id: string, query?: string) {
  const url = `${PAYLOAD_URL}/api/${collection}/${id}${query ? `?${query}` : ''}`;
  console.log(`Fetching document: ${url}`); // For debugging
  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      const errorData = await res.json();
      console.error(`Error fetching document ${collection}/${id}:`, errorData);
      throw new Error(`Failed to fetch document ${collection}/${id}: ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error(`Network or parsing error for document ${collection}/${id}:`, error);
    throw error;
  }
}

// Helper to get full image URL
export function getMediaURL(filename: string | undefined): string {
  if (!filename) return '';
  return `${process.env.NEXT_PUBLIC_PAYLOAD_MEDIA_URL}/${filename}`;
}
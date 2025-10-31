import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch dynamic data (Exams, Courses, Blog, etc.)
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/exams?limit=100&depth=0`,
    { cache: "no-store" }
  );

  const data = await res.json();

  // Map dynamic URLs
  const dynamicLinks =
    data?.docs?.map((exam: any) => ({
      url: `${process.env.NEXT_PUBLIC_APP_URL}/${exam.exam_id.toLowerCase()}`,
      lastModified: new Date(exam.updatedAt || new Date()).toISOString(),
      changeFrequency: "weekly",
      priority: 0.8,
    })) ?? [];

  // Add static pages
  const staticLinks = [
    {
      url: `${process.env.NEXT_PUBLIC_APP_URL}/`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${process.env.NEXT_PUBLIC_APP_URL}/about`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  return [...staticLinks, ...dynamicLinks];
}

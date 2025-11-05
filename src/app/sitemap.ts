import { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;
const PAYLOAD_API = `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const urls: MetadataRoute.Sitemap = [];

  try {
    // Fetch all exams (like reet, ctet, htet)
    const res = await fetch(`${PAYLOAD_API}/exams?limit=100`, { cache: "no-store" });
    const exams = (await res.json()).docs || [];

    for (const exam of exams) {
      const examId = exam.exam_id;

      // Extract value after the underscore (_) and convert to lowercase
      const formattedId = examId.split("_")[1]?.toLowerCase() ?? examId.toLowerCase();
      urls.push({
        url: `${BASE_URL}/sitemaps/${formattedId}.xml`,
        lastModified: new Date(exam.updatedAt || Date.now()),
      });
    }

    // Add root/home page too
    urls.push({
      url: BASE_URL,
      lastModified: new Date(),
    });
  } catch (err) {
    console.error("Error generating main sitemap:", err);
  }

  return urls;
}

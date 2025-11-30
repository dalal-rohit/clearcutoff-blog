import { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;
const PAYLOAD_API = `${process.env.MAIN_BACKEND_URL}`;

const allowedCourses = ["ctet", "htet", "reet", "hptet", "uptet"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const urls: MetadataRoute.Sitemap = [];

  try {
    // Fetch all exams (like reet, ctet, htet)
    const res = await fetch(`${PAYLOAD_API}/blog/exam`, { cache: "no-store" });
    const res1 = (await res.json()).data || [];
    const allowedExams = ["ctet"];

    const exams = res1?.filter((item: any) => {
      const key = item?.short_name?.toLowerCase();
      return allowedExams.includes(key);
    });

    for (const exam of exams) {
      const examId = exam.exam_id;

      // Extract value after the underscore (_) and convert to lowercase
      const formattedId = examId.split("_")[1]?.toLowerCase() ?? examId.toLowerCase();

      if (!allowedCourses.includes(formattedId)) {
        continue;
      }

      urls.push({
        url: `${BASE_URL}/sitemaps/${formattedId}.xml`,
        lastModified: new Date(exam.updatedAt || Date.now()),
      });
    }

    // Add root/home page too
    if (BASE_URL) {
      urls.push({
        url: BASE_URL,
        lastModified: new Date(),
      });
    }
  } catch (err) {
    console.error("Error generating main sitemap:", err);
  }

  return urls;
}

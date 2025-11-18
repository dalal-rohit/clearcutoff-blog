import { NextResponse } from "next/server";
import { formatToSlug, unFormatSlug } from "@/utils/slugify";
import { limitWords } from "@/utils/text/textLimit";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;
const PAYLOAD_API = `${process.env.MAIN_BACKEND_URL}`;

const allowedCourses = ["htet", "ctet", "uptet", "reet", "hptet"];

/**
 * GET /sitemaps/[examName]
 * 
 * Generate sitemap for given exam name
 * 
 * @param {Request} request - Next.js request object
 * @param {{ params: { examName: string } }} - Next.js route params object
 * 
 * @returns {Promise<NextResponse>} - Next.js response object
 */
export async function GET(
    request: Request,
    { params }: { params: Promise<{ examName: string }> }
) {
    const { examName } = await params;

    const originalExamName = examName.replace(/\.xml$/i, "");

    if (!allowedCourses.includes(originalExamName)) {
        return new NextResponse(`${originalExamName} Exam not Allowed`, { status: 404 });
    }

    try {
        const urls: { url: string; lastModified?: string }[] = [];

        // 1️⃣ Get exam info

        const query = `short_name=${originalExamName}`

        const examRes = await fetch(`${PAYLOAD_API}/blog/exam?${query}`);
        const examData = await examRes.json();
        const exam = examData.data?.[0];

        if (!exam) {
            return new NextResponse(`${originalExamName} Exam not found`, { status: 404 });
        }

        // 2️⃣ Fetch levels
        const queryLevels = `parent_id=true`

        const levelsRes = await fetch(`${PAYLOAD_API}/blog/get-enavigation?${queryLevels}`);
        const levels = (await levelsRes.json()).data || [];

        for (const level of levels) {

            urls.push({
                url: `${BASE_URL}/${originalExamName}/${level?.slug}`,
                lastModified: level.updatedAt,
            });
            urls.push({
                url: `${BASE_URL}/${originalExamName}/${level?.slug}/subject`,
                lastModified: level.updatedAt,
            });
            urls.push({
                url: `${BASE_URL}/${originalExamName}/${level?.slug}/year`,
                lastModified: level.updatedAt,
            });

            // 3️⃣ Fetch years
            const querySubjects = `exam_id=${originalExamName}&slug=${level?.slug}`


            const subjectsRes = await fetch(`${PAYLOAD_API}/blog/get-subject?${querySubjects}`);
            const subjects = (await subjectsRes.json()).data || [];

            for (const subject of subjects) {
                urls.push({
                    url: `${BASE_URL}/${originalExamName}/${level?.slug}/subject/${subject?.section?.slug}`,
                    lastModified: subject.updatedAt,
                });
            }

            const queryYears = `exam_id=${originalExamName}`

            const yearsRes = await fetch(`${PAYLOAD_API}/blog/get-years?${queryYears}`);
            const years = (await yearsRes.json()).data || [];


            for (const year of years) {
                urls.push({
                    url: `${BASE_URL}/${originalExamName}/${level?.slug}/year/${formatToSlug(year?.instance_id.replace("_", " "))}`,
                    lastModified: year.updatedAt,
                });
            }

        }


        

        // Generate XML response
        const xml = `
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${urls
                .map(
                    (url) => `
          <url>
            <loc>${url.url}</loc>
            <lastmod>${url.lastModified || new Date().toISOString()}</lastmod>
          </url>`
                )
                .join("")}
      </urlset>
    `.trim();

        return new NextResponse(xml, {
            headers: { "Content-Type": "application/xml" },
        });
    } catch (error) {
        console.error(error);
        return new NextResponse(`Error generating sitemap for ${error}`, { status: 500 });
    }
}

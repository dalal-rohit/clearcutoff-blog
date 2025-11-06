import { NextResponse } from "next/server";
import { formatToSlug, unFormatSlug } from "@/utils/slugify";
import { limitWords } from "@/utils/text/textLimit";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;
const PAYLOAD_API = `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api`;

const allowedCourses = ["htet", "ctet", "uptet", "reet", "hptet"];

export async function GET(
    request: Request,
    { params }: { params: { examName: string } }
) {
    const { examName } = params;

    const originalExamName = examName.replace(/\.xml$/i, "");

    if (!allowedCourses.includes(originalExamName)) {
        return new NextResponse(`${originalExamName} Exam not Allowed`, { status: 404 });
    }

    try {
        const urls: { url: string; lastModified?: string }[] = [];

        // 1️⃣ Get exam info

        const query = `where[exam_id][like]=${originalExamName}&limit=0&depth=2&draft=false&trash=false`

        const examRes = await fetch(`${PAYLOAD_API}/exams?${query}`);
        const examData = await examRes.json();
        const exam = examData.docs?.[0];

        if (!exam) {
            return new NextResponse(`${originalExamName} Exam not found`, { status: 404 });
        }

        // 2️⃣ Fetch levels
        const queryLevels = `where[exam_id][like]=${originalExamName}&limit=0&depth=2&draft=false&trash=false`

        const levelsRes = await fetch(`${PAYLOAD_API}/e-stage?${queryLevels}`);
        const levels = (await levelsRes.json()).docs || [];

        for (const level of levels) {
            const targetId = formatToSlug(level.name)

            urls.push({
                url: `${BASE_URL}/${originalExamName}/${encodeURIComponent(targetId)}`,
                lastModified: level.updatedAt,
            });

            // 3️⃣ Fetch years
            const queryYears = `where[stage_id][like]=${originalExamName}&limit=0&depth=2&draft=false&trash=false`

            const yearsRes = await fetch(`${PAYLOAD_API}/mapping-instance-and-stage?${queryYears}`);
            const years = (await yearsRes.json()).docs || [];
            const instanceIds = JSON.parse(years?.[0].instance_id.replace(/'/g, '"'));

            for (const year of instanceIds) {
                urls.push({
                    url: `${BASE_URL}/${originalExamName}/${encodeURIComponent(targetId)}/${formatToSlug(unFormatSlug(year))}`,
                    lastModified: year.updatedAt,
                });

                // 4️⃣ Fetch questions
                const examYear = formatToSlug(unFormatSlug(year)).replace(/-/g, "_").toUpperCase();

                const queryQuestions = `where[exam_instance_id][equals]=${examYear}&limit=0&depth=2`
                const questionsRes = await fetch(
                    `${PAYLOAD_API}/questions?${queryQuestions}&draft=false&trash=false`
                );
                const questions = (await questionsRes.json()).docs || [];

                for (const q of questions) {
                    urls.push({
                        url: `${BASE_URL}/${originalExamName}/${encodeURIComponent(targetId)}/${formatToSlug(unFormatSlug(year))}/${formatToSlug(limitWords(q.question_text, 4))}-${q.id}`,
                        lastModified: q.updatedAt,
                    });
                }
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
        return new NextResponse("Error generating sitemap", { status: 500 });
    }
}

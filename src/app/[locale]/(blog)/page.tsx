import BlogExamCardsSection from "@/components/blog/blog-exam-cards";
import BreadcrumbScriptLD from "@/components/breadcrumbLD-script";
import { getBreadcrumbSchema } from "@/utils/get-breadcrumb-schema";
import { Metadata } from "next";
import React from "react";

// export async function generateMetadata({
//   params,
//   searchParams,
// }: {
//   params: { locale: string; examName: string };
//   searchParams: { courseId?: string };
// }): Promise<Metadata> {
//   const locale = params?.locale ?? "en";
//   const courseId = searchParams?.courseId ?? "";
//   const query = `where[exam_id][equals]=${courseId}&limit=0&depth=2&locale=${locale}&draft=false&trash=false`;
//   try {
//     // ✅ Correct API fetch
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/courses?${query}`,
//       { cache: "no-store" }
//     );
//     const data = await res.json();
//     const baseTitle = (data?.seoTitle as string) || "Teaching Exams";
//     const baseDescription =
//       (data?.seoDescription as string) ||
//       "Explore Complete Courses & Test Series for Teaching Exams and get started for FREE.";

//     const title = `${baseTitle} | ClearCutoff`;
//     return {
//       title,
//       description: baseDescription,
//       openGraph: {
//         title,
//         description: baseDescription,
//         type: "website",
//       },
//       alternates: {
//         canonical: `${process.env.NEXT_PUBLIC_SITE_URL || ""}/${locale}/exam`,
//       },
//     };
//   } catch {
//     const fallbackTitle = "Teaching Exams | ClearCutoff";
//     const fallbackDesc =
//       "Explore Complete Courses & Test Series for Teaching Exams and get started for FREE.";
//     return {
//       title: fallbackTitle,
//       description: fallbackDesc,
//       openGraph: {
//         title: fallbackTitle,
//         description: fallbackDesc,
//         type: "website",
//       },
//     };
//   }
// }


export default async function Page({
  params,
}: {
  params: { locale: string; examName: string };
}) {
  const { locale } = await params;

  // --- Start Debugging ---
  const backendUrl = process.env.MAIN_BACKEND_URL;
  const fullFetchUrl = `${backendUrl}/blog/exam?status=active`;

  // Log the URL being fetched
  console.log(`[DEBUG] Fetching from: ${fullFetchUrl}`);
  // Log the backend URL variable itself
  if (!backendUrl) {
    console.error(`[ERROR] MAIN_BACKEND_URL is UNDEFINED. Check Vercel environment variables!`);
    // Optionally, throw an error or redirect immediately if this is critical
    // throw new Error("Backend URL is not configured.");
  }


  let data: any = null; // Initialize data
  try {
    const resCourses = await fetch(fullFetchUrl, { cache: "no-store" });

    // Log the response status and headers
    console.log(`[DEBUG] Response Status for ${fullFetchUrl}: ${resCourses.status}`);
    console.log(`[DEBUG] Response Content-Type: ${resCourses.headers.get('content-type')}`);

    if (!resCourses.ok) {
      // If the response is not OK (e.g., 404, 500)
      const errorBody = await resCourses.text(); // Read the body as text to see the HTML
      console.error(
        `[ERROR] Fetch for ${fullFetchUrl} failed with status ${resCourses.status}. ` +
        `Response body (first 500 chars): ${errorBody.substring(0, 500)}`
      );
      // Depending on your app, you might want to show a user-friendly error
      // or redirect to a 404 page if this is a fatal data dependency.
      // For now, we'll let it proceed to try parsing, which will likely fail.
      // notFound(); // Uncomment if a failed fetch should lead to a 404 page
      throw new Error(`Failed to fetch course data: ${resCourses.status} - ${errorBody.substring(0, 100)}`);
    }

    const contentType = resCourses.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
        const unexpectedResponse = await resCourses.text();
        console.error(`[ERROR] Expected JSON from ${fullFetchUrl}, but received Content-Type "${contentType}". ` +
                      `Full response (first 500 chars): ${unexpectedResponse.substring(0, 500)}`);
        throw new Error(`Unexpected content type from API: ${contentType}. Response starts with: ${unexpectedResponse.substring(0, 100)}`);
    }

    data = await resCourses.json(); // This is where the SyntaxError would occur
    console.log(`[DEBUG] Successfully fetched course data (first 100 chars): ${JSON.stringify(data).substring(0, 100)}`);

  } catch (error: any) {
    console.error(`[CRITICAL ERROR] Error during fetch or JSON parsing for ${fullFetchUrl}:`, error);
    // You can rethrow or handle the error gracefully here
    // For example, if data fetching is critical, you might return an error UI or call notFound()
    // throw error; // Re-throw to make sure Vercel catches it in logs
    if (error.message.includes("Unexpected token '<'")) {
        console.error("[CRITICAL] This strongly indicates HTML was returned instead of JSON.");
    }
    // Optionally, set data to an empty array or null to prevent crashes in the UI
    data = { data: [] }; // Fallback for UI if it expects an object with a data property
  }
  // --- End Debugging ---


  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const homeUrl = `${siteUrl}/${locale}`.replace(/\/+$/, "");
  const breadcrumbItems = [{ name: "Home", url: homeUrl }];

  return (
    <div>
      <BreadcrumbScriptLD breadcrumbItems={breadcrumbItems} />

      {/* Ensure BlogExamCardsSection can handle data being null or having an empty 'data' property */}
      <BlogExamCardsSection data={data?.data || []} />
    </div>
  );
}

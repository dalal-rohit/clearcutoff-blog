import BlogExamCardsSection from "@/components/blog/blog-exam-cards";
import CustomBreadcrumbs from "@/components/breadcrumbs/custom-breadcrumbs";
import MainBreadcrumbs from "@/components/breadcrumbs/main-breadcrumbs";
import { getBreadcrumbSchema } from "@/utils/get-breadcrumb-schema";
import { Metadata } from "next";
import React from "react";


export async function generateMetadata({ params, searchParams }: { params: { locale: string, examName: string }, searchParams: { courseId?: string } }): Promise<Metadata> {
  const locale = params?.locale ?? "en";
  const courseId = searchParams?.courseId ?? ""
  const query = `where[exam_id][equals]=${courseId}&limit=0&depth=2&locale=${locale}&draft=false&trash=false`
  try {

    // ✅ Correct API fetch
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/courses?${query}`,
      { cache: "no-store" }
    )
    const data = await res.json();
    const baseTitle = (data?.seoTitle as string) || "Teaching Exams";
    const baseDescription =
      (data?.seoDescription as string) ||
      "Explore Complete Courses & Test Series for Teaching Exams and get started for FREE.";

    const title = `${baseTitle} | ClearCutoff`;
    return {
      title,
      description: baseDescription,
      openGraph: {
        title,
        description: baseDescription,
        type: "website",
      },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL || ""}/${locale}/exam`,
      },
    };
  } catch {
    const fallbackTitle = "Teaching Exams | ClearCutoff";
    const fallbackDesc =
      "Explore Complete Courses & Test Series for Teaching Exams and get started for FREE.";
    return {
      title: fallbackTitle,
      description: fallbackDesc,
      openGraph: { title: fallbackTitle, description: fallbackDesc, type: "website" },
    };
  }
}

export default async function Page({
  params,
}: {
  params: { locale: string, examName: string }
}) {
  const locale = params?.locale ?? "en"

  const resCourses = await fetch(
    `${process.env.MAIN_BACKEND_URL}/blog/exam?status=active`,
    { cache: "no-store" }
  );

  if (!resCourses.ok) {
    throw new Error("Failed to fetch e-navigation data")
  }


  const data = await resCourses.json();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const homeUrl = `${siteUrl}/${locale}`.replace(/\/+$/, "");

  const breadcrumbItems = [
    { name: "Home", url: homeUrl },
  ]

  const breadcrumbLd = getBreadcrumbSchema(breadcrumbItems);

  return (
    <div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {/* <CustomBreadcrumbs
        isShow={true}
        items={breadcrumbItems}
      /> */}
      {/* <MainBreadcrumbs items={breadcrumbItems} /> */}
      <BlogExamCardsSection  data={data?.data} />
    </div>
  );
}

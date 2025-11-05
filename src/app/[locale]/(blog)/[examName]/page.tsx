import NotFound from "@/app/not-found";
import ExamLevelsSection from "@/components/blog/sections/exam-levels-section";
import MainBreadcrumbs from "@/components/breadcrumbs/main-breadcrumbs";
import { getBreadcrumbSchema } from "@/utils/get-breadcrumb-schema";
import { formatToSlug } from "@/utils/slugify";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import React from "react";


export async function generateMetadata({ params, searchParams }: { params: { locale: string, examName: string }, searchParams: { courseId?: string } }): Promise<Metadata> {
  const locale = params?.locale ?? "en";
  const courseId = searchParams?.courseId ?? ""
  const query = `where[exam_id][equals]=${courseId}&limit=0&depth=2&locale=${locale}&draft=false&trash=false`
  try {

    // ✅ Correct API fetch
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/e-navigation?${query}`,
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
  const locale = params?.locale ?? "en";

  const examName = params?.examName?.toUpperCase() ?? "";

  
  // Build query string safely
  const query = `where[exam_id][like]=${examName}&limit=0&depth=2&locale=${locale}&draft=false&trash=false`

  // ✅ Correct API fetch
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/e-stage?${query}`,
    { cache: "no-store" }
  )

  if (!res.ok) {
    return <NotFound />;
  }

  const data = await res.json();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const homeUrl = `${siteUrl}/${locale}`.replace(/\/+$/, "");
  const examsUrl = `${homeUrl}/${params?.examName}`;

  const breadcrumbItems=[
    { name: "Home", url: homeUrl },
    { name: examName, url: examsUrl },
  ]

  

  if (data.docs.length === 1) {
    const singleLevel = data.docs[0];
     const targetId = formatToSlug(singleLevel.name)
    redirect(`/${examName.toLowerCase()}/${encodeURIComponent(targetId)}`);
  } 
  const breadcrumbLd = getBreadcrumbSchema(breadcrumbItems);

  return (
    <div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <MainBreadcrumbs items={breadcrumbItems}/>
      <ExamLevelsSection data={data?.docs} examName={examName} />
    </div>
  );
}

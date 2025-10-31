import MainBreadcrumbs from "@/components/breadcrumbs/main-breadcrumbs";
import React from "react";
import { Metadata } from "next";
import { getBreadcrumbSchema } from "@/utils/get-breadcrumb-schema";
import TestByYears from "@/components/blog/assessment-question/test-by-years";
import { notFound } from "next/navigation";
import { unFormatSlug } from "@/utils/slugify";

export async function generateMetadata({ params }: { params: { locale: string, level_id: string } }): Promise<Metadata> {
  const locale = params?.locale ?? "en";
  const levelId = params?.level_id;
  const query = `where[stage_id][equals]=${levelId}&limit=0&depth=2&locale=${locale}&draft=false&trash=false`

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/mapping-instance-and-stage?${query}`,
      { cache: "no-store" }
    );



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

export default async function page({ params }: { params: { locale: string, examName: string, level_id: string } }) {
  const locale = params?.locale ?? "en"
  const examName = params?.examName?.toUpperCase() ?? "";
  const levelId = params?.level_id

  const query = `where[stage_id][like]=${examName}&limit=0&depth=2&locale=${locale}&draft=false&trash=false`

  const res = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/mapping-instance-and-stage?${query}`, {
    cache: "no-store",
  });

  // ✅ Handle failed response (404, 500 etc.)
  if (!res.ok) {
    return notFound();
  }

  const data = await res.json();

  // ✅ SAFETY CHECK: if no docs found then show NotFound
  if (!data?.docs || data.docs.length === 0) {
    return notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const homeUrl = `${siteUrl}/${locale}`.replace(/\/+$/, "");

  const breadcrumbItems=[
    { name: "Home", url: homeUrl },
    { name: unFormatSlug(params?.examName.toUpperCase()), url: `${homeUrl}/${params?.examName}` },
    { name: unFormatSlug(params?.level_id.toUpperCase()), url: `${homeUrl}/${params?.examName}/${params?.level_id}` },
  ]

  const breadcrumbLd = getBreadcrumbSchema(breadcrumbItems);
  return (
    <div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <MainBreadcrumbs items={breadcrumbItems}/>

      <TestByYears data={data?.docs} examName={examName} />
      {/* <SimilarQuestionsSection /> */}
      {/* <OthersExamsSection /> */}
    </div>
  );
}

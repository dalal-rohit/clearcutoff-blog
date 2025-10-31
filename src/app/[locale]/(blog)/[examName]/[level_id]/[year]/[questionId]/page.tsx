import AssessmentQuestionBlock from "@/components/blog/assessment-question/assessment-question-block";
import OthersExamsSection from "@/components/blog/assessment-question/others-exams-section";
import SimilarQuestionsSection from "@/components/blog/assessment-question/similar-questions-section";
import MainBreadcrumbs from "@/components/breadcrumbs/main-breadcrumbs";
import React from "react";
import { Metadata } from "next";
import { getBreadcrumbSchema } from "@/utils/get-breadcrumb-schema";
import console from "console";
import { unFormatSlug } from "@/utils/slugify";

export async function generateMetadata({ params }: { params: { locale: string, questionId: string } }): Promise<Metadata> {
  const locale = params?.locale ?? "en";
  const str = params?.questionId ?? "";
  const questionId = str.replace("question-", "");
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/questions?locale=${locale}&limit=0&depth=2`,
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

export default async function page({ params }: { params: { locale: string, examName: string, level_id: string, year: string, questionId: string } }) {
  const locale = params?.locale ?? "en";
  const str = params?.questionId ?? "";
  const questionId = str.split("-")[1];
  const res = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/questions?where[id][equals]=${questionId}&locale=${locale}&limit=5&depth=2`, {
    cache: "no-store",
  });
  const data = await res.json();


  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const homeUrl = `${siteUrl}/${locale}`.replace(/\/+$/, "");

  const breadcrumbItems = [
    { name: "Home", url: homeUrl },
    { name: unFormatSlug(params?.examName.toUpperCase()), url: `${homeUrl}/${params?.examName}` },
    { name: unFormatSlug(params?.level_id.toUpperCase()), url: `${homeUrl}/${params?.examName}/${params?.level_id}` },
    { name: unFormatSlug(params?.year.toUpperCase()), url: `${homeUrl}/${params?.examName}/${params?.level_id}/${params?.year}` },
    { name: unFormatSlug(params?.questionId.toUpperCase()), url: `${homeUrl}/${params?.examName}/${params?.level_id}/${params?.year}/${params?.questionId}` },
  ];

  const breadcrumbLd = getBreadcrumbSchema(breadcrumbItems);
  return (
    <div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <MainBreadcrumbs items={breadcrumbItems}/>

      <AssessmentQuestionBlock data={data?.docs} />
      {/* <SimilarQuestionsSection /> */}
      {/* <OthersExamsSection /> */}
    </div>
  );
}

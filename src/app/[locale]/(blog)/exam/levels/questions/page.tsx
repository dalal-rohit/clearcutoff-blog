import AssessmentQuestionBlock from "@/components/blog/assessment-question/assessment-question-block";
import OthersExamsSection from "@/components/blog/assessment-question/others-exams-section";
import SimilarQuestionsSection from "@/components/blog/assessment-question/similar-questions-section";
import MainBreadcrumbs from "@/components/breadcrumbs/main-breadcrumbs";
import React from "react";
import { Metadata } from "next";
import { getBreadcrumbSchema } from "@/utils/get-breadcrumb-schema";
import QuestionsList from "@/components/blog/assessment-question/questions-list";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params?.locale ?? "en";
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

export default async function page({ params }: { params: { locale: string } }) {
  const locale = params?.locale ?? "en";

  const res = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/questions?locale=${locale}&limit=0&depth=2`, {
    cache: "no-store",
  });
  const data = await res.json();

  console.log(data);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
   const homeUrl = `${siteUrl}/${locale}`.replace(/\/+$/, "");
   const examsUrl = `${homeUrl}/exam`;
   const pageTitle = (data?.seoTitle as string) || "Teaching Exams";
 
   const breadcrumbLd = getBreadcrumbSchema([
     { name: "Exam", url: homeUrl },
     { name: pageTitle, url: examsUrl },
   ]);  
  return (
    <div>
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <MainBreadcrumbs />
      
      <QuestionsList data={data?.docs} />
      {/* <SimilarQuestionsSection /> */}
      {/* <OthersExamsSection /> */}
    </div>
  );
}

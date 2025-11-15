import AssessmentQuestionBlock from "@/components/blog/assessment-question/assessment-question-block";
import OthersExamsSection from "@/components/blog/assessment-question/others-exams-section";
import SimilarQuestionsSection from "@/components/blog/assessment-question/similar-questions-section";
import MainBreadcrumbs from "@/components/breadcrumbs/main-breadcrumbs";
import React from "react";
import { Metadata } from "next";
import { getBreadcrumbSchema } from "@/utils/get-breadcrumb-schema";
import console from "console";
import { unFormatSlug } from "@/utils/slugify";
import CustomBreadcrumbs from "@/components/breadcrumbs/custom-breadcrumbs";
import MainContainer from "@/components/main-container";
import BreadcrumbScriptLD from "@/components/breadcrumbLD-script";

// export async function generateMetadata({ params }: { params: { locale: string, questionId: string } }): Promise<Metadata> {
//   const locale = params?.locale ?? "en";
//   const str = params?.questionId ?? "";
//   const questionId = str.replace("question-", "");
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/questions?locale=${locale}&limit=0&depth=2`,
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
//       openGraph: { title: fallbackTitle, description: fallbackDesc, type: "website" },
//     };
//   }
// }

export default async function page({
  params,
}: {
  params: { locale: string; questionId: string };
}) {
  const {locale, questionId: questionIdParam} = await params;
  const str = questionIdParam ?? "";
  const questionId = str.split("-").pop();
  const query = `id=${questionId}&limit_q=2`;

  const res = await fetch(
    `${process.env.MAIN_BACKEND_URL}/blog/get-questions?${query}`,
    {
      cache: "no-store",
    }
  );
  const data = await res.json();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const homeUrl = `${siteUrl}/${locale}`.replace(/\/+$/, "");

  const breadcrumbItems = [
    { name: "Home", url: homeUrl },
    // { name: unFormatSlug(params?.examName.toUpperCase()), url: `${homeUrl}/${params?.examName}` },
    // { name: unFormatSlug(params?.level_id.toUpperCase()), url: `${homeUrl}/${params?.examName}/${params?.level_id}` },
    // { name: unFormatSlug(params?.year.toUpperCase()), url: `${homeUrl}/${params?.examName}/${params?.level_id}/${params?.year}` },
    // { name: unFormatSlug(params?.questionId.toUpperCase()), url: `${homeUrl}/${params?.examName}/${params?.level_id}/${params?.year}/${params?.questionId}` },
  ];

  
  return (
    <div>
      <BreadcrumbScriptLD breadcrumbItems={breadcrumbItems} />

      <MainContainer
        padding="py-4"
        bgColor="transparent"
        maxWidth="max-w-[900px]"
      >
        <CustomBreadcrumbs
          padding="0px 4px 20px 4px"
          isShow={true}
          items={breadcrumbItems}
        />

        <AssessmentQuestionBlock data={data?.data} />
        {/* <SimilarQuestionsSection /> */}
        {/* <OthersExamsSection /> */}
      </MainContainer>
    </div>
  );
}

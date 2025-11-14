import MainBreadcrumbs from "@/components/breadcrumbs/main-breadcrumbs";
import React from "react";
import { Metadata } from "next";
import { getBreadcrumbSchema } from "@/utils/get-breadcrumb-schema";
import TestByYears from "@/components/blog/assessment-question/test-by-years";
import { notFound, redirect } from "next/navigation";
import { unFormatSlug } from "@/utils/slugify";
import { findLeafNodes } from "@/utils/getLeafNodes";
import TestBySubjects from "@/components/blog/assessment-question/test-by-subjects";
import NotFound from "@/app/not-found";
import MainContainer from "@/components/main-container";
import CustomizableHeader from "@/components/customizable-header";
import StarBadge from "@/components/ui/badge/star-badge";
import CustomBreadcrumbs from "@/components/breadcrumbs/custom-breadcrumbs";
type Props = {
  params: {
    locale: string;
    examName: string;
    level_id?: string;
    year?: string;
  };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params?.locale ?? "en";

  try {




    const baseTitle = "Teaching Exams";
    const baseDescription =
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




export default async function page({ params }: Props) {
  const locale = params?.locale ?? "en";

  const examName = params?.examName?.toUpperCase() ?? "";


  // Build query string safely
  const queryYears = `exam_id=${params?.examName}`;

  // ✅ Correct API fetch Years
  const resYears = await fetch(
    `${process.env.MAIN_BACKEND_URL}/blog/get-years?${queryYears}`,
    { cache: "no-store" }
  );


  const dataYears = await resYears.json();
  if (dataYears?.data?.length === 0) {
    return notFound;
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const homeUrl = `${siteUrl}/${locale}`.replace(/\/+$/, "");
  const examsUrl = `${homeUrl}/${params?.examName}`;

  const breadcrumbItems = [
    { name: "Home", url: homeUrl },
    { name: examName, url: examsUrl },
    { name: unFormatSlug(params?.level_id ?? ""), url: examsUrl },
    { name: unFormatSlug(params?.year ?? ""), url: examsUrl },
  ]

  const breadcrumbLd = getBreadcrumbSchema(breadcrumbItems);
  return (
    <div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <CustomBreadcrumbs
        isShow={true}
        items={breadcrumbItems}
      />
      <MainContainer maxWidth="max-w-[900px]" padding="py-4" bgColor="bg-[#f8fafc]">

        <div className='space-y-12'>
          <CustomizableHeader
            showEyebrow={false}
            heading={`${examName} Exam ${unFormatSlug(params?.level_id ?? "")}`}
            highlightText={examName}
            subheading={`${examName} exam ${unFormatSlug(params?.level_id ?? "")} preparation with Clear Cutoff`}
            headingColor="text-gray-900"
            highlightColor="text-blue-500"
            subheadingColor="text-gray-600"
            alignment="md:text-center text-left"
            headingClasses="!mb-1"
            headingSize="heading-xlarge !font-semibold"
          />



          {dataYears?.data?.length > 0 && (
            <TestByYears data={dataYears.data} examName={examName} />
          )}
        </div>

      </MainContainer>

      {/* <SimilarQuestionsSection /> */}
      {/* <OthersExamsSection /> */}
    </div>
  );
}

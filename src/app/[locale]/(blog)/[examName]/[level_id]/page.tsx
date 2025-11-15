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
import BreadcrumbScriptLD from "@/components/breadcrumbLD-script";
type Props = {
  params: {
    locale: string;
    examName: string;
    level_id?: string;
  };
  searchParams: {
    levels?: string | string[]; // ✅ Accept both
  };
};
// export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
//   const locale = params?.locale ?? "en";

//   try {




//     const baseTitle = "Teaching Exams";
//     const baseDescription =
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

function normalizeToArray(value?: string | string[]) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value]; // ✅ ensures array
}


export default async function page({ params, searchParams }: Props) {
  const { locale, examName: examNameParam, level_id } = await params;
  const sp = await searchParams;
  const levels = normalizeToArray(sp.levels);

  const examName = unFormatSlug(examNameParam).toLowerCase();

  // console.log("LEVELS ARRAY:", levels.map((l) => unFormatSlug(l))); // <-- Always array!


  // Build query string safely
  const queryYears = `exam_id=${examNameParam}`;
  // Convert to proper JSON array string for URL
  const levelsString = encodeURIComponent(JSON.stringify(levels.map(unFormatSlug)));

  const querySubjects =
    `exam_id=${examNameParam}` +
    `&name=${unFormatSlug(level_id ?? "")}` +
    `&levels=${levelsString}`;

  // ✅ Correct API fetch Years
  const resYears = await fetch(
    `${process.env.MAIN_BACKEND_URL}/blog/get-years?${queryYears}`,
    { cache: "no-store" }
  );
  // ✅ Correct API fetch Subjects
  const resSubjects = await fetch(
    `${process.env.MAIN_BACKEND_URL}/blog/get-sections?${querySubjects}`,
    { cache: "no-store" }
  );


  const dataYears = await resYears.json();
  const dataSubjects = await resSubjects.json();

  if (dataYears?.data?.length === 0 && dataSubjects?.data?.length === 0) {
    return notFound;
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const homeUrl = `${siteUrl}/${locale}`.replace(/\/+$/, "");
  const examsUrl = `${homeUrl}/${examNameParam}`;

  const breadcrumbItems = [
    { name: "Home", url: homeUrl },
    { name: examName, url: examsUrl },
    { name: unFormatSlug(level_id ?? ""), url: examsUrl },
  ]

  return (
    <div>

      <BreadcrumbScriptLD breadcrumbItems={breadcrumbItems} />

      <MainContainer maxWidth="max-w-[900px]" padding="py-4" bgColor="bg-[#f8fafc]">
        <div className="px-3">
          <CustomBreadcrumbs
            padding="0px 4px 20px 4px"
            isShow={true}
            items={breadcrumbItems}
          />
        </div>
        <div className='space-y-6'>
          <div className="px-3">
            <CustomizableHeader
              showEyebrow={false}
              heading={`${examName} Exam ${unFormatSlug(level_id ?? "")}`}
              highlightText={examName}
              subheading={`${examName} exam ${unFormatSlug(level_id ?? "")} preparation with Clear Cutoff`}
              headingColor="text-gray-900"
              highlightColor="text-blue-500"
              subheadingColor="text-gray-600"
              alignment="md:text-center text-left"
              headingClasses="!mb-1"
              headingSize="heading-xlarge !font-semibold"
            />
          </div>



          {dataSubjects?.data?.length > 0 && (
            <TestBySubjects data={dataSubjects.data} examName={examName} />
          )}

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

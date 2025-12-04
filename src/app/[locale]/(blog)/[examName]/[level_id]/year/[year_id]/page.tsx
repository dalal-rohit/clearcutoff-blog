import React from "react";
import { getBreadcrumbSchema } from "@/utils/google/get-breadcrumb-schema";
import QuestionsList from "@/components/blog/assessment-question/questions-list";
import { unFormatSlug } from "@/utils/slugify";
import MainContainer from "@/components/main-container";
import CourseCheckBadge from "@/components/ui/badge/course-check-badge";
import CustomBreadcrumbs from "@/components/breadcrumbs/custom-breadcrumbs";
import CustomizableHeader from "@/components/customizable-header";
import { capitalizeFirst } from "@/utils/text/textFormat";
import DetailsSectionCard from "@/components/blog/assessment-question/details-section-card";
import BreadcrumbScriptLD from "@/components/breadcrumbLD-script";
import { Metadata } from "next";
import { siteConfig } from "@/lib/metadata";
import { redirect } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { locale: string; examName: string, level_id: string, year_id: string };
}): Promise<Metadata> {
  const locale = params?.locale ?? "en";

  return {
    title: `${siteConfig.name} - ${params.examName} - ${params.level_id}`,
    description: "Explore Complete Courses & Test Series for Teaching Exams and get started for FREE.",
    openGraph: {
      title: "Academy",
      description: "Explore Complete Courses & Test Series for Teaching Exams and get started for FREE.",
      url: "https://clearcutoff.in",
      siteName: siteConfig.name,
      images: [
        {
          url: "https://cc-teaching-content-ind.s3.dualstack.ap-south-1.amazonaws.com/images/favicon.png",
          width: 1200,
          height: 630,
          alt: "ClearCutoff Exam Prep",
        },
      ],
      type: "website",
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${params.examName}/${params.level_id}/year/${params.year_id}`,
      languages: {
        'en': `${process.env.NEXT_PUBLIC_SITE_URL}/${params.examName}/${params.level_id}/year/${params.year_id}`, // Add this line
        'hi': `${process.env.NEXT_PUBLIC_SITE_URL}/hi/${params.examName}/${params.level_id}/year/${params.year_id}`,
        'x-default': `${process.env.NEXT_PUBLIC_SITE_URL}/${params.examName}/${params.level_id}/year/${params.year_id}`,
      },
    },
  };
}

export default async function page({
  params,
}: {
  params: {
    locale: string;
    examName: string;
    level_id: string;
    year: string;
    year_id: string;
  };
}) {
  const { locale, examName: examNameParam, level_id, year, year_id } = await params;
  const examName = examNameParam?.toUpperCase() ?? "";


  const allowedExams = ["ctet"];

  // Check
  if (!allowedExams.includes(examNameParam?.toLowerCase())) {
    redirect("/");
  }

  const levelId = level_id;
  const examYear = year_id.replace(/-/g, "_").toUpperCase();
  const yearId = year_id;

  const query = `year=${examYear}`;

  const res = await fetch(
    `${process.env.MAIN_BACKEND_URL}/blog/get-questions?${query}`,
    {
      cache: "no-store",
    }
  );
  const data = await res.json();


  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const homeUrl = siteUrl;

  const breadcrumbItems = [
    { name: "Home", url: homeUrl },
    {
      name: unFormatSlug(examNameParam.toLocaleUpperCase()),
      url: `${homeUrl}/${examNameParam}`,
    },
    {
      name: capitalizeFirst(unFormatSlug(level_id)),
      url: `${homeUrl}/${examNameParam}/${level_id}`,
    },
    {
      name: "Years",
      url: `${homeUrl}/${examNameParam}/${level_id}/year`,
    },
    {
      name: unFormatSlug(examYear.toUpperCase()),
      url: `${homeUrl}/${examNameParam}/${level_id}/year/${year_id}`,
    },
  ];

  const Labels = [
    {
      lable: "Exam",
      value: examName.toLocaleUpperCase() ?? "REET",
    },
    {
      lable: "Level",
      value: unFormatSlug(levelId ?? "") ?? "",
    },
    {
      lable: "State",
      value: "Rajasthan",
    },
  ];

  const breadcrumbLd = getBreadcrumbSchema(breadcrumbItems);

  function opacityToHex(opacity: number) {
    const value = Math.round(opacity * 255);
    return value.toString(16).padStart(2, "0").toUpperCase();
  }

  return (
    <div>
      <BreadcrumbScriptLD breadcrumbItems={breadcrumbLd} />

      <MainContainer
        maxWidth="max-w-[900px]"
        padding="py-4"
        className="space-y-5"
        bgColor="bg-transparent"
      >
        <div className="px-4">
          <CustomBreadcrumbs
            padding="0px 4px 20px 4px"
            isShow={true}
            items={breadcrumbItems}
          />
        </div>
        <div>
          <div className="flex flex-col gap-5">
            <CustomizableHeader
              showEyebrow={false}
              heading={`${examName.toUpperCase()} Exam ${unFormatSlug(
                levelId ?? ""
              )}`}
              highlightText={examName.toUpperCase()}
              subheading={`${examName.toUpperCase()} exam ${unFormatSlug(
                levelId ?? ""
              )} preparation with Clear Cutoff`}
              headingColor="text-gray-900"
              highlightColor="text-blue-500"
              subheadingColor="text-gray-600"
              alignment="md:text-center text-left"
              headingClasses="!mb-1"
              headingSize="heading-xlarge !font-semibold"
              className="px-4"
            />
            <div className="w-full bg-white p-4">
              <DetailsSectionCard
                yearId={unFormatSlug(yearId).toUpperCase()}
                Labels={Labels}
                totalQuestions={data?.data ?? 0}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <CustomizableHeader
            showEyebrow={false}
            heading={`Verified Answers and Explanations`}
            headingColor="text-gray-900"
            alignment="md:text-center text-left"
            headingClasses="!mb-0"
            headingSize="heading-xlarge !font-semibold"
            className="px-4"
          />

          <div className="p-4 bg-white space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-2 ">
              <div className="heading-small col-span-1">
                Year-wise questions
              </div>
              <div className="flex items-center gap-2 text-[#00a251] col-span-1 md:justify-self-end">
                <CourseCheckBadge size={16} fill="#00a251" />
                <p>by Clear Cutoff</p>
              </div>
            </div>

            <QuestionsList data={data?.data} />
          </div>
        </div>
      </MainContainer>
      {/* <SimilarQuestionsSection /> */}
      {/* <OthersExamsSection /> */}
    </div>
  );
}

import NotFound from "@/app/not-found";
import ExamLevelsSection from "@/components/blog/sections/exam-levels-section";
import BreadcrumbScriptLD from "@/components/breadcrumbLD-script";
import CustomBreadcrumbs from "@/components/breadcrumbs/custom-breadcrumbs";
import MainContainer from "@/components/main-container";
import { getBreadcrumbSchema } from "@/utils/google/get-breadcrumb-schema";
import { Metadata } from "next";
import React from "react";
import { unFormatSlug } from "@/utils/slugify";
import { siteConfig } from "@/lib/metadata";
import { redirect } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { locale: string; examName: string };
}): Promise<Metadata> {
  const locale = params?.locale ?? "en";

  return {
    title: `${siteConfig.name} - ${params.examName}`,
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
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${params.examName}`,
      languages: {
        'en': `${process.env.NEXT_PUBLIC_SITE_URL}/${params.examName}`, // Add this line
        'hi': `${process.env.NEXT_PUBLIC_SITE_URL}/hi/${params.examName}`,
        'x-default': `${process.env.NEXT_PUBLIC_SITE_URL}/${params.examName}`,
      },
    },
  };
}

export default async function Page({
  params,
}: {
  params: { locale: string; examName: string };
}) {
  const { locale, examName: examNameParam } = await params;
  const examName = unFormatSlug(examNameParam ?? "").toUpperCase();

  const allowedExams = ["ctet"];

  // Check
  if (!allowedExams.includes(examName?.toLowerCase())) {
    redirect("/");
  }



  // Build query string safely
  const query = `short_name=${examNameParam}&enavigation=true`;

  // ✅ Correct API fetch
  const res = await fetch(
    `${process.env.MAIN_BACKEND_URL}/blog/exam?${query}`,
    { cache: "force-cache" }
  );

  const data = await res.json();
  if (!data.data) {
    return <NotFound />;
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const homeUrl = siteUrl;
  const examsUrl = `${homeUrl}/${examNameParam}`;

  const breadcrumbItems = [
    { name: "Home", url: homeUrl },
    { name: examName, url: examsUrl },
  ];
  const breadcrumbLd = getBreadcrumbSchema(breadcrumbItems);


  return (
    <div>
      <BreadcrumbScriptLD breadcrumbItems={breadcrumbLd} />

      <MainContainer
        padding="py-4"
        maxWidth="max-w-[800px]"
        bgColor="bg-[#f8fafc]"
      >
        <div className="px-3">
          <CustomBreadcrumbs
            padding="0px 4px 20px 4px"
            isShow={true}
            items={breadcrumbItems}
          />
        </div>
        {/* <MainBreadcrumbs items={breadcrumbItems} /> */}
        <ExamLevelsSection data={data.data[0].navigation} examName={examName} />
      </MainContainer>
    </div>
  );
}

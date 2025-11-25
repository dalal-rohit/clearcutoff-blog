import BlogExamCardsSection from "@/components/blog/blog-exam-cards";
import BreadcrumbScriptLD from "@/components/breadcrumbLD-script";
import { siteConfig } from "@/lib/metadata";
import { getBreadcrumbSchema } from "@/utils/google/get-breadcrumb-schema";
import { Metadata } from "next";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: { locale: string; examName: string };
}): Promise<Metadata> {
  const locale = params?.locale ?? "en";

  return {
    title: "ClearCutoff - Academy",
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
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}`,
    },
  };
}

export default async function Page({
  params,
}: {
  params: { locale: string; examName: string };
}) {
  const { locale } = await params;

  const resCourses = await fetch(
    `${process.env.MAIN_BACKEND_URL}/blog/exam?status=active`,
    { cache: "force-cache" }
  );


  const data = await resCourses.json();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const homeUrl = siteUrl;
  const breadcrumbItems = [{ name: "Home", url: homeUrl }];
  const breadcrumbLd = getBreadcrumbSchema(breadcrumbItems);

  return (
    <div>
      <BreadcrumbScriptLD breadcrumbItems={breadcrumbLd} />

      <BlogExamCardsSection data={data?.data} />
    </div>
  );
}

import NotFound from "@/app/not-found";
import ExamLevelsSection from "@/components/blog/sections/exam-levels-section";
import BreadcrumbScriptLD from "@/components/breadcrumbLD-script";
import CustomBreadcrumbs from "@/components/breadcrumbs/custom-breadcrumbs";
import MainBreadcrumbs from "@/components/breadcrumbs/main-breadcrumbs";
import MainContainer from "@/components/main-container";
import { getBreadcrumbSchema } from "@/utils/get-breadcrumb-schema";
import { formatToSlug } from "@/utils/slugify";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import React from "react";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { locale: string; examName: string };
  searchParams: { courseId?: string };
}): Promise<Metadata> {
  const locale = params?.locale ?? "en";
  const courseId = searchParams?.courseId ?? "";
  const query = `where[exam_id][equals]=${courseId}&limit=0&depth=2&locale=${locale}&draft=false&trash=false`;
  try {
    // ✅ Correct API fetch
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/e-navigation?${query}`,
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
      openGraph: {
        title: fallbackTitle,
        description: fallbackDesc,
        type: "website",
      },
    };
  }
}

export default async function Page({
  params,
}: {
  params: { locale: string; examName: string };
}) {
  const locale = params?.locale ?? "en";

  const examName = params?.examName?.toUpperCase() ?? "";

  // Build query string safely
  const query = `short_name=${params?.examName}&enavigation=true`;

  // ✅ Correct API fetch
  const res = await fetch(
    `${process.env.MAIN_BACKEND_URL}/blog/exam?${query}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return <NotFound />;
  }

  const data = await res.json();
  console.log("data", data);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const homeUrl = `${siteUrl}/${locale}`.replace(/\/+$/, "");
  const examsUrl = `${homeUrl}/${params?.examName}`;

  const breadcrumbItems = [
    { name: "Home", url: homeUrl },
    { name: examName, url: examsUrl },
  ];

  if (data.data[0].navigation.length === 1) {
    const singleLevel = data.data[0];
    const targetId = formatToSlug(singleLevel.name);
    redirect(`/${examName.toLowerCase()}/${encodeURIComponent(targetId)}`);
  }
  const breadcrumbLd = getBreadcrumbSchema(breadcrumbItems);

  return (
    <div>
      <BreadcrumbScriptLD breadcrumbLd={breadcrumbLd} />

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

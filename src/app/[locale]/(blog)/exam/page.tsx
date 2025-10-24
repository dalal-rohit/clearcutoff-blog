import type { Metadata } from "next";
import MainBreadcrumbs from "@/components/breadcrumbs/main-breadcrumbs";
import React from "react";
import { getBreadcrumbSchema } from "@/utils/get-breadcrumb-schema";
import BlogExamCardsSection from "@/components/blog/blog-exam-cards";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params?.locale ?? "en";
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/courses?locale=${locale}`,
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

export default async function Page({ params }: { params: { locale: string } }) {
  const locale = params?.locale ?? "en";
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/courses?locale=${locale}`,
    { cache: "no-store" }
  );
  const data = await res.json();

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
      <BlogExamCardsSection data={data?.docs} />
      {/* <RegisterModal /> */}
    </div>
  );
}

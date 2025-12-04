import AssessmentQuestionBlock from "@/components/blog/assessment-question/assessment-question-block";
import React from "react";
import CustomBreadcrumbs from "@/components/breadcrumbs/custom-breadcrumbs";
import MainContainer from "@/components/main-container";
import BreadcrumbScriptLD from "@/components/breadcrumbLD-script";
import { getFaqSchema } from "@/utils/google/get-faqs-schema";
import { getBreadcrumbSchema } from "@/utils/google/get-breadcrumb-schema";
import { Metadata } from "next";
import { siteConfig } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: { locale: string; questionId: string };
}): Promise<Metadata> {

  const { locale, questionId } = await params;

  return {
    title: `${siteConfig.name} - ${questionId}`,
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
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/question/${questionId}`,
      languages: {
        'en': `${process.env.NEXT_PUBLIC_SITE_URL}/question/${questionId}`, // Add this line
        'hi': `${process.env.NEXT_PUBLIC_SITE_URL}/hi/question/${questionId}`,
        'x-default': `${process.env.NEXT_PUBLIC_SITE_URL}/question/${questionId}`,
      },
    },
  };
}

export default async function page({
  params,
}: {
  params: { locale: string; questionId: string };
}) {
  const { locale, questionId: questionIdParam } = await params;
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
  const homeUrl = siteUrl;

  const breadcrumbItems = [
    { name: "Home", url: homeUrl },
    { name: "Question", url: `${homeUrl}/question/${questionId}` },
  ];

  const selectedQuestion = data?.data?.find((item: any) => item.id === parseInt(questionId || ""));
  const faqItems = [
    {
      question: selectedQuestion?.question_text,
      answer: selectedQuestion?.explanation,
      questionAuthor: "ClearCutoff",
      answerAuthor: "ClearCutoff",
      dateCreated: selectedQuestion?.created_at,
      dateModified: selectedQuestion?.updated_at
    },
  ];

  // const faqlist = getFaqsSchema(faqItems);
  const faqlistSchema = getFaqSchema(faqItems);
  const breadcrumbLd = getBreadcrumbSchema(breadcrumbItems);


  return (
    <div>
      <BreadcrumbScriptLD breadcrumbItems={breadcrumbLd} />
      <BreadcrumbScriptLD breadcrumbItems={faqlistSchema} id="faq-ld" />

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

      </MainContainer>
    </div>
  );
}

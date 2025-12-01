import React from "react";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { formatToSlug, unFormatSlug } from "@/utils/slugify";
import MainContainer from "@/components/main-container";
import CustomizableHeader from "@/components/customizable-header";
import CustomBreadcrumbs from "@/components/breadcrumbs/custom-breadcrumbs";
import BreadcrumbScriptLD from "@/components/breadcrumbLD-script";
import SubjectsList from "@/components/blog/ui/subjects-list";
import CourseCheckBadge from "@/components/ui/badge/course-check-badge";
import { getBreadcrumbSchema } from "@/utils/google/get-breadcrumb-schema";
import { siteConfig } from "@/lib/metadata";
type Props = {
  params: {
    locale: string;
    examName: string;
    level_id?: string;
    subject?: string;
  };
};

export async function generateMetadata({
  params,
}: {
  params: { locale: string; examName: string, level_id: string };
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
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${params.examName}/${params.level_id}/subject`,
      languages: {
        'en': `${process.env.NEXT_PUBLIC_SITE_URL}/${params.examName}/${params.level_id}/subject`, // Add this line
        'hi': `${process.env.NEXT_PUBLIC_SITE_URL}/hi/${params.examName}/${params.level_id}/subject`,
        'x-default': `${process.env.NEXT_PUBLIC_SITE_URL}/${params.examName}/${params.level_id}/subject`,
      },
    },
  };
}

export default async function page({ params }: Props) {

  const { locale, examName, level_id, subject } = await params;
  const allowedExams = ["ctet"];

  // Check
  if (!allowedExams.includes(examName?.toLowerCase())) {
    redirect("/");
  }

  // ✅ Correct API fetch Subjects
  const resSubjects = await fetch(
    `${process.env.MAIN_BACKEND_URL}/blog/get-subject?exam_id=${examName}&slug=${level_id ?? ""}`,
    { cache: "force-cache" }
  );

  const dataSubjects = await resSubjects.json();

  // if (dataSubjects?.data?.length === 0) {
  //   return notFound;
  // }
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const homeUrl = `${siteUrl}/${locale}`.replace(/\/+$/, "");
  const examsUrl = `${homeUrl}/${examName}`;
  const levelUrl = `${examsUrl}/${level_id}`;
  const subjectUrl = `${levelUrl}/${subject}`;

  const breadcrumbItems = [
    { name: "Home", url: homeUrl },
    { name: examName, url: examsUrl },
    { name: unFormatSlug(level_id ?? ""), url: levelUrl },
    { name: "Subject", url: subjectUrl },
  ];
  const breadcrumbLd = getBreadcrumbSchema(breadcrumbItems);

  return (
    <div>
      <BreadcrumbScriptLD breadcrumbItems={breadcrumbLd} />

      <CustomBreadcrumbs isShow={true} items={breadcrumbItems} />
      <MainContainer
        maxWidth="max-w-[900px]"
        padding="py-4"
        bgColor="bg-[#f8fafc]"
      >
        <div className="space-y-12">
          <CustomizableHeader
            showEyebrow={false}
            heading={`${examName} Exam ${unFormatSlug(level_id ?? "")}`}
            highlightText={examName}
            subheading={`${examName} exam ${unFormatSlug(
              level_id ?? ""
            )} preparation with Clear Cutoff`}
            headingColor="text-gray-900"
            highlightColor="text-blue-500"
            subheadingColor="text-gray-600"
            alignment="md:text-center text-left"
            headingClasses="!mb-1"
            headingSize="heading-xlarge !font-semibold"
          />

          <div className='space-y-4'>

            <div className='w-full px-3 space-y-1'>
              <div className='heading-large !font-semibold'>
                By Subjects
              </div>
              <div className='grid grid-cols-5 justify-between items-center gap-1'>
                <div className='heading-small !font-semibold col-span-3'>
                  Subject-wise questions
                </div>
                <div className='flex items-center gap-2 text-[#00a251] col-span-2 justify-self-end'>
                  <CourseCheckBadge size={16} fill="#00a251" />
                  <p className='body-medium !font-normal'>by Clear Cutoff</p>
                </div>
              </div>
            </div>

            <div className='bg-white'>
              {dataSubjects.data?.length > 0 && (
                dataSubjects.data.map((item, index) => (
                  <SubjectsList key={index} index={index + 1} title={item?.section?.name} pathname={`subject/${formatToSlug(item?.section?.slug)}`} />
                ))
              )}
            </div>
          </div>

        </div>
      </MainContainer>
    </div>
  );
}

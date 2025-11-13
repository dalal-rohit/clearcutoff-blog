import MainBreadcrumbs from "@/components/breadcrumbs/main-breadcrumbs";
import React from "react";
import { Metadata } from "next";
import { getBreadcrumbSchema } from "@/utils/get-breadcrumb-schema";
import QuestionsList from "@/components/blog/assessment-question/questions-list";
import { unFormatSlug } from "@/utils/slugify";
import MainContainer from "@/components/main-container";
import CourseCheckBadge from "@/components/ui/badge/course-check-badge";
import CustomBreadcrumbs from "@/components/breadcrumbs/custom-breadcrumbs";

// export async function generateMetadata({ params }: { params: { locale: string, level_id: string } }): Promise<Metadata> {
//   const locale = params?.locale ?? "en";
//   const levelId = params?.level_id;
//   const query = `where[stage_id][equals]=${levelId}&limit=0&depth=2&locale=${locale}&draft=false&trash=false`

//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/mapping-instance-and-stage?${query}`,
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

export default async function page({ params }: { params: { locale: string, examName: string, level_id: string, year: string, year_id: string } }) {
  const locale = params?.locale ?? "en"
  const examName = params?.examName;
  const levelId = params?.level_id;
  const examYear = params?.year_id.replace(/-/g, "_").toUpperCase();
  const yearId = params?.year_id;

  const query = `year=${examYear}`

  const res = await fetch(`${process.env.MAIN_BACKEND_URL}/blog/get-questions?${query}`, {
    cache: "no-store",
  });
  const data = await res.json();


  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const homeUrl = `${siteUrl}/${locale}`.replace(/\/+$/, "");

  const breadcrumbItems = [
    { name: "Home", url: homeUrl },
    { name: unFormatSlug(params?.examName.toUpperCase()), url: `${homeUrl}/${params?.examName}` },
    { name: unFormatSlug(params?.level_id.toUpperCase()), url: `${homeUrl}/${params?.examName}/${params?.level_id}` },
    { name: unFormatSlug(examYear.toUpperCase()), url: `${homeUrl}/${params?.examName}/${params?.level_id}/${params?.year}` },
  ]

  const Labels = [
    {
      lable: 'Exam',
      value: examName ?? "REET"
    },
    {
      lable: 'Level',
      value: levelId ?? ""
    },
    {
      lable: 'State',
      value: "Rajasthan"
    },
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
      />      <MainContainer maxWidth="max-w-[900px]" padding='py-4' className='space-y-5' bgColor='bg-transparent'>
        <div className='w-full bg-white p-4'>
          <div>
            <div className='heading-large surface-text-gray-normal'>Question Details</div>
            <div className='mt-1 grid grid-cols-5 gap-x-8 gap-y-1 text-sm'>
              <div className='col-span-3'>
                {Labels.map((item, index) => {
                  return (
                    <div key={index}>
                      <span className='font-semibold text-gray-700'>{item.lable}:</span>{' '}
                      <span className='text-gray-600'>{item.value}</span>
                    </div>
                  )
                })}

              </div>
              <div className='col-span-2 flex flex-col items-start gap-2'>
                <div>
                  <span className='font-semibold text-gray-700'>Year:</span>{' '}
                  <span className="text-gray-600">
                    {(() => {
                      const value = yearId?.split("-") ?? "";
                      return value.length === 0 ? value : value[1];
                    })()}
                  </span>
                </div>
                <div>
                  <span className='font-semibold text-gray-700'>Questions:</span>{' '}
                  <span className='text-gray-600 px-2 py-1 bg-gray-100 rounded-md'></span>
                </div>



              </div>

            </div>
          </div>

        </div>

        <div className='flex justify-between items-center gap-2'>
          <div className='heading-small'>
            Year-wise verified questions
          </div>
          <div className='flex items-center gap-2 text-[#00a251]'>
            <CourseCheckBadge size={20} fill="#00a251" />
            <p>by Clear Cutoff</p>
          </div>
        </div>

        <QuestionsList data={data?.data} />
      </MainContainer>
      {/* <SimilarQuestionsSection /> */}
      {/* <OthersExamsSection /> */}
    </div>
  );
}

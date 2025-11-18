import DetailsSectionCard from '@/components/blog/assessment-question/details-section-card';
import QuestionListBySubject from '@/components/blog/assessment-question/question-list-by-subject';
import QuestionCard from '@/components/blog/ui/question-card';
import BreadcrumbScriptLD from '@/components/breadcrumbLD-script';
import CustomBreadcrumbs from '@/components/breadcrumbs/custom-breadcrumbs';
import MainContainer from '@/components/main-container'
import CourseCheckBadge from '@/components/ui/badge/course-check-badge';
import { formatToSlug, unFormatSlug } from '@/utils/slugify';
import { limitWords } from '@/utils/text/textLimit';
import React from 'react'
import { capitalizeFirst } from '@/utils/text/textFormat';

export default async function page({ params }: { params: { locale: string, examName: string, level_id: string, subject: string, subject_id: string } }) {
  const { locale, examName: examNameParam, level_id, subject, subject_id } = await params;

  const examName = examNameParam?.toUpperCase() ?? "";

  const query = `section_id=${examNameParam}&slug=${subject_id}`

  const res = await fetch(`${process.env.MAIN_BACKEND_URL}/blog/get-questions-by-section?${query}`, {
    cache: "force-cache",
  });
  const data = await res.json();

  // Assuming your backend response is in `response`
  const allQuestions =
    data?.data?.data?.flatMap(item => item.chapter?.questions || []) || [];

  // Now group them back by chapter
  const groupedByChapter =
    data?.data?.data?.map(item => ({
      slug: item.chapter?.slug,
      chapterId: item.chapter?.id,
      chapterName: item.chapter?.name,
      questions: item.chapter?.questions || []
    })) || [];

  const Labels = [
    {
      lable: 'Exam',
      value: examName ?? "REET"
    },
    {
      lable: 'Level',
      value: level_id ?? ""
    },
    {
      lable: 'State',
      value: "Rajasthan"
    },
  ]


  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const homeUrl = siteUrl
  const examsUrl = `${homeUrl}/${examName}`;
  const levelUrl = `${examsUrl}/${level_id}`;
  const subjectUrl = `${levelUrl}/subject`;
  const subjectIdUrl = `${subjectUrl}/${subject_id}`;

  const breadcrumbItems = [
    { name: "Home", url: homeUrl },
    { name: examName, url: examsUrl },
    { name: capitalizeFirst(level_id), url: levelUrl },
    { name: "Subject", url: subjectUrl },
    { name: capitalizeFirst(subject_id), url: subjectIdUrl },
  ];

  return (
    <>
      <BreadcrumbScriptLD breadcrumbItems={breadcrumbItems} />

      <MainContainer maxWidth="max-w-[900px]" padding='py-4' className='space-y-5' bgColor='bg-transparent'>
        <CustomBreadcrumbs isShow={true} items={breadcrumbItems} />

        <div className='w-full bg-white p-4'>
          <DetailsSectionCard
            yearId={unFormatSlug(subject_id).toUpperCase()}
            Labels={Labels}
            sourceLabel="Subject"
            totalQuestions={data?.data ?? 0}
          />


        </div>
        <div className='space-y-2'>
          <div className='flex justify-between items-center gap-2 px-3'>
            <div className='heading-small'>
              Subject-wise questions
            </div>
            <div className='flex items-center gap-2 text-[#00a251]'>
              <CourseCheckBadge size={20} fill="#00a251" />
              <p>by Clear Cutoff</p>
            </div>
          </div>
          <QuestionListBySubject data={groupedByChapter} />

        </div>


      </MainContainer>
    </>
  )
}

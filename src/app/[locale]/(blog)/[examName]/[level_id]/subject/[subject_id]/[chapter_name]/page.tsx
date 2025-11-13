import MainContainer from '@/components/main-container'
import CourseCheckBadge from '@/components/ui/badge/course-check-badge';
import React from 'react'
import { unFormatSlug } from '@/utils/slugify'
import QuestionsListByChapter from '@/components/blog/assessment-question/questions-list-by-chapter';
import QuestionsList from '@/components/blog/assessment-question/questions-list';

export default async function page({ params }: { params: { locale: string, examName: string, level_id: string, subject: string, subject_id: string, chapter_name: string } }) {

  const query = `chapter_name=${unFormatSlug(params?.chapter_name)}`

  const res = await fetch(`${process.env.MAIN_BACKEND_URL}/blog/get-questions-by-chapter?${query}`, {
    cache: "no-store",
  });
  const data = await res.json();
  const questions = data?.data?.questions;
  const Labels = [
    {
      lable: 'Exam',
      value: params?.examName ?? "REET"
    },
    {
      lable: 'Level',
      value: params?.level_id ?? ""
    },
    {
      lable: 'State',
      value: "Rajasthan"
    },
  ]
  return (
    <MainContainer maxWidth="max-w-[900px]" padding='py-4' className='space-y-5' bgColor='bg-transparent'>
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
                <span className='font-semibold text-gray-700'>Chapter:</span>{' '}
                <span className="text-gray-600">
                  {data?.data?.name}
                </span>
              </div>
              <div>
                <span className='font-semibold text-gray-700'>Questions:</span>{' '}
                <span className='text-gray-600 px-2 py-1 bg-gray-100 rounded-md'>{questions?.length}</span>
              </div>


            </div>

          </div>
        </div>

      </div>
      <div className='space-y-2'>
        <div className='flex justify-between items-center gap-2'>
          <div className='heading-small'>
            Year-wise verified questions
          </div>
          <div className='flex items-center gap-2 text-[#00a251]'>
            <CourseCheckBadge size={20} fill="#00a251" />
            <p>by Clear Cutoff</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <QuestionsList data={questions} />
        </div>
      </div>


    </MainContainer>
  )
}

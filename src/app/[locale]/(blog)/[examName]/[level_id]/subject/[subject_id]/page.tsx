import QuestionListBySubject from '@/components/blog/assessment-question/question-list-by-subject';
import QuestionCard from '@/components/blog/ui/question-card';
import MainContainer from '@/components/main-container'
import CourseCheckBadge from '@/components/ui/badge/course-check-badge';
import { formatToSlug } from '@/utils/slugify';
import { limitWords } from '@/utils/text/textLimit';
import React from 'react'

export default async function page({ params }: { params: { locale: string, examName: string, level_id: string, subject: string, subject_id: string } }) {
  const locale = params?.locale ?? "en"
  const sectionId = params?.subject_id;

  const query = `section_id=${params?.examName}&name=${params?.subject_id}`

  const res = await fetch(`${process.env.MAIN_BACKEND_URL}/blog/get-questions-by-section?${query}`, {
    cache: "no-store",
  });
  const data = await res.json();

  // Assuming your backend response is in `response`
  const allQuestions =
    data?.data?.data?.flatMap(item => item.chapter?.questions || []) || [];

  // Now group them back by chapter
  const groupedByChapter =
    data?.data?.data?.map(item => ({
      chapterId: item.chapter?.id,
      chapterName: item.chapter?.name,
      questions: item.chapter?.questions || []
    })) || [];


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
                <span className='font-semibold text-gray-700'>Year:</span>{' '}
                <span className="text-gray-600">
                  200
                </span>
              </div>
              <div>
                <span className='font-semibold text-gray-700'>Questions:</span>{' '}
                {/* <span className='text-gray-600 px-2 py-1 bg-gray-100 rounded-md'>{Array.isArray(allData) ? allData.length : 0}</span> */}
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
        <QuestionListBySubject data={groupedByChapter} />
        <div className="grid grid-cols-1 gap-4">




          {/* {shown?.map((item, index) => {
            const plain = item.question_text?.replace(/<[^>]*>/g, "") || "";
            const snippet = limitWords(plain, 25);
            return (
              <>
                <QuestionCard
                  key={index}
                  q_no={item.question_number}
                  index={index}
                  setLoadingId={setLoadingId}
                  path={`/question/${formatToSlug(limitWords(item.question_text, 4))}-${item.id}`}
                  onClick={() => setLoadingId(item.id)}
                  questionText={snippet}
                  active={loadingId === item.id}
                />

              </>
            );
          })} */}
        </div>
      </div>


    </MainContainer>
  )
}

'use client'
import React from 'react'
import MainContainer from '@/components/main-container'
import CustomizableHeader from '@/components/customizable-header'
import { useRouter } from 'next/navigation'
import { useSelectedDataStore } from '@/store/blog/useSelectedDataStore'
import CardWrap from '../cards/card-wrap'
import { highlightTextUtil } from '@/utils/highlightTextUtil'
import Image from 'next/image'

const ExamCourseCard = ({ item, onClick }: { item: Exam, onClick: () => void }) => {
    return (
        <CardWrap onClick={onClick} cursor='pointer' borderwidth={1}>
            <div className='flex items-center gap-4'>
                <div>
                    <Image
                        src={item.logo_url}
                        alt={item.name}
                        width={64}
                        height={64}
                    />
                </div>
                <div>
                    <h3 className='heading-medium !font-semibold text-black'>{item.short_name}</h3>
                    <p className='body-small !font-normal'>{item.exam_type} Exam</p>
                </div>
            </div>
        </CardWrap>
    )
}

export default function BlogExamCardsSection({ data }: { data: Exam[] }) {
    const router = useRouter()
    const setSelectedCourse = useSelectedDataStore(s => s.setSelectedCourse)
    const onSelect = (item: Exam) => {
        // Save in client-side store (optional)
        setSelectedCourse(item)
        const examId = item.exam_id;

        // Extract value after the underscore (_) and convert to lowercase
        const formattedId = examId.split("_")[1]?.toLowerCase() ?? examId.toLowerCase();

        // Navigate with clean lowercase URL
        router.push(`/${formattedId}`);

    }

    const centralExams = data.filter(item => item.state.toLowerCase().includes('india') && item.status.toLowerCase().includes("active"))
    const stateExams = data
        .filter(item => !item.state.toLowerCase().includes("india") && item.status.toLowerCase().includes("active"))
        .reduce((groups, exam) => {
            const key = exam.state;
            if (!groups[key]) groups[key] = [];
            groups[key].push(exam);
            return groups;
        }, {} as Record<string, Exam[]>);



    return (
        <MainContainer padding="p-4" maxWidth="max-w-[900px]">
            <section className="space-y-8">
                <CustomizableHeader
                    showEyebrow={false}
                    heading={'Exams on Clear Cutoff'}
                    highlightText={'Clear Cutoff'}
                    subheading={'Start your journey of success with Clear Cutoff Academy'}
                    headingColor="text-gray-900"
                    highlightColor="text-blue-500"
                    subheadingColor="text-gray-600 "
                    alignment="md:text-center text-left"
                    headingClasses="!mb-1"
                    headingSize="heading-2xlarge !font-semibold"
                />

                <div className='space-y-6'>
                    <div className='w-full'>
                        <div className="heading-xlarge">{highlightTextUtil('Central Teaching Exams', 'Central')}</div>
                        <div className="mt-5 grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {centralExams.map((item) => {
                                return (
                                    <ExamCourseCard key={item.id} item={item} onClick={() => onSelect(item)} />
                                )
                            })}
                        </div>
                    </div>

                    <div className='w-full'>
                        <div className="heading-xlarge">{highlightTextUtil('State Teaching Exams', 'State')}</div>
                        <div className="mt-4 md:mt-5 grid items-start gap-5 ">
                            {Object.entries(stateExams).map(([state, exams]) => {
                                return (
                                    <div key={state} >
                                        <h3 className="heading-large  neutral-blueGrayLight">{state}</h3>
                                        <div className={["mt-4 grid items-start gap-5 grid-cols-2 ", exams.length > 3 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-2 lg:grid-cols-3"].join(' ')}>
                                            {exams.map((item) => {
                                                return (
                                                    <ExamCourseCard key={item.id} item={item} onClick={() => onSelect(item)} />
                                                )
                                            })}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className=" text-center space-y-6">
                    <p className="text-xl md:text-2xl text-gray-700">
                        Used by <span className="font-bold text-blue-600">10,000+</span> students to clear TET exams.
                    </p>
                    <p className="text-gray-500 max-w-3xl mx-auto text-sm md:text-base">
                        Join thousands of successful TET aspirants who chose smart, affordable learning over expensive coaching!
                    </p>
                    <div className="flex items-center justify-center gap-2 text-gray-700">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200">
                            <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden>
                                <path fill="currentColor" d="M10 0a10 10 0 1010 10A10.011 10.011 0 0010 0zm4.707 8.293l-5.5 5.5a1 1 0 01-1.414 0l-2.5-2.5a1 1 0 011.414-1.414L8.5 11.586l4.793-4.793a1 1 0 011.414 1.414z" />
                            </svg>
                        </span>
                        <span className="font-semibold">4.9+</span>
                        <span className="text-gray-500">Average Rating by our Students!</span>
                    </div>
                </div>
            </section>
        </MainContainer >
    )
}

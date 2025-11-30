'use client'
import React, { useEffect } from 'react'
import MainContainer from '@/components/main-container'
import CustomizableHeader from '@/components/customizable-header'
import { useRouter } from 'next/navigation'
import { useSelectedDataStore } from '@/store/blog/useSelectedDataStore'
import CardWrap from '../cards/card-wrap'
import { highlightTextUtil } from '@/utils/highlightTextUtil'
import Image from 'next/image'
import CourseCheckBadge from '../ui/badge/course-check-badge'
import { formatToSlug } from '@/utils/slugify'
import { ChartSuccessBarIcon } from '../ui/icons/chart-success-bar-icon'
import CalendarIcon from '../ui/icons/calendar-icon'
import CircleClockIcon from '../ui/icons/circle-clock-icon'
import WarningCirleIcon from '../ui/icons/warning-circle-icon'

const ExamCourseCard = ({ item, onClick, bgcolor }: { item: Exam, onClick: () => void, bgcolor?: string }) => {
    const metadata = JSON.parse(item?.metadata);
    const points = [
        {
            id: 1,
            icon: <CalendarIcon />,
            name: 'Exam Date',
            value: metadata?.exam_date,
        },
        {
            id: 2,
            icon: <WarningCirleIcon />,
            name: 'Exam Mode',
            value: metadata?.exam_mode,
        },
        {
            id: 3,
            icon: <CircleClockIcon />,
            name: 'Duration',
            value: metadata?.duration,
        },
        {
            id: 3,
            icon: <ChartSuccessBarIcon />,
            name: 'Cutoff',
            value: metadata?.cutoff,
        },
    ]
    return (
        <CardWrap bgcolor={bgcolor} onClick={onClick} cursor='pointer' borderwidth={1}>
            <div className='flex  items-start gap-4'>
                <div className='flex flex-col gap-1'>
                    <div className='relative h-16 w-16'>
                        <Image
                            src={item.logo_url}
                            alt={item.name}
                            width={64}
                            height={64}
                        />
                        <div className='absolute bottom-0 right-0 bg-white p-1 rounded-full'>
                            <CourseCheckBadge size={20} fill="#0083ff" />
                        </div>

                    </div>
                    <div className='text-center'>
                        <h3 className='heading-medium !font-semibold text-black'>{item.short_name}</h3>
                        <p className='body-small !font-normal'>{item.exam_type}</p>
                    </div>
                </div>

                <div>

                    {points.map((item, index) => {
                        if (!item.value) return null;
                        return (
                            <div key={item.id || index} className='flex items-center gap-1'>
                                <span className='flex items-center'>{item?.icon}</span>
                                <span className='body-medium !font-normal surface-text-gray-muted'>{item?.name}:</span>
                                <span className="text-gray-600">{item?.value}</span>
                            </div>
                        );
                    })}



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
        const examId = item.short_name;

        // Extract value after the underscore (_) and convert to lowercase
        const formattedId = formatToSlug(examId);

        // Navigate with clean lowercase URL
        router.push(`/${formattedId}`);

    }

    useEffect(() => {
        const fetchData = async () => {
            const backendUrl = process.env.MAIN_BACKEND_URL;
            const fullFetchUrl = `${backendUrl}/blog/exam?status=active`;
            const resCourses = await fetch(fullFetchUrl, { cache: "no-store" });
            const data = await resCourses.json();
            console.log(data)
        }
        fetchData()
    }, [])

    const centralExams = data?.filter(item => item.state.toLowerCase().includes('india') && item.status.toLowerCase().includes("active"))
    const stateExams = data?.filter(item => !item.state.toLowerCase().includes("india") && item.status.toLowerCase().includes("active"))
        .reduce((groups, exam) => {
            const key = exam.state;
            if (!groups[key]) groups[key] = [];
            groups[key].push(exam);
            return groups;
        }, {} as Record<string, Exam[]>);


    return (
        <MainContainer padding="py-4 px-3" bgColor='transparent' maxWidth="max-w-[900px]">
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
                    {centralExams?.length > 0 && (
                        <div className='w-full'>
                            <div className="heading-xlarge">{highlightTextUtil('Central Teaching Exams', 'Central')}</div>
                            <div className="mt-5 grid items-start gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                                {centralExams.map((item) => {
                                    return (
                                        <ExamCourseCard bgcolor='white' key={item.id} item={item} onClick={() => onSelect(item)} />
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    {Object.entries(stateExams)?.length > 0 && (
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
                                                        <ExamCourseCard bgcolor='white' key={item.id} item={item} onClick={() => onSelect(item)} />
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                </div>
                {/* <div className=" text-center space-y-6">
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
                </div> */}
            </section>
        </MainContainer >
    )
}

'use client'
import React from 'react'
import MainContainer from '@/components/main-container'
import CustomizableHeader from '@/components/customizable-header'
import { useRouter } from 'next/navigation'
import { useSelectedDataStore } from '@/store/blog/useSelectedDataStore'
import CourseCard from '../cards/course-card'


export default function LandingExamCardsSection({ data }: { data: Exam[] }) {
    const router = useRouter()
    const setSelectedCourse = useSelectedDataStore(s => s.setSelectedCourse)
    const onSelect = (item: Exam) => {
        // Save in client-side store (optional)
        setSelectedCourse(item)
        // Navigate with query param for the server to read
        router.push(`/teaching/${encodeURIComponent(item.exam_id)}`)
    }

    return (
        <MainContainer maxWidth="max-w-[1100px]">
            <section className="py-10 md:py-14">
                <CustomizableHeader
                    eyebrow={'Prepare for All Teaching Exams'}
                    heading={'All Teaching Exams at One Place!'}
                    highlightText={'Teaching Exams'}
                    subheading={'Explore Complete Courses & Test Series for All Teaching Exams and get started for FREE.'}
                    headingColor="text-gray-900"
                    highlightColor="text-blue-500"
                    subheadingColor="text-gray-600"
                    alignment="text-center"
                    headingClasses="!mb-4"
                    headingSize="display-medium"
                />

                <div className="mt-8 md:mt-12 grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {data.map((item) => {
                        return (
                            <CourseCard
                                key={item.id}
                                item={item}
                                viewMoreDetails={() => onSelect(item)}
                                startForFree={() => onSelect(item)}
                            />
                        )
                    })}
                </div>

                <div className="mt-12 md:mt-16 text-center space-y-6">
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
        </MainContainer>
    )
}

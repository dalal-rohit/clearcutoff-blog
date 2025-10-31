
"use client";
import React from 'react'
import Link from 'next/link'
import CardWrap from '@/components/cards/card-wrap'
import { limitWords } from '@/utils/text/textLimit'
import MainContainer from '@/components/main-container'
import StarBadge from '@/components/ui/badge/star-badge';
import { Button } from '@mui/joy';
import CourseCheckBadge from '@/components/ui/badge/course-check-badge';
import { useParams, usePathname } from 'next/navigation';
import { formatToSlug } from '@/utils/slugify';

interface AssessmentQuestion {
    correct_option: number;
    createdAt: string;
    exam_instance_id: string;
    explanation: string;
    id: number;
    label_id: string;
    option_1_image_url: string;
    option_1_text: string;
    option_2_image_url: string;
    option_2_text: string;
    option_3_image_url: string;
    option_3_text: string;
    option_4_image_url: string;
    option_4_text: string;
    question_id: string;
    question_image_url: string;
    question_number: string;
    question_text: string;
    section_id: string;
    stage_id: string;
    updatedAt: string;
}

export default function QuestionsList({ data }: { data: AssessmentQuestion[] }) {
    const [loadingId, setLoadingId] = React.useState<number | null>(null);
    const [visibleCount, setVisibleCount] = React.useState<number>(10);
    const shown = Array.isArray(data) ? data.slice(0, Math.min(visibleCount, data.length)) : [];

    const basePath= usePathname();

    const routeParams = useParams<{ locale: string; examName: string; level_id: string; year: string }>();
    const examName = routeParams?.examName;
    const levelId = routeParams?.level_id;

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

    return (
        <MainContainer maxWidth="max-w-[900px]" className='space-y-5'>
            <div className='w-full '>
                <div>
                    <div className='heading-large text-gray-900'>{examName}</div>
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
                        <div className='col-span-2 flex items-start'>
                            <div className='rounded-md subtle-background text-blue-900 px-3 md:px-6 py-2'>
                                <div className='font-semibold neutral-blueGrayLight'>{Array.isArray(data) ? data.length : 0}</div>
                                <div className='text-xs neutral-blueGrayLight'>Questions</div>
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

                    {shown?.map((item,index) => {
                        const plain = item.question_text?.replace(/<[^>]*>/g, "") || "";
                        const snippet = limitWords(plain, 25);
                        return (
                            <Link key={index} href={`${basePath}/${formatToSlug(limitWords(item.question_text, 4))}-${item.id}`} onClick={() => setLoadingId(item.id)}>
                                <CardWrap cursor="pointer" padding={2}>
                                    <div className={`flex flex-col gap-2 ${loadingId === item.id ? "opacity-80" : ""}`}>
                                        <div className='flex justify-between items-center'>
                                            <div className="body-medium font-semibold col-span-5">
                                                Question {item.question_number}
                                            </div>
                                            <StarBadge size={28} color="#00a251" />
                                        </div>
                                        <div className="flex md:flex-row flex-col justify-between items-start gap-4">
                                            <div className="flex-1 body-medium text-gray-700">
                                                {snippet}
                                            </div>

                                            <div className="w-full md:w-auto flex justify-end gap-2">
                                                <Button variant="outlined" className="shrink-0">
                                                    {loadingId === item.id ? <div className="text-brand font-semibold flex items-center gap-2 shrink-0">
                                                        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
                                                        Loading…
                                                    </div> : "View Options & Answer →"}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </CardWrap>
                            </Link>
                        );
                    })}
                </div>
            </div>
            {Array.isArray(data) && visibleCount < data.length && (
                <div className="mt-6 flex items-center justify-center">
                    <button
                        type="button"
                        className="px-4 py-2 rounded-md border border-gray-300 text-sm font-semibold hover:bg-gray-50"
                        onClick={() => setVisibleCount((c) => Math.min(c + 10, data.length))}
                    >
                        Show more
                    </button>
                </div>
            )}
        </MainContainer>
    );
}

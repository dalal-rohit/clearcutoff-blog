
"use client";
import React from 'react'
import Link from 'next/link'
import CardWrap from '@/components/cards/card-wrap'
import { limitWords } from '@/utils/text/textLimit'
import MainContainer from '@/components/main-container'

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
    return (
        <MainContainer maxWidth="max-w-[900px]">

            <div className="grid grid-cols-1 gap-4">
                {shown?.map((item) => {
                    const plain = item.question_text?.replace(/<[^>]*>/g, "") || "";
                    const snippet = limitWords(plain, 25);
                    return (
                        <Link key={item.id} href={`questions/question-${item.id}`} onClick={() => setLoadingId(item.id)}>
                            <CardWrap cursor="pointer">
                                <div className={`flex flex-col gap-2 ${loadingId === item.id ? "opacity-80" : ""}`}>
                                    <div className="heading-medium font-semibold">
                                        {item.id ? `Q${item.id}` : `Q${item.question_number}`}
                                    </div>
                                    <div className="body-medium text-gray-700">{snippet}</div>
                                    {loadingId === item.id ? (
                                        <div className="text-brand font-semibold flex items-center gap-2">
                                            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
                                            Loading…
                                        </div>
                                    ) : (
                                        <div className="text-brand font-semibold">View details →</div>
                                    )}
                                </div>
                            </CardWrap>
                        </Link>
                    );
                })}
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

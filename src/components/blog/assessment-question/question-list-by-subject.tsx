"use client";
import React from 'react'
import { limitWords } from '@/utils/text/textLimit';
import { formatToSlug } from '@/utils/slugify';
import QuestionCard from '../ui/question-card';
import { Button } from '@mui/joy';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { capitalizeFirst } from '@/utils/text/textFormat';

interface Question {
    id: number;
    question_text: string;
    slug: string;
    chapter?: { name?: string };
    topic?: { name?: string };
}

interface Chapter {
    chapterName: string;
    slug: string;
    questions: Question[];
}

export default function QuestionListBySubject({ data }: { data: Chapter[] }) {
    const [loadingId, setLoadingId] = React.useState<number | null>(null);
    const params = useParams<{ subject_id: string | string[] }>();
    const pathname = usePathname();
    const subjectIdParam = params?.subject_id;
    const subjectId = Array.isArray(subjectIdParam) ? subjectIdParam[0] : (subjectIdParam ?? "");

    return (
        <div className="grid grid-cols-1 gap-4">


            {data.map((item: Chapter, index: number) => {
                return (
                    <div key={index} className='bg-white p-4 rounded space-y-5'>
                        <div className='space-y-1'>
                            <div className='body-large font-normal text-[#768EA7] '>
                                Chapter {index + 1}
                            </div>
                            <div className='heading-small'>
                                {item.chapterName}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4">

                            {item.questions.map((question: Question, index: number) => {
                                    const plain = question.question_text?.replace(/<[^>]*>/g, "") || "";
                                const snippet = limitWords(plain, 25);
                                const slug= question?.slug ? question.slug : formatToSlug(limitWords(question.question_text, 4));
                                
                                return (
                                    <QuestionCard
                                        key={index}
                                        q_no={index + 1}
                                        chapter_name={question.chapter?.name}
                                        topic_name={question.topic?.name}
                                        index={index}
                                        setLoadingId={setLoadingId}
                                        path={`/question/${slug}-${question.id}`}
                                        onClick={() => setLoadingId(question.id)}
                                        questionText={snippet}
                                        active={loadingId === question.id}
                                        source={capitalizeFirst(subjectId)}
                                    />
                                )
                            })}
                        </div>
                        <div className='flex justify-center'>
                            <Link href={`${pathname}/${(item.slug)}`}>
                                <Button variant="soft">View All Questions in this chapter ( {item.chapterName} )</Button>
                            </Link>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

"use client";
import React from 'react'
import { limitWords } from '@/utils/text/textLimit';
import { formatToSlug } from '@/utils/slugify';
import QuestionCard from '../ui/question-card';
import { Button } from '@mui/joy';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function QuestionListBySubject({ data }: { data: any }) {
    const [loadingId, setLoadingId] = React.useState<number | null>(null);
    const pathname = usePathname()

    return (
        <div className="grid grid-cols-1 gap-4">


            {data.map((item: any, index: any) => {
                return (
                    <div key={index} className='bg-white p-4 rounded'>
                        <div className='mb-2'>
                            <div>
                                
                            </div>
                            <div>
                                <div>
                                    Chapter {index + 1}
                                </div>
                                <div className='heading-small'>
                                    {item.chapterName}
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4">

                            {item.questions.map((question, index) => {
                                const plain = question.question_text?.replace(/<[^>]*>/g, "") || "";
                                const snippet = limitWords(plain, 25);
                                return (
                                    <QuestionCard
                                        key={index}
                                        q_no={question.question_number}
                                        index={index}
                                        setLoadingId={setLoadingId}
                                        path={`/question/${formatToSlug(limitWords(question.question_text, 4))}-${question.id}`}
                                        onClick={() => setLoadingId(question.id)}
                                        questionText={snippet}
                                        active={loadingId === question.id}
                                    />
                                )
                            })}
                        </div>
                        <div className='flex justify-center mt-4'>
                            <Link href={`${pathname}/${formatToSlug(limitWords(item.chapterName, 6))}`}>
                                <Button variant="soft">View All Questions in this chapter ( {item.chapterName} )</Button>
                            </Link>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

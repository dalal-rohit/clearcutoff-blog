import React from 'react'
import Link from 'next/link'
import CardWrap from '@/components/cards/card-wrap'
import StarBadge from '@/components/ui/badge/star-badge';
import { Button } from '@mui/joy';
import { formatToSlug } from '@/utils/slugify';
import { limitWords } from '@/utils/text/textLimit'

interface Props {
    q_no?: string;
    index?: number;
    setLoadingId?: (id: number) => void;
    path?: string;
    onClick?: () => void;
    questionText?: string;
    active?: boolean;
}

export default function QuestionCard({ q_no, index, setLoadingId, path, onClick, questionText, active = false }: Props) {
    return (
        <Link key={index} href={`${path}`} onClick={onClick}>
            <CardWrap cursor="pointer" padding={2}>
                <div className={`flex flex-col gap-2 ${active ? "opacity-80" : ""}`}>
                    <div className='flex justify-between items-center'>
                        <div className="body-medium font-semibold col-span-5">
                            Question {q_no}
                        </div>
                        <StarBadge size={28} color="#00a251" />
                    </div>
                    <div className="flex md:flex-row flex-col justify-between items-start gap-4">
                        <div className="flex-1 body-medium text-gray-700">
                            {questionText}
                        </div>

                        <div className="w-full md:w-auto flex justify-end gap-2">
                            <Button variant="outlined" className="shrink-0">
                                {active ? <div className="text-brand font-semibold flex items-center gap-2 shrink-0">
                                    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
                                    Loading…
                                </div> : "View Options & Answer →"}
                            </Button>
                        </div>
                    </div>
                </div>
            </CardWrap>
        </Link>
    )
}

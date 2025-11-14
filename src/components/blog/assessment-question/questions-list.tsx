
"use client";
import React, { useEffect } from 'react'
import Link from 'next/link'
import CardWrap from '@/components/cards/card-wrap'
import { limitWords } from '@/utils/text/textLimit'
import MainContainer from '@/components/main-container'
import StarBadge from '@/components/ui/badge/star-badge';
import { Button } from '@mui/joy';
import CourseCheckBadge from '@/components/ui/badge/course-check-badge';
import { useParams, usePathname } from 'next/navigation';
import { formatToSlug } from '@/utils/slugify';
import YearListModal from '@/components/feature/year-list-modal';
import { useLanguageStore } from '@/store/useLanguageStore';
import { isArray } from 'util';
import QuestionCard from '../ui/question-card';
import { getQuestionsByLanguage } from '@/utils/getQuestionsByLanguage';

interface AssessmentQuestion {
    correct_option: number;
    createdAt: string;
    exam_instance_id: string;
    explanation: string;
    id: number;
    language_code: string;
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
    const [allData, setAllData] = React.useState<AssessmentQuestion[]>([]);

    const { courseLanguage } = useLanguageStore();

    useEffect(() => {
        if (!data || data.length === 0) return;

        const filteredQuestions = getQuestionsByLanguage(data, courseLanguage);

        setAllData(filteredQuestions);
    }, [data, courseLanguage]);


    const shown = Array.isArray(allData) ? allData.slice(0, Math.min(visibleCount, allData.length)) : [];
    const [isOpen, setIsOpen] = React.useState(false);

    const basePath = usePathname();

    const routeParams = useParams<{ locale: string; examName: string; level_id: string; year: string, year_id: string }>();
    const examName = routeParams?.examName;
    const levelId = routeParams?.level_id;
    const yearId = routeParams?.year_id;



    return (
        <>
            <div className='space-y-2'>

                <div className="grid grid-cols-1 gap-4">

                    {shown?.map((item, index) => {
                        const plain = item.question_text?.replace(/<[^>]*>/g, "") || "";
                        const snippet = limitWords(plain, 25);
                        return (
                            <>
                                <QuestionCard
                                    key={index}
                                    q_no={index + 1}
                                    index={index}
                                    setLoadingId={setLoadingId}
                                    path={`/question/${formatToSlug(limitWords(item.question_text, 4))}-${item.id}`}
                                    onClick={() => setLoadingId(item.id)}
                                    questionText={snippet}
                                    active={loadingId === item.id}
                                />

                            </>
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
            <YearListModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
            <div className="md:hidden flex fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
                <Button className="shrink-0" onClick={() => setIsOpen(true)}>
                    Years List
                </Button>
            </div>

        </>

    );
}

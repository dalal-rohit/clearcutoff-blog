'use client'
import CustomizableHeader from '@/components/customizable-header'
import MainContainer from '@/components/main-container'
import RightArrowBox from '@/components/ui/arrows/right-arrow-box'
import StarBadge from '@/components/ui/badge/star-badge'
import NumberedShape from '@/components/ui/numbered-shape'
import { ArrowRightCircleIcon } from '@heroicons/react/16/solid'
import Link from 'next/link'
import { usePathname, useParams } from 'next/navigation'
import React from 'react'
import { formatToSlug, unFormatSlug } from '@/utils/slugify'

interface Data {
    id: number,
    stage_id: string,
    instance_id: string[],
}

export default function TestByYears({ data, examName }: { data: Data[], examName: string }) {
    const [loading, setLoading] = React.useState<boolean>(false);
    const pathname = usePathname(); // 👉 /CTET/CTET_P2
    const instanceIds = JSON.parse(data[0].instance_id.replace(/'/g, '"'));
    const params = useParams<{ locale: string, examName: string, level_id: string, year: string }>();
    const handleSelect = (item: string) => {
        console.log(item, "item")
    }

    return (
        <MainContainer maxWidth="max-w-[900px]">

            <div className='space-y-12'>
                <CustomizableHeader
                    showEyebrow={false}
                    heading={`${examName} Exam ${unFormatSlug(params?.level_id)}`}
                    highlightText={examName}
                    subheading={`${examName} exam ${data?.[0]?.stage_id} preparation with Clear Cutoff`}
                    headingColor="text-gray-900"
                    highlightColor="text-blue-500"
                    subheadingColor="text-gray-600"
                    alignment="text-center"
                    headingClasses="!mb-4"
                    headingSize="display-medium"
                />

                <div>

                    <div className='w-full px-5'>
                        <div className='heading-large'>
                            By Years
                        </div>
                        <div className='flex justify-between items-center gap-2'>
                            <div className='heading-small'>
                                Year-wise verified questions
                            </div>
                            <div className='flex items-center gap-2 text-[#00a251]'>
                                <StarBadge size={32} color="#00a251" />
                                <p>by Clear Cutoff</p>
                            </div>
                        </div>
                    </div>
                    <div className={[loading ? 'opacity-50 cursor-not-allowed' : ''].join(' ')}>
                        {instanceIds.map((item, index) => (
                            <Link href={`${pathname}/${formatToSlug(unFormatSlug(item))}`} onClick={() => setLoading(true)} key={index}>
                                <div className='flex items-center justify-between p-4 md:p-5 border-b border-gray-300'>
                                    <div className='flex items-center gap-4'>
                                        <NumberedShape number={index + 1} />
                                        <div>
                                            <div className='font-semibold text-gray-900'>Previous Year Paper {unFormatSlug(item)}</div>
                                            <div className='text-sm text-gray-500'>150 questions & detailed answers</div>
                                        </div>
                                    </div>
                                    <RightArrowBox size={30} onClick={() => setLoading(true)} />

                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

        </MainContainer>
    )
}

'use client'
import CustomizableHeader from '@/components/customizable-header'
import MainContainer from '@/components/main-container'
import StarBadge from '@/components/ui/badge/star-badge'
import { usePathname, useParams } from 'next/navigation'
import React from 'react'
import { formatToSlug, unFormatSlug } from '@/utils/slugify'
import YearsList from '../ui/years-list'

interface Data {
    id: number,
    stage_id: string,
    instance_id: string[],
}

export default function TestByYears({ data, examName }: { data: Data[], examName: string }) {
    
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
                   <YearsList data={data} />    
                </div>
            </div>

        </MainContainer>
    )
}

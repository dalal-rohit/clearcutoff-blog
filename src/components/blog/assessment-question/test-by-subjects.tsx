'use client'
import CustomizableHeader from '@/components/customizable-header'
import MainContainer from '@/components/main-container'
import StarBadge from '@/components/ui/badge/star-badge'
import { usePathname, useParams } from 'next/navigation'
import React from 'react'
import { formatToSlug, unFormatSlug } from '@/utils/slugify'
import YearsList from '../ui/years-list'
import SubjectsList from '../ui/subjects-list'

interface Data {
    id: number,
    stage_id: string,
    instance_id: string[],
    sections: {
        name: string,
        url: string
    }
}

export default function TestBySubjects({ data, examName }: { data: Data[], examName: string }) {

    const params = useParams<{ locale: string, examName: string, level_id: string, year: string }>();
    const handleSelect = (item: string) => {
    }

    const pathname = usePathname()

    return (


        <div className='space-y-5'>

            <div className='w-full px-5'>
                <div className='heading-large'>
                    By Subjects
                </div>
                <div className='flex justify-between items-center gap-2'>
                    <div className='heading-small'>
                        Subject-wise verified questions
                    </div>
                    <div className='flex items-center gap-2 text-[#00a251]'>
                        <StarBadge size={32} color="#00a251" />
                        <p>by Clear Cutoff</p>
                    </div>
                </div>
            </div>

            <div className='bg-white'>
                {data?.length > 0 && (
                    data.map((item, index) => (
                        <SubjectsList key={index} index={index + 1} title={item?.sections?.name} pathname={`${pathname}/subject/${formatToSlug(item?.sections?.name)}`} />
                    ))
                )}
            </div>
        </div>

    )
}

'use client'

import React, { useEffect } from 'react'
import CustomizableHeader from '@/components/customizable-header'
import CardWrap from '@/components/cards/card-wrap'
import MainContainer from '@/components/main-container'
import { useRouter, usePathname } from 'next/navigation'

type NavItem = {
    id: number | string
    ent_id: string
    exam_id: string
    parent_id: string
    name: string
}

export default function ExamLevelsSection({ data }: { data?: NavItem[] }) {
    const [trail, setTrail] = React.useState<NavItem[]>([])
    const router = useRouter()
    const pathname = usePathname()
    const [loading, setLoading] = React.useState<boolean>(false);

    const items = data ?? []
    const roots = items.filter((i) => !i.parent_id)
    const last = trail.length ? trail[trail.length - 1] : null
    const visible = last ? items.filter((i) => i.parent_id === last.ent_id) : roots

    const handleSelect = (item: NavItem) => {
        setTrail((t) => [...t, item])
    }

    useEffect(() => {
        if (visible.length === 0) {
            setLoading(true)
            const newUrl = `${pathname}/${trail[trail.length - 1].name}`
            router.push(newUrl)
        } else {
            setLoading(false)
        }
    }, [trail, pathname, router, visible.length])

    const handleBack = () => setTrail((t) => t.slice(0, -1))
    const handleReset = () => setTrail([])
    const nextHints = ['Select Paper', 'Select Subject', 'Select Language']
    const nextHint = nextHints[Math.min(trail.length, nextHints.length - 1)]

    return (
        <MainContainer maxWidth="max-w-[900px]">
            <div className='space-y-12'>
                <CustomizableHeader
                    eyebrow={'Select Subjects'}
                    heading={'Select Subjects'}
                    highlightText={'Subjects'}
                    subheading={'Select the subjects you want. You can update later!'}
                    headingColor="text-gray-900"
                    highlightColor="text-blue-500"
                    subheadingColor="text-gray-600"
                    alignment="text-center"
                    headingClasses="!mb-4"
                    headingSize="display-medium"
                />
                <div>
                    {trail.length > 0 && (
                        <div className='mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between'>
                            <div className='text-sm text-gray-700'>
                                <span className='font-semibold mr-1'>Selected:</span>
                                <span>
                                    {trail.map((t, idx) => (
                                        <span key={t.ent_id}>
                                            {idx > 0 && <span className='mx-1'>-&gt;</span>}
                                            {t.name}
                                        </span>
                                    ))}
                                </span>
                            </div>
                            <div className='flex items-center gap-3'>
                                <span className='hidden md:inline text-xs text-gray-500'>Next: {nextHint}</span>
                                <button className='text-blue-600 font-semibold' onClick={handleBack}>
                                    ← Back
                                </button>
                                <button className='text-gray-500 hover:text-gray-700' onClick={handleReset}>
                                    Reset
                                </button>
                            </div>
                        </div>
                    )}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        {visible.map((item) => (
                            <CardWrap key={item.id} cursor="pointer" padding={1.3} className='!border-2 !border-gray-200 !rounded-lg' onClick={() => handleSelect(item)}>
                                <div className='flex items-center justify-between'>
                                    <div>{item.name}</div>
                                    <div className='dot w-4 h-4 rounded-full bg-brand'></div>
                                </div>
                            </CardWrap>
                        ))}
                        {loading && (
                            <div className="col-span-1 md:col-span-2 flex items-center justify-center py-6" role="status" aria-live="polite">
                                <div className="flex items-center gap-3 text-gray-600">
                                    <span className="relative flex h-9 w-9">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-9 w-9 bg-blue-500"></span>
                                    </span>
                                    <span className="font-medium">Loading levels…</span>
                                </div>
                            </div>
                        )}
                    </div>
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
            </div>
        </MainContainer >
    )
}

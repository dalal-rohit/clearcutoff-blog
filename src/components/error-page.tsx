import React from 'react'
import Image from 'next/image'
import MainContainer from '@/components/main-container'
import { Button } from '@mui/joy';

interface ErrorPageProps {
    error?: Error & { digest?: string };
    reset?: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
    return (
        <MainContainer maxWidth="max-w-[1050px]" className='h-full w-full'>
            <div className='flex flex-col items-center gap-20 h-full w-full'>
                <div className='flex items-center justify-center'>
                    <Image
                        src="/logo/clear_cutoff_logo.png"
                        alt="Clear Cutoff"
                        width={220}
                        height={48}
                        className="h-auto w-[180px] md:w-[220px]"
                        priority
                    />
                </div>
                <div className='grid w-full grid-cols-1 md:grid-cols-5 gap-10 md:gap-20 py-10'>
                    <div className='md:col-span-3 flex justify-center'>
                        <Image
                            src="/logo/404-error.svg"
                            alt="Clear Cutoff"
                            width={626}
                            height={370}
                            className="h-auto max-w-[626px] w-full"
                            priority
                        />
                    </div>
                    <div className='md:col-span-2 flex flex-col items-center justify-center gap-10 text-center'>
                        <div className='flex w-full flex-col items-center justify-center gap-10'>
                            <div className='text-center'>
                                <h1 className='display-xlarge text-brand'>404</h1>

                            </div>
                            <div className='text-center flex flex-col gap-4'>
                                <h2 className='heading-large'>Page Not Found</h2>
                                <p className='body-medium'>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <Button variant="outlined" color="primary" onClick={reset}>Back to Home</Button>
                                <Button variant="outlined" color="primary" onClick={reset}>Back to Home</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainContainer>
    )
}

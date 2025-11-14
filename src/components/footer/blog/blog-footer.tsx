"use client"
import MainContainer from '@/components/main-container'
import React from 'react'
import PhoneIcon from '@/components/ui/icons/phone-icon'
import EMailIcon from '@/components/ui/icons/email-icon'
import WhatsappIcon from '@/components/ui/icons/whatsapp-icon'
import { TelegramIcon } from '@/components/ui/icons/telegram-icon'
import { YouTubeIcon } from '@/components/ui/icons/youtube-icon'
import { FacebookIcon } from '@/components/ui/icons/facebook-icon'
import { InstagramIcon } from '@/components/ui/icons/instagram-icon'
import { LinkedInIcon } from '@/components/ui/icons/linked-in-icon'
import { LinksList } from '../links-list'
import packageJson from "../../../../package.json";
import useIsMobile from '@/hooks/isMobile'

export default function BlogFooter() {

    const isMobile = useIsMobile()

    const contactLinks = [
        {
            icon: <PhoneIcon />,
            href: "tel:7219798599",
            label: isMobile ? "Phone" : "7219798599",
        },
        {
            icon: <EMailIcon />,
            href: "mailto:hi@clearcutoff.in",
            label: isMobile ? "Email" : "hi@clearcutoff.in",
        },
        {
            icon: <WhatsappIcon size={20} />,
            href: "https://wa.me/7219798599",
            label: isMobile ? "Whatsapp" : "Whatsapp",
        },
        // {
        //     icon: <TelegramIcon size={20} />,
        //     href: "/",
        //     label: isMobile ? "Telegram" : "Telegram",
        // },
    ]

    const pagesLinks = [
        {
            icon: null,
            href: "https://www.clearcutoff.in/privacy-policy",
            label: "Policy",
        },
        {
            icon: null,
            href: "https://www.clearcutoff.in/terms-and-conditions",
            label: "Terms",
        },
        {
            icon: null,
            href: "https://www.clearcutoff.in/refund-policy",
            label: "Refund",
        },
        {
            icon: null,
            href: "https://www.clearcutoff.in/contact-us",
            label: "Contact",
        }
    ]

    const socialLinks = [
        {
            icon: <InstagramIcon />,
            href: "https://www.instagram.com/clearcutoff_teaching",
            label: null
        },
        {
            icon: <FacebookIcon />,
            href: "https://www.facebook.com/people/Clear-Cutoff-Teaching/61573525911878",
            label: null
        },
        {
            icon: <LinkedInIcon />,
            href: "https://www.linkedin.com/company/clear-cutoff",
            label: null
        },
        // {
        //     icon: <YouTubeIcon size={24} />,
        //     href: "https://cc-teaching-content-ind.s3.dualstack.ap-south-1.amazonaws.com/images/youtube.svg",
        //     label: null
        // },
    ]


    return (
        <div className='bg-brand-dark max-h-[130px] min-h-[50px]'>
            <MainContainer padding='px-4 py-2' bgColor='bg-transparent text-white' maxWidth='max-w-[1400px] '>
                <div className='flex flex-col'>
                    <div className='flex  justify-center items-center gap-6 md:gap-15 py-1'>
                        {contactLinks.map((link, index) => (
                            <LinksList alignment={{ gap: "8px" }} key={index} icon={link.icon} href={link.href} label={link.label} />
                        ))}
                    </div>
                    <div className='flex md:flex-row flex-col justify-between items-center gap-1 py-1'>
                        <div className='md:order-3 order-1 flex items-center gap-4'>
                            {socialLinks.map((link, index) => (
                                <LinksList key={index} icon={link.icon} href={link.href} label={link.label} />
                            ))}

                        </div>
                        <div className='md:order-2 order-2 flex gap-6'>
                            {pagesLinks.map((link, index) => (
                                <LinksList font='body-large !font-medium' key={index} icon={link.icon} href={link.href} label={link.label} />
                            ))}
                        </div>
                        <div className='md:order-1 order-3'>
                            <p className='body-small !font-normal'>@ {new Date().getFullYear()} {packageJson?.name}. All rights reserved!</p>
                        </div>
                    </div>
                </div>
            </MainContainer>
        </div>
    )
}

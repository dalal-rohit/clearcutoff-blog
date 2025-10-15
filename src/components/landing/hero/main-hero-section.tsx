"use client";
import React from "react";
import MainContainer from "@/components/main-container";
import Image from "next/image";
import MainHeroContent from "./main-hero-content";
// import { useGlobalDataStore } from "@/store/useGlobalDataStore";

export default function MainHeroSection() {
  // const { hero } = useGlobalDataStore();

  return (
    <MainContainer
      maxWidth="max-w-[1050px] pt-14"
      className="px-4 sm:px-6 md:px-10 lg:px-0
"
    >
      <div className="grid grid-cols-12">
        <div className="space-y-6 col-span-12 md:col-span-7 order-2 md:order-1">
          <MainHeroContent />
        </div>
        <div className="col-span-12 md:col-span-5 order-1 md:order-2">
          <div className="relative z-10 flex justify-center lg:justify-end">
            <Image
              src="https://cc-teaching-content-ind.s3.dualstack.ap-south-1.amazonaws.com/images/main_hero_icon_mobile.webp"
              alt={"Educational illustration"}
              width={370}
              height={370}
              className="rounded-lg"
              priority
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
    </MainContainer>
  );
}

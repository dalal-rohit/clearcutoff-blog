import React from "react";
import MainContainer from "@/components/main-container";
import Image from "next/image";
import CustomizableHeader from "@/components/customizable-header";

export default function MainHeroSection() {
  return (
    <MainContainer>
      <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-7 order-2 md:order-1 heading-xlarge font-semibold">
          <CustomizableHeader
            eyebrow="Limited Time Offer"
            showEyebrow={false}
            heading={"Clear HTET 2024 exam with us!"}
            highlightText={"HTET 2024"}
            subheading={
              "Get started on journey of success with our all-in-one Course and Test Series!"
            }
            headingColor="text-gray-900"
            highlightColor="text-blue-500"
            subheadingColor="text-gray-600"
            alignment="md:text-left text-center"
            eyebrowWeight="bold"
            spacing="normal"
            headingClasses="!mb-4"
            headingSize="display-medium"
          />
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

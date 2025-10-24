"use client";
import React from "react";
import Box from "@mui/joy/Box";
import FAQs from "../frames/faqs";
import Image from "next/image";
import { faqsSection } from "@/data/DummyData";
import { useLang } from "@/hooks/useLang";
import CustomizableHeader from "@/components/customizable-header";
import { useGlobalDataStore } from "@/store/blog/useGlobalDataStore";

export default function FAQsSection() {
  const { faqs } = useGlobalDataStore();

  if (!faqs) return null;

  return (
    <>
      <div
        id="faqs"
        className="
          px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32
          py-6 sm:py-10 md:py-14
          max-w-[1400px] mx-auto w-full
        "
      >
        <div className="space-y-[32px] md:space-y-[48px]">
          <CustomizableHeader
            eyebrow={faqs.eyebrow}
            heading={faqs?.heading}
            // highlightText={faqs?.highlightText}
            subheading={faqs?.subheading}
            headingColor="text-gray-900"
            highlightColor="text-blue-500"
            subheadingColor="text-gray-600"
            alignment="text-center"
            headingClasses="!mb-4"
            headingSize="display-medium"
          />

          <Box className="w-full flex flex-col items-center gap-[26px]">
            <FAQs categories={faqs?.categories} faqs={faqs?.faqs} />
          </Box>
        </div>
      </div>
    </>
  );
}

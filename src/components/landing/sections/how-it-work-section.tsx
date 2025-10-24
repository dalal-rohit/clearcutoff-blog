"use client";
import CustomizableHeader from "@/components/customizable-header";
import { Box } from "@mui/joy";
import React from "react";
import HowItWorkFram from "../frames/how-it-work-fram";
import { useGlobalDataStore } from "@/store/blog/useGlobalDataStore";

export default function HowItWorkSection() {

  const { global } = useGlobalDataStore();

  const how_it_works = global?.how_it_works;

  if (!how_it_works) return null;

  return (
    <>
      <div
        id="howitworks"
        className="
        px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32
        py-6 sm:py-6 md:py-8
        max-w-[1400px] mx-auto w-full
      "
      >
        <div className="space-y-[32px] md:space-y-[48px] flex flex-col justify-center items-center">
          <CustomizableHeader
            eyebrow={how_it_works.eyebrow}
            heading={how_it_works.heading}
            // highlightText={how_it_works.highlight[0].text || ""}
            subheading={how_it_works.subheading}
            headingColor="text-gray-900"
            highlightColor="text-blue-500"
            headingSize="display-medium"
            subheadingColor="text-gray-600"
            alignment="text-center"
            headingClasses="!mb-4"
          />
          <Box className="flex flex-col max-w-[850px] px-2 gap-[32px] md:gap-[56px]">
            {how_it_works?.how_it_works?.map((item, ide) => (
              <HowItWorkFram key={ide} heading={item.heading} headingHighlight={''} subheading={item.subheading} description={item.description} icon={item.image} buttonText={item.btn_text} />
            ))}
          </Box>
        </div>
      </div>
    </>
  );
}

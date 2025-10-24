// src/app/components/sections/comparison-section.tsx
// THIS FILE IS ALREADY CORRECT AND NEEDS NO CHANGES
"use client";
import React from "react";
import { Box } from "@mui/joy";
import ComparisonTable from "../tables/comparison-table";
import CustomizableHeader from "@/components/customizable-header";
import { useGlobalDataStore } from "@/store/blog/useGlobalDataStore";

export default function ComparisonSection() {
  const { global } = useGlobalDataStore();

  const comparison_table = global?.comparison_table;

  if (!comparison_table) return null;

  return (
    <div
      id="comparison"
      className="
    px-2 sm:px-2 md:px-10 lg:px-16 xl:px-24 2xl:px-32
    py-6 sm:py-6 md:py-8
    max-w-[1400px] mx-auto w-full
  "
    >
      <div className="space-y-[32px] md:space-y-[48px]">
        <CustomizableHeader
          eyebrow={comparison_table?.eyebrow}
          heading={comparison_table?.heading}
          // highlightText={comparison_table.highlightText[currentLang]}
          subheading={comparison_table.subheading}
          headingColor="text-gray-900"
          highlightColor="text-blue-500"
          subheadingColor="surface-text-gray-normaltext-red-200"
          alignment="text-center"
          headingClasses="!mb-4"
        />
        <Box className="flex  overflow-x-auto justify-center items-center w-full gap-[56px]">
          {/* Pass the data, it will be typed correctly */}
          <ComparisonTable
            comparison={comparison_table.comparison}
            coaching_center={comparison_table.coaching_center}
            clear_cutoff={comparison_table.clear_cutoff}
          />
        </Box>
      </div>
    </div>
  );
}

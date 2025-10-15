"use client";

import React from "react";
import Box from "@mui/joy/Box";
import FeatureCardFrame from "../frames/feature-card-frame";

import CustomizableHeader from "@/components/customizable-header";
import { useGlobalDataStore } from "@/store/useGlobalDataStore";
interface Feature {
  id: string;
  heading: string;
  headingHighlight: string[];
  subheading: string;
  icon?: string | { url: string | null; alt: string | null } | null;
}

interface FeatureSection {
  id: string;
  eyebrow: string;
  heading: string;
  headingHighlight: string[];
  subheading: string;
  feature: Feature[];
}

export default function FeatureSection() {
  const { features } = useGlobalDataStore();

  if (!features) return null; // ✅ prevents crash

  return (
    <Box
      display="grid"
      gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }}
      gap={4}
      alignItems="center"
      className="
          px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32
          py-6 sm:py-6 md:py-8
          max-w-[1400px] mx-auto w-full
        "
    >
      <CustomizableHeader
        eyebrow={features.eyebrow}
        heading={features.heading}
        // highlightText={features.highlight[0].text || ""}
        subheading={features.subheading}
        headingColor="text-gray-900"
        highlightColor="text-blue-500"
        subheadingColor="text-gray-600"
        alignment="md:text-left text-center"
        spacing="normal"
        headingSize="display-medium"
        headingClasses="!mb-4"
        subheadingClasses="heading-small"
      />
      <Box className="flex flex-col gap-4">
        {features?.features?.map((item, ide) => (
          <FeatureCardFrame
            key={ide}
            heading={item.heading}
            headingHighlight={item.description}
            subheading={item.description}
            icon={item.image ?? null}
          />
        ))}
      </Box>
    </Box>
  );
}

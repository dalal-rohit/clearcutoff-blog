import CustomizableHeader from "@/components/customizable-header";
import React from "react";
import HeroButtonsGroup from "./hero-buttons-group";
import { useGlobalDataStore } from "@/store/useGlobalDataStore";

export default function MainHeroContent() {
      const { hero } = useGlobalDataStore();
    
  return (
    <>
    
      <CustomizableHeader
        eyebrow="Limited Time Offer"
        showEyebrow={false}
        heading={hero.heading || "Clear HTET 2024 exam with us!"}
        highlightText={"HTET 2024"}
        subheading={hero.subheading || "Learn how to prepare for the HTET 2024 exam with our expert guidance."}
        headingColor="text-gray-900"
        highlightColor="text-blue-500"
        subheadingColor="text-gray-600"
        alignment="md:text-left text-center"
        eyebrowWeight="bold"
        spacing="normal"
        headingClasses="!mb-4"
        headingSize="display-medium"
      />
      <HeroButtonsGroup />
    </>
  );
}

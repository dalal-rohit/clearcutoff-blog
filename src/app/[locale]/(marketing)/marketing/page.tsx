import CarouselSection from "@/components/landing/carousel-section";
import MainHeroSection from "@/components/landing/hero/main-hero-section";
import ComparisonSection from "@/components/landing/sections/comparison-section";
import FeatureSection from "@/components/landing/sections/feature-section";
import HowItWorkSection from "@/components/landing/sections/how-it-work-section";
import React from "react";

export default function page() {
  return (
    <>
      {/* <BreadcrumbNav /> */}
      <MainHeroSection />
      <CarouselSection />
      <FeatureSection />
      <HowItWorkSection />
      <ComparisonSection />
    </>
  );
}

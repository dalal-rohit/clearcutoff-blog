import CarouselSection from "@/components/landing/carousel-section";
import MainHeroSection from "@/components/landing/hero/main-hero-section";
import FeatureSection from "@/components/landing/sections/feature-section";
import React from "react";

export default function page() {
  return (
    <>
      {/* <BreadcrumbNav /> */}
      <MainHeroSection />
      <CarouselSection />
      <FeatureSection />
    </>
  );
}

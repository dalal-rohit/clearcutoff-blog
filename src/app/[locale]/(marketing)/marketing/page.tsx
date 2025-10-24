import CarouselSection from "@/components/landing/carousel-section";
import Footer from "@/components/landing/footer/footer";
import MainHeroSection from "@/components/landing/hero/main-hero-section";
import ComparisonSection from "@/components/landing/sections/comparison-section";
import FAQsSection from "@/components/landing/sections/faqs-sections";
import FeatureSection from "@/components/landing/sections/feature-section";
import HowItWorkSection from "@/components/landing/sections/how-it-work-section";
import ReviewSection from "@/components/landing/sections/review-section";
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
      <ReviewSection />
      <FAQsSection />
      <Footer />
    </>
  );
}

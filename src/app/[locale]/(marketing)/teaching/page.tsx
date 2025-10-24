import CarouselSection from "@/components/landing/carousel-section";
import Footer from "@/components/landing/footer/footer";
import ComparisonSection from "@/components/landing/sections/comparison-section";
import FAQsSection from "@/components/landing/sections/faqs-sections";
import FeatureSection from "@/components/landing/sections/feature-section";
import HowItWorkSection from "@/components/landing/sections/how-it-work-section";
import ReviewSection from "@/components/landing/sections/review-section";
import { getBreadcrumbSchema } from "@/utils/get-breadcrumb-schema";
import React from "react";
import LandingExamCardsSection from "@/components/landing/landing-exam-cards";

export default async function page({ params }: { params: { locale: string } }) {
  const locale = params?.locale ?? "en";
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/courses?locale=${locale}`,
    { cache: "no-store" }
  );
  const data = await res.json();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const homeUrl = `${siteUrl}/${locale}`.replace(/\/+/g, "");
  const examsUrl = `${homeUrl}/exam`;
  const pageTitle = (data?.seoTitle as string) || "Teaching Exams";

  const breadcrumbLd = getBreadcrumbSchema([
    { name: "Exam", url: homeUrl },
    { name: pageTitle, url: examsUrl },
  ]);

  return (
    <>
      {/* <BreadcrumbNav /> */}
      {/* <MainHeroSection /> */}
      <LandingExamCardsSection data={data?.docs} />

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

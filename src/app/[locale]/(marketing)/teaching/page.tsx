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
import { Page } from "@/types/landing/page";

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const locale = params?.locale ?? "en";
  const resPage = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/pages?where[slug][equals]=teaching`,
    { cache: "no-store" }
  );

  if (!resPage.ok) {
    throw new Error("Failed to fetch page data");
  }

  const dataPage = await resPage.json();
  const page = dataPage.docs[0] as Page;

  const title = (page?.seo_title as string) || "Teaching Exams";
  const description = (page?.seo_description as string) || "Explore Complete Courses & Test Series for Teaching Exams and get started for FREE.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL || ""}/${locale}/exam`,
    },
  };
}

export default async function page({ params }: { params: { locale: string } }) {
  const locale = params?.locale ?? "en";
  const resCourses = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/courses?locale=${locale}`,
    { cache: "no-store" }
  );

  const resPage = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/pages?where[slug][equals]=teaching`,
    { cache: "no-store" }
  );

  if (!resCourses.ok) {
    throw new Error("Failed to fetch courses data");
  }

  const dataCourses = await resCourses.json();
  const page = dataCourses.docs[0] as Page;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const homeUrl = `${siteUrl}/${locale}`.replace(/\/+/g, "");
  const examsUrl = `${homeUrl}/exam`;
  const pageTitle = (page?.seo_title as string) || "Teaching Exams";

  const breadcrumbLd = getBreadcrumbSchema([
    { name: "Exam", url: homeUrl },
    { name: pageTitle, url: examsUrl },
  ]);

  return (
    <>
      {/* <BreadcrumbNav /> */}
      {/* <MainHeroSection /> */}
      <LandingExamCardsSection data={dataCourses?.docs} />

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

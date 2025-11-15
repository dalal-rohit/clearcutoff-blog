import CarouselSection from "@/components/landing/carousel-section";
import Footer from "@/components/landing/footer/footer";
import MainHeroSection from "@/components/landing/hero/main-hero-section";
import ComparisonSection from "@/components/landing/sections/comparison-section";
import FAQsSection from "@/components/landing/sections/faqs-sections";
import FeatureSection from "@/components/landing/sections/feature-section";
import HowItWorkSection from "@/components/landing/sections/how-it-work-section";
import ReviewSection from "@/components/landing/sections/review-section";
import React from "react";
import { Page } from "@/types/landing/page";
import RegisterModal from "@/components/auth/register-modal";

// export async function generateMetadata({ params }: { params: { locale: string } }) {

//   const locale = await params.locale

//   const resPage = await fetch(
//     `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/pages?where[slug][equals]=landing`,
//     { cache: "no-store" }
//   );

//   if (!resPage.ok) {
//     throw new Error("Failed to fetch page data");
//   }

//   const dataPage = await resPage.json();
//   const page = dataPage.docs[0] as Page;

//   const title = (page?.seo_title as string) || "Teaching Exams";
//   const description = (page?.seo_description as string) || "Explore Complete Courses & Test Series for Teaching Exams and get started for FREE.";

//   return {
//     title,
//     description,
//     openGraph: {
//       title,
//       description,
//       type: "website",
//     },
//     alternates: {
//       canonical: `${process.env.NEXT_PUBLIC_SITE_URL || ""}/${locale}/exam`,
//     },
//   };
// }

export default async function page({ params }: { params: { locale: string } }) {
  const locale = await params.locale

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/pages?where[slug][equals]=landing`,
    { cache: "no-store" }
  );

  if (!res.ok) {

    throw new Error("Failed to fetch courses data");
  }

  const data = await res.json();
  const page = data.docs[0];
  return (
    <>
      {/* <BreadcrumbNav /> */}
      {
        page.hero.enabled && (
          <MainHeroSection />
        )
      }
      {
        page.logoCarousel.enabled && (
          <CarouselSection />
        )
      }
      {
        page.features.enabled && (
          <FeatureSection />
        )
      }
      {
        page.how_it_works.enabled && (
          <HowItWorkSection />
        )
      }
      {
        page.comparison_table.enabled && (
          <ComparisonSection />
        )
      }
      {
        page.reviews.enabled && (
          <ReviewSection />
        )
      }
      {
        page.faqs.enabled && (
          <FAQsSection />
        )
      }
      <Footer />

      {/* <RegisterModal /> */}

    </>
  );
}

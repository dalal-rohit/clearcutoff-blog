import CountdownBanner from "@/components/banner/countdownbanner";
import Header from "@/components/blog/header";
import BlogThemeProvider from "@/components/providers/blog-theme-provider";
import React, { ReactNode } from "react";

interface MarketingLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>; // 👈 async, so treat as promise
}
// async function getGlobalData(locale: string) {
//   const [globalData, reviewsRes, faqRes] = await Promise.all([
//     fetch(
//       `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/globals/global-sections?locale=${locale}`,
//       { cache: "no-store" }
//     ),
//     fetch(
//       `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/globals/reviews?locale=${locale}`,
//       { cache: "no-store" }
//     ),
//     fetch(
//       `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/globals/faqs?locale=${locale}`,
//       { cache: "no-store" }
//     ),
//   ]);

//   const [global, reviews, faqs] = await Promise.all([
//     globalData.json(),
//     reviewsRes.json(),
//     faqRes.json(),
//   ]);

//   return { global, reviews, faqs };
// }

export default async function MarketingLayout({
  children,
  params,
}: MarketingLayoutProps) {
  const { locale } = await params; // ✅ await before using

  // const globalData = await getGlobalData(locale);

  return (
    <BlogThemeProvider>
      <div className="flex flex-col min-h-screen">
        <CountdownBanner message="Flash Sale Ends In" />
        <Header />
        
        {/* Main Layout (sidebars fixed, main scrolls) */}
        <div className="flex flex-1 mx-auto w-full relative">
          {/* Left Sidebar (fixed) */}

          {/* Main Content (scrolls independently) */}
          <main className="flex-1  overflow-y-auto">{children}</main>

          {/* Right Sidebar (fixed) */}
        </div>
      </div>
    </BlogThemeProvider>
  );
}

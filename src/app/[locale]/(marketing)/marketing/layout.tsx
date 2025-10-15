import FlashSaleTimerBanner from "@/components/blog/flashsale-timer-banner";
import Header from "@/components/blog/header";
import BlogThemeProvider from "@/components/providers/blog-theme-provider";
import React, { ReactNode } from "react";
interface MarketingLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>; // 👈 async, so treat as promise
}
async function getGlobalData(locale: string) {
  const [reviewsRes] = await Promise.all([
    fetch(
      `${process.env.NEXT_PUBLIC_PAYLOAD_URL}//api/globals/global-sections?locale=${locale}`,
      { cache: "no-store" }
    ),
    // fetch(
    //   `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/globals/comparison-table?locale=${locale}`,
    //   { cache: "no-store" }
    // ),
  ]);

  const [reviews] = await Promise.all([
    reviewsRes.json(),
    // tableRes.json(),
  ]);

  return { reviews };
}

export default async function MarketingLayout({
  children,
  params,
}: MarketingLayoutProps) {
  const { locale } = await params; // ✅ await before using

  const globalData = await getGlobalData(locale);
  return (
    <BlogThemeProvider data={globalData.reviews}>
      <div className="flex flex-col min-h-screen">
        <FlashSaleTimerBanner message="Flash Sale Ends In" />
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

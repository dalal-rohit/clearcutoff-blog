import FlashSaleTimerBanner from "@/components/banner/flashsale-timer-banner";
import Header from "@/components/blog/header";
import React from "react";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <FlashSaleTimerBanner message="Flash Sale Ends In" />
      <Header />
      {/* Main Layout (sidebars fixed, main scrolls) */}
      <div className="flex flex-1 mx-auto w-full relative">
        {/* Left Sidebar (fixed) */}
        {/* <LeftSidebar /> */}

        {/* Main Content (scrolls independently) */}
        <main className="flex-1 overflow-y-auto">
            {children}
        </main>

        {/* Right Sidebar (fixed) */}
        {/* <RightSidebar /> */}
      </div>
    </div>
  );
}

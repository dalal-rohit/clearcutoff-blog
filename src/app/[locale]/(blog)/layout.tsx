import FlashSaleTimerBanner from "@/components/blog/flashsale-timer-banner";
import Header from "@/components/blog/header";
import LeftSidebar from "@/components/blog/left-sidebar";
import RightSidebar from "@/components/blog/right-sidebar";
import BlogThemeProvider from "@/components/providers/blog-theme-provider";
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
        <LeftSidebar />

        {/* Main Content (scrolls independently) */}
        <main className="flex-1 ml-0 md:ml-80 mr-0 lg:mr-80 overflow-y-auto">
          {children}
        </main>

        {/* Right Sidebar (fixed) */}
        <RightSidebar />
      </div>
    </div>
  );
}

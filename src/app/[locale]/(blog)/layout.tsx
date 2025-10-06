import FlashSaleTimerBanner from "@/components/blog/flashsale-timer-banner";
import Header from "@/components/blog/header";
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
      <main className="flex-1">{children}</main>
    </div>
  );
}

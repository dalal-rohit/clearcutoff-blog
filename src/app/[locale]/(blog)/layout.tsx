import FlashSaleTimerBanner from "@/components/blog/flashsale-timer-banner";
import React from "react";


export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <FlashSaleTimerBanner message="Flash Sale Ends In" />
      <main className="flex-1">{children}</main>
    </div>
  );
}

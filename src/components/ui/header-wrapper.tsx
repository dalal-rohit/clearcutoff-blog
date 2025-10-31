import useIsMobile from "@/hooks/isMobile";
import React, { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

export default function HeaderWrapper({ children }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = isMobile ? 20 : 35;
      if (window.scrollY > scrollThreshold) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  return (
    <header
      className={`bg-white sticky top-0 !z-50 sm:px-4 ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      {children}
    </header>
  );
}

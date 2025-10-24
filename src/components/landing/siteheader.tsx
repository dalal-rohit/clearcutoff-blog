// src/components/SiteHeader.tsx
"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";

// ✅ Load motion only on client
const AnimatePresence = dynamic(
  () => import("motion/react").then((mod) => mod.AnimatePresence),
  { ssr: false }
);
const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  { ssr: false }
);

// ✅ Load MUI Joy Button only on client
// const Button = dynamic(() => import("@mui/joy/Button"), { ssr: false });

// ✅ Load LanguageSwitcher dynamically if it’s heavy
// const LanguageSwitcher = dynamic(() => import("../LanguageSwitcher"), {
//   ssr: false,
// });

import Button from "@mui/joy/Button";
import { useAuthModal } from "@/store/authModalStore";
import useIsMobile from "@/hooks/isMobile";
import { useScrollStore } from "@/store/scrollStore";
import useScroll from "@/hooks/useScroll";
import { useAmplitude } from "@/hooks/useAmplitude";
import { logAmplitudeEvent } from "../../../services/analytics";
import LanguageSwitcher from "../LanguageSwitcher";
import LoginButton from "../buttons/login-button";
import RegisterButton from "../buttons/register-button";

// Define the shape of our navigation links for scalability
interface NavLink {
  text: string;
  href: "pricing" | "features" | "reviews" | "comparison" | "faqs"; // More specific type
  isActive: boolean;
}

// Data for navigation
const navLinks: NavLink[] = [
  { text: "Pricing", isActive: true, href: "pricing" },
  { text: "Features", isActive: true, href: "features" },
  { text: "Reviews", isActive: true, href: "reviews" },
  { text: "Comparison", isActive: false, href: "comparison" },
  { text: "FAQs", isActive: false, href: "faqs" },
];

const Overlay = ({ onClick }: { onClick: () => void }) => (
  <MotionDiv
    className="fixed inset-0 bg-black z-40" // z-index should be below header's 50
    onClick={onClick}
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.5 }}
    exit={{ opacity: 0 }}
  />
);

// FIX: The prop type was `unknown`, which is not safe. Let's define it properly.
interface SiteHeaderProps {
  linkShow?: boolean;
  links?: NavLink[];
}

const SiteHeader = ({ linkShow = true, links = navLinks }: SiteHeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openModal } = useAuthModal();
  const { trackEvent } = useAmplitude();

  // FIX: Get the refs from our hook. We will attach them below.
  const { pricingRef, featuresRef, reviewsRef, comparisonRef, faqsRef } =
    useScroll();
  const { scrollTo } = useScrollStore();

  // Create a mapping from href to the actual ref object
  const refMap = {
    pricing: pricingRef,
    features: featuresRef,
    reviews: reviewsRef,
    comparison: comparisonRef,
    faqs: faqsRef,
  };

  // FIX: Removed unused `endDate` variable.
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = isMobile ? 20 : 20;
      if (window.scrollY > scrollThreshold) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]); // FIX: Added `isMobile` to dependency array

  const offset = isMobile ? 65 : 65;
  const handleNavClick = (href: NavLink["href"]) => {
    scrollTo(href, offset);
    setIsMenuOpen(false); // Close mobile menu on click
  };

  return (
    <>
      {isMenuOpen && <Overlay onClick={() => setIsMenuOpen(false)} />}
      <header
        className={`bg-white sticky top-0 z-50 transition-shadow duration-300 ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        <nav className="mx-auto max-w-8xl px-2 sm:px-6 lg:px-[80px]">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center gap-2">
                {isMobile ? (
                  <Image
                    src="/images/main-logo.svg"
                    alt="ClearCutoff Logo"
                    width={160}
                    height={36}
                    className="h-[36px] w-[160px] object-contain"
                    priority
                  />
                ) : (
                  <Image
                    src="/images/main-logo.svg"
                    alt="ClearCutoff Logo"
                    width={190}
                    height={48}
                    className="h-[48px] w-[190px] object-contain"
                    priority
                  />
                )}
              </Link>
            </div>
            {linkShow && (
              <div className="hidden md:ml-5 md:flex md:items-baseline md:space-x-8">
                {links
                  .filter((link) => link.isActive)
                  .map((link) => (
                    // FIX: This is where the refs from `useScroll` must be attached.
                    // We also attach the ref from our map to the corresponding element.
                    <div
                      key={link.text}
                      ref={refMap[link.href]} // <-- ATTACH THE REF HERE
                      onClick={() => handleNavClick(link.href)}
                      className="surface-text-gray-normal cursor-pointer hover:text-blue-500 px-3 py-2 body-medium !font-semibold transition-colors"
                    >
                      {link.text}
                    </div>
                  ))}
              </div>
            )}

            <div className="hidden md:flex items-center space-x-3">
              <div>
                <LoginButton />
              </div>
              <RegisterButton isDesign={true} />
              <div className="flex items-center px-2 w-[80px] md:ml-[16px] lg:ml-[32px]">
                <LanguageSwitcher />
              </div>
            </div>

            <div className="mr-2 flex md:hidden">
              <div className="flex items-center px-2 w-[80px]">
                <LanguageSwitcher />
              </div>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center bg-[#0083ff] w-[48px] h-[32px] justify-center rounded-[20px] p-2 text-white"
                aria-expanded={isMenuOpen}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMenuOpen ? (
                  <Image
                    src="/images/cross.svg"
                    alt="ClearCutoff Logo"
                    width={12}
                    height={12}
                    className="h-[12px] w-[12px] object-contain"
                    priority
                  />
                ) : (
                  <Image
                    src="/images/hamburger.svg"
                    alt="ClearCutoff Logo"
                    width={16}
                    height={10}
                    className="h-[10px] w-[16px] object-contain"
                    priority
                  />
                )}
              </button>
            </div>
          </div>
        </nav>

        <AnimatePresence>
          {isMenuOpen && (
            <MotionDiv
              className="md:hidden border-t border-gray-200"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.1, ease: "easeInOut" }}
            >
              <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                {navLinks
                  .filter((link) => link.isActive)
                  .map((link) => (
                    <div
                      key={link.text}
                      onClick={() => handleNavClick(link.href)}
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    >
                      {link.text}
                    </div>
                  ))}
              </div>
              <div className="border-t border-gray-200 pt-4 pb-3">
                <div className="flex flex-col gap-2 px-4">
                  <Button
                    variant="outlined"
                    size="lg"
                    fullWidth
                    onClick={async () => {
                      openModal({ type: "login" });
                      setIsMenuOpen(false);
                      await logAmplitudeEvent("Authentication Initiated", {
                        initial_intent: "login",
                        element_location: "navbar_menu",
                        element_type: "button",
                      });
                    }}
                  >
                    Log In
                  </Button>
                  <Button
                    size="lg"
                    fullWidth
                    onClick={async () => {
                      openModal({ type: "register" });
                      setIsMenuOpen(false);
                      await logAmplitudeEvent("Authentication Initiated", {
                        initial_intent: "login",
                        element_location: "navbar_menu",
                        element_type: "button",
                      });
                    }}
                  >
                    Start for FREE
                  </Button>
                </div>
              </div>
            </MotionDiv>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default SiteHeader;

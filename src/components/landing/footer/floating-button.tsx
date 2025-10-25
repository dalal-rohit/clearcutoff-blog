"use client";

import React, { useEffect, useState } from "react";
// import { logAmplitudeEvent } from "@/services/analytics";
// import { useAuthModal } from "@/store/authModalStore";
import FreeBadge from "@/components/badge/free-badge";
import RegisterButton from "@/components/buttons/register-button";
import { useAuthModal } from "@/store/authModalStore";
import { logAmplitudeEvent } from "@/services/analytics";

interface FloatingButtonProps {
  heroId?: string;
  footerId?: string;
  onClick?: () => void;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({
  heroId,
  footerId,
  onClick,
}) => {
  // const { visible, stuckAboveFooter } = useFloatingButton(heroId, footerId);

  const { openModal } = useAuthModal();
  // if (!visible) return null;
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      { root: null, threshold: 0 }
    );

    observer.observe(footer);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className={`${isFooterVisible ? "" : "fixed"
        } md:hidden bottom-0 z-50 bg-white w-full py-3 px-4 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] transition-shadow duration-300`}
    >
      <div className="flex justify-between gap-2">
        <FreeBadge />
        <RegisterButton isFull={true} onClick={async () => {
          openModal({ type: "register" });
          await logAmplitudeEvent("Authentication Initiated", {
            initial_intent: "register",
            element_location: "footer-section",
            element_type: "button",
          });
        }} />
      </div>
    </div>
  );
};

export default FloatingButton;

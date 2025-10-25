"use client";
import React from "react";
import ScoringCard from "../scoringcard";
import RegisterButton from "@/components/buttons/register-button";
import FreeBadge from "@/components/badge/free-badge";
import { Button } from "@mui/joy";
import { useAuthModal } from "@/store/authModalStore";
import { logAmplitudeEvent } from "@/services/analytics";

export default function HeroButtonsGroup() {
    const { openModal } = useAuthModal();

  return (
    <div>
      <div className="grid grid-cols-12 gap-2 space-y-4">
        <div className="col-span-12 lg:col-span-7 space-y-6">
          <div className="grid grid-cols-2 gap-8 w-full">
            <RegisterButton size="lg" isFull={true}   onClick={async () => {
                        openModal({ type: "register" });
                        await logAmplitudeEvent("Authentication Initiated", {
                          initial_intent: "register",
                          element_location: "hero-section",
                          element_type: "button",
                        });
                      }}/>
            <Button size="lg" fullWidth variant="outlined">
              Login
            </Button>
          </div>
          <div className="flex justify-center lg:justify-start w-full">
            <FreeBadge />
          </div>
        </div>
        <div className="col-span-12 lg:col-span-5 justify-self-center lg:justify-self-end">
          <ScoringCard />
        </div>
      </div>
    </div>
  );
}

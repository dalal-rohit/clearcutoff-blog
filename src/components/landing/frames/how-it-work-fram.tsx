import {  Box, Button } from "@mui/joy";
import React from "react";
import Image from "next/image";
import CustomizableHeader from "@/components/customizable-header";
import { getImageUrl } from "@/utils/imageService";

interface Props {
  heading?: string | null;
  headingHighlight?: string | null;
  subheading?: string | null;
  description?: string | null;
  icon?: string | { url: string | null; alt: string | null } | null;
  buttonText?: string | null;
}
export default function HowItWorkFram({
  heading,
  headingHighlight,
  subheading,
  description,
  icon,
  buttonText,
}: Props) {

  return (
    <>
      <Box className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <CustomizableHeader
            showEyebrow={false}
            heading={heading || ""}
            highlightText={headingHighlight}
            subheading={subheading}
            headingColor="text-gray-900"
            highlightColor="text-blue-500"
            subheadingColor="text-black "
            alignment="left"
            mobileAlignment="left"
            headingSize="heading-2xlarge "
            headingClasses="!mb-4"
            subheadingSize="heading-medium !text-[#192839]"
            subheadingWeight="semibold"
            subheadingClasses="!mb-4"
          />
          <p className="surface-text-gray-muted body-large  !font-normal">
            {description}
          </p>
          <div className="w-[240px]">
            <Button
              onClick={async () => {
                // openModal({ type: "register" });
                // logAmplitudeEvent("Authentication Initiated", {
                //   initial_intent: "register",
                //   element_location: "how_it_work_section",
                //   element_type: "button",
                // });
              }}
              variant="outlined"
              size="lg"
              fullWidth
            >
              {buttonText}
            </Button>
          </div>
        </div>
        <div className="flex justify-center">
          {/* <AspectRatio
            variant="outlined"
            ratio="4/3"
            sx={{
              width: 350,
              bgcolor: "background.level2",
              borderRadius: "md",
              position: "relative",
            }}
          > */}
          <Image
            src={typeof icon === "string" ? icon : getImageUrl(icon?.url ?? "")}
            alt={
              typeof icon === "string"
                ? "Notes Icon"
                : icon?.alt ?? "Notes Icon"
            }
            style={{ objectFit: "contain" }}
            width={360}
            height={286}
          />
          {/* <Image
            src={icon.image}
            alt={icon?.alt[currentLang] ?? "Image"}
            fill
            style={{ objectFit: "contain" }}
            priority
          /> */}
          {/* </AspectRatio> */}
        </div>
      </Box>
    </>
  );
}

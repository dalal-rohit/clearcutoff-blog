import Image from "next/image";
import React from "react";
import CustomizableHeader from "../customizable-header";
import { getImageUrl } from "@/utils/imageService";

interface Props {
  heading: string | null;
  headingHighlight: string | null;
  subheading: string | null;
  icon?: string | { url: string | null; alt: string | null } | null;
}

export default function FeatureCardFrame({
  heading,
  headingHighlight,
  subheading,
  icon,
}: Props) {
  
  return (
    <>
      <div className="flex gap-3 items-center">
        <div>
          <Image
            src={typeof icon === "string" ? icon : getImageUrl(icon?.url ?? "")}
            alt={
              typeof icon === "string"
                ? "Notes Icon"
                : icon?.alt ?? "Notes Icon"
            }
            width={56}
            height={56}
          />

          {/* </Card> */}
        </div>

        <CustomizableHeader
          showEyebrow={false}
          heading={heading}
          highlightText={headingHighlight}
          subheading={subheading}
          alignment="left"
          mobileAlignment="left"
          headingSize="heading-small mb-1"
          subheadingSize="body-medium"
        />
      </div>
    </>
  );
}

"use client";

import React from "react";
import Image from "next/image";
import { getImageUrl } from "@/utils/imageService";
import { Typography } from "@mui/joy";
interface stateLogos {
  title?: string | null;
  icon?: string | { url: string | null; alt: string | null } | null;

  name?: string | null;
}

export default function StateLogoCard({ title, icon, name }: stateLogos) {
  return (
    <>
      {/* {stateLogos.map((stateLogo, index) => ( */}
      <div className="flex flex-col gap-4 py-3 px-4">
        <div className="flex justify-center items-center w-[85px] h-[85px] mx-auto overflow-hidden">
          <Image
            src={typeof icon === "string" ? icon : getImageUrl(icon?.url || "")}
            alt={
              typeof icon === "string"
                ? "Notes Icon"
                : icon?.alt ?? "Notes Icon"
            }
            width={85}
            height={85}
            className="object-cover w-full h-full"
          />
        </div>

        <div>
          <Typography className="text-center body-large !font-semibold !neutral-blueGrayLight">
            {name || ""}
          </Typography>
          <Typography className="text-center body-xsmall !font-normal !neutral-blueGrayLight">
            {title || ""}
          </Typography>
        </div>
      </div>
    </>
  );
}

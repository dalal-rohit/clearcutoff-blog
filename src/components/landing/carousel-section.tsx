"use client";

import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import { motion, useAnimation } from "framer-motion";
import { useRef } from "react";
import StateLogoCard from "./state-logo-card";
import Link from "next/link";
import { highlightTextUtil } from "@/utils/highlightTextUtil";
import { Typography } from "@mui/joy";
import MainContainer from "../main-container";
import { useGlobalDataStore } from "@/store/useGlobalDataStore";
import { useTranslations } from "next-intl";

type Props = {
  buttonShow?: boolean;
};

export default function CarouselSection({ buttonShow = true }: Props) {
  const controls = useAnimation();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const speed = 40;
  const direction = "right";
  const animationName = direction === "right" ? "scroll-left" : "scroll-right";

  const t = useTranslations("carousel");

  const { logoCarousel } = useGlobalDataStore();

  return (
    <MainContainer maxWidth="w-full" padding="p-0">
      <Box className="flex flex-col gap-[32px]  py-[24px]">
        {/* <EdgeHighlight leftColor="from-gray-200/60" rightColor="from-gray-200/60" width="w-12"> */}
        <div className="scroll-wrapper">
          <motion.div
            ref={wrapperRef}
            className="scroll-track"
            animate={controls}
            style={{
              animation: `${animationName} ${speed}s linear infinite`,
            }}
          >
            {Array(3)
              .fill(null)
              .flatMap((_, outerIndex) =>
                logoCarousel?.logos?.map((item, innerIndex) => {
                  return (
                    <div
                      key={`${outerIndex}-${innerIndex}`}
                      className="scroll-item"
                    >
                      <StateLogoCard
                        title={item.heading}
                        icon={
                          item.logo
                        }
                        name={item.subheading}
                      />
                    </div>
                  );
                })
              )}
          </motion.div>
        </div>
        {/* </EdgeHighlight> */}

        {buttonShow && (
          <div className="flex items-center flex-col px-4 gap-2">
            <div className="flex text-center items-center flex-col lg:flex-row gap-4 lg:gap-[56px]">
              <Typography className="heading-medium !font-semibold surface-text-gray-normal">
                {highlightTextUtil(t("text") ?? "", t("highlight") ?? "")}
              </Typography>

              <Link href="/teaching">
                <Button
                  size="lg"
                  variant="outlined"
                  className="whitespace-nowrap"
                >
                  {t("button.text") ?? "Default text"}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </Box>
    </MainContainer>
  );
}

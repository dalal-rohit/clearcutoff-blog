import Card from "@mui/joy/Card";
import { useTranslations } from "next-intl";
import React from "react";

interface ScoringCardProps {
  rating?: number;
}

export default function ScoringCard({ rating=4.5 }: ScoringCardProps) {
  const isValidRating = typeof rating === "number" && !isNaN(rating);
  const t = useTranslations("CourseHeader");

  const badgeText = t("ratingsbyourstudents");
  return (
    // <Box sx={{ padding: 2 }}>
    <Card sx={{ width: "12rem", height: "4.5rem", borderWidth:2, padding: "0px 16px 0px 16px" }} className="flex flex-col justify-center items-center">
      <div className="flex items-center gap-3">
        {isValidRating ? (
          <div className="text-4xl font-bold text-gray-900">
            {rating}
            <span className="text-blue-500">+</span>
          </div>
        ) : (
          <div className="text-sm text-red-500 font-medium">Invalid rating</div>
        )}
        <span className="body-xsmall !font-normal">
         {badgeText}
        </span>
      </div>
    </Card>
    // </Box>
  );
}

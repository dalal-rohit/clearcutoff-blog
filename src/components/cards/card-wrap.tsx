import React from "react";
import Card, { CardProps } from "@mui/joy/Card";

export type CardWrapProps = {
  onClick?: () => void;
  children: React.ReactNode;
  width?: string | number;
  height?: string | number;
  borderwidth?: string | number;
  bordercolor?: string;
  bgcolor?: string;
  padding?: string | number;
  cursor?: string;
} & CardProps;

export default function CardWrap({
  onClick = () => {
    console.log("CardWrap onClick");
  },
  children,
  width = "100%",
  height = "100%",
  borderwidth = 2,
  bordercolor = "#000000.9", // Tailwind amber-300
  bgcolor = "transparent",
  padding = 1,
  cursor = "",
  ...props
}: CardWrapProps) {
  return (
    <Card
      onClick={onClick}
      sx={{
        padding: padding,
        width,
        height,
        border: `${borderwidth}px solid ${bordercolor}`,
        backgroundColor: bgcolor,
        cursor: cursor,
      }}
      {...props}
    >
      {children}
    </Card>
  );
}

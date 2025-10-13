"use client";
import React from "react";
import Button from "@mui/joy/Button";
import { useTranslations } from "next-intl";

type buttonProps = {
  onClick?: () => void;
  text?: string;
  isFull?: boolean;
  loading?: boolean;
  disabled?: boolean;
};

export default function LoginButton({
  onClick = () => {}, // default: empty function
  text = "", // default text
  isFull = false, // default false
  loading = false, // default false
  disabled = false,
}: buttonProps) {
  const t = useTranslations("Buttons");

  const buttonText = text ? text : t("login");

  return (
    <Button
      variant="plain"
      fullWidth={isFull}
      disabled={disabled}
      loading={loading}
      onClick={onClick}
    >
      {buttonText}
    </Button>
  );
}

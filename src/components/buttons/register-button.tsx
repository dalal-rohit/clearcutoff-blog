"use client";

import React from "react";
import Button from "@mui/joy/Button";
import { useTranslations } from "next-intl";
import { useAuthModal } from "@/store/authModalStore";

type buttonProps = {
  onClick?: () => void | Promise<void>;
  text?: string;
  isFull?: boolean;
  loading?: boolean;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
};
export default function RegisterButton({
  onClick = () => {}, // default: empty function
  text = "", // default text
  isFull = false, // default false
  loading = false, // default false
  disabled = false,
  size="md",

}: buttonProps) {
  const t = useTranslations("Buttons");

  const buttonText = text ? text : t("register");
  const { openModal } = useAuthModal();

  return (
    <Button
      color="primary"
      size={size}
      fullWidth={isFull}
      disabled={disabled}
      loading={loading}
      onClick={() => openModal({ type: "register" })}
    >
      {buttonText}
    </Button>
  );
}

"use client";
import React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import joytheme from "@/themes/joytheme";

type CssVarsProviderProps = {
  children: React.ReactNode;
};

export default function BlogThemeProvider({ children }: CssVarsProviderProps) {
  return <CssVarsProvider theme={joytheme}>{children}</CssVarsProvider>;
}

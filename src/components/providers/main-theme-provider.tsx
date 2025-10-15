"use client";
import React, { useEffect } from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import joytheme from "@/themes/joytheme";
import { useGlobalDataStore } from "@/store/useGlobalDataStore";

type CssVarsProviderProps = {
  children: React.ReactNode;
};

export default function MainThemeProvider({
  children,
}: CssVarsProviderProps) {


  return <CssVarsProvider theme={joytheme}>{children}</CssVarsProvider>;
}

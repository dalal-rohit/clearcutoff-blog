"use client";
import React, { useEffect, useRef } from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import joytheme from "@/themes/joytheme";
import { useGlobalDataStore } from "@/store/blog/useGlobalDataStore";

type CssVarsProviderProps = {
  children: React.ReactNode;
  data?: Partial<GlobalDataState>;
};

export default function BlogThemeProvider({
  children,
  data,
}: CssVarsProviderProps) {
  const initialized = useRef(false);

  const { setData } = useGlobalDataStore();

  useEffect(() => {
    if (!initialized.current && data) {
      setData(data);
      initialized.current = true;
    }
  }, [data, setData]);

  if (!data) return null;

  return <CssVarsProvider theme={joytheme}>{children}</CssVarsProvider>;
}

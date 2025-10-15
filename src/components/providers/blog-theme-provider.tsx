"use client";
import React, { useEffect, useRef } from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import joytheme from "@/themes/joytheme";
import { useGlobalDataStore } from "@/store/useGlobalDataStore";

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
    if (!initialized.current) {
      if (data) setData({ ...useGlobalDataStore.getState(), ...data });

      initialized.current = true;
    }
  }, [data]);

  if (!data) return null;

  return <CssVarsProvider theme={joytheme}>{children}</CssVarsProvider>;
}

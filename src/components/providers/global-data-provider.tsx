'use client'; // This is a client component

import { useEffect, useRef } from 'react';


interface GlobalSettingsProviderProps {
  children: React.ReactNode;
}

export function GlobalSettingsProvider({
  children,
}: GlobalSettingsProviderProps) {
  const initialized = useRef(false);



  return <>{children}</>;
}
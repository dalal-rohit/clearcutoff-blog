'use client'; // This is a client component



interface GlobalSettingsProviderProps {
  children: React.ReactNode;
}

export function GlobalSettingsProvider({
  children,
}: GlobalSettingsProviderProps) {



  return <>{children}</>;
}
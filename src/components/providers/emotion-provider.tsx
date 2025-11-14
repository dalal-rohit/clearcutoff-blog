'use client';

import { CacheProvider } from '@emotion/react';
import { createEmotionCache } from '@/lib/emotion-cache';

export default function EmotionProvider({ children }: { children: React.ReactNode }) {
  const cache = createEmotionCache();
  return <CacheProvider value={cache}>{children}</CacheProvider>;
}

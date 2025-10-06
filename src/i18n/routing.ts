import {defineRouting} from 'next-intl/routing';
type AppLocale = "en" | "ur";

export const routing = defineRouting({
  locales: ['en', 'ur'] as AppLocale[],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/pathnames': {
      ur: '/pfadnamen'
    }
  }
});

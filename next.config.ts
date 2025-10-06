import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin({
  experimental: {
    createMessagesDeclaration: "./messages/en.json",
  },
});

const config: NextConfig = {
  reactStrictMode: true,
  swcMinify: true, // minify JS using SWC
  experimental: {
    optimizeCss: true, // remove unused CSS automatically
    inlineCss: true, // inline critical CSS
  },
};

export default withNextIntl(config);

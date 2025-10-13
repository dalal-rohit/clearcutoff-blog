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
  images: {
    domains: [
      "img.icons8.com",
      "i.pravatar.cc",
      "cc-teaching-content-ind.s3.dualstack.ap-south-1.amazonaws.com",
    ],
  },
};

export default withNextIntl(config);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    BACKEND_SERVER_URL: process.env.BACKEND_SERVER_URL,
    BACKEND_IMAGE_DOMAIN: process.env.BACKEND_IMAGE_DOMAIN,
    ONE_SIGNAL_APP_ID: process.env.ONE_SIGNAL_APP_ID,
    ONE_SIGNAL_REST_API_KEY: process.env.ONE_SIGNAL_REST_API_KEY,
  },
  images: {
    domains: [process.env.BACKEND_IMAGE_DOMAIN],
  },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);

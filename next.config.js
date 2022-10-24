/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    BACKEND_SERVER_URL: process.env.BACKEND_SERVER_URL,
  },
  images: {
    domains: [process.env.BACKEND_SERVER_DOMAIN],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

module.exports = nextConfig;

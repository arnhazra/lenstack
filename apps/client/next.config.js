/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: true
  },
  experimental: {
    missingSuspenseWithCSRBailout: false
  }
}

module.exports = nextConfig

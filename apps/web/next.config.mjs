/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: true
  },
  trailingSlash: process.env.NODE_ENV === "production" ? true : false,
  experimental: {
    missingSuspenseWithCSRBailout: false
  }
}

export default nextConfig;

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: true
  },
  output: "export",
  experimental: {
    missingSuspenseWithCSRBailout: false
  }
}

export default nextConfig;

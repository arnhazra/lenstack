/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        unoptimized: true
    },
    output: 'export',
    trailingSlash: true,
    swcMinify: false,
    optimizeFonts: false,
}

module.exports = nextConfig

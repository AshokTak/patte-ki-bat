/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/patte-ki-bat',
  assetPrefix: '/patte-ki-bat/',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig

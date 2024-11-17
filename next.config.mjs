/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    instrumentationHook: true,
  },
  reactStrictMode: false,
  output: 'standalone',
}

export default nextConfig

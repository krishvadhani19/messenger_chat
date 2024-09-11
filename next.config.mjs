/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com"],
  },
  reactStrictMode: true,
  experimental: {
    esmExternals: true,
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com"],
  },
  // Add rewrites for Socket.IO
  async rewrites() {
    return [
      {
        source: "/api/sockets/io",
        destination: "http://localhost:3000/api/sockets/io",
      },
    ];
  },
};

export default nextConfig;

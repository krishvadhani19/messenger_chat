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

/*
Explanation of changes:

1. Existing Configuration:
   - The 'images' property is configured to allow images from "images.unsplash.com".

2. Added Socket.IO Support:
   - We've added the 'rewrites' function to handle Socket.IO connections.
   - The rewrite rule maps '/api/sockets/io' to 'http://localhost:3000/api/sockets/io'.
   - This allows the Socket.IO client to connect to the correct endpoint.

3. Usage:
   - This configuration assumes your Socket.IO server is running on the same port as your Next.js app (3000) in development.
   - For production, you may need to adjust the destination URL.

4. Notes:
   - The configuration uses ES modules syntax (export default) which is correct for .mjs files.
   - The '@type' comment helps with TypeScript type checking if you're using TypeScript.
*/

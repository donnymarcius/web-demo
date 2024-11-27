/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, // Recommended for development
    swcMinify: true, // Optimizes production builds
    experimental: {
      appDir: true, // Enables support for the app directory
    },
  };
  
  export default nextConfig;
  
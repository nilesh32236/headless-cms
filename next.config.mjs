/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'], // Add any other domains if you're fetching images from multiple sources
  },
  reactStrictMode: false,
};

export default nextConfig;

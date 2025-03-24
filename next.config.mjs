/** @type {import('next').NextConfig} */
const nextConfig = {
  // ignore eslint errors during build
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ignore typescript errors during build
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

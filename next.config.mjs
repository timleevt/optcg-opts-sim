/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "en.onepiece-cardgame.com",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;

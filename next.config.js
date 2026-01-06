/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "my-album-backet.s3.ap-northeast-1.wasabisys.com",
      },
    ],
  },
};

module.exports = nextConfig;

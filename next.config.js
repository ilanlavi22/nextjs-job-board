/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "ehjugmoa7fydvkwv.public.blob.vercel-storage.com",
      },
    ],
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.arsenal.com',
      },
    ],
  },
};

export default nextConfig; // <--- แก้ตรงนี้ครับ
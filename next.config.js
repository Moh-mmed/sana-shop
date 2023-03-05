/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com", "picsum.photos", "res.cloudinary.com"],
  },
};

module.exports = nextConfig

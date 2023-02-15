/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { appDir: true },
  transpilePackages: ['react-draft-wysiwyg', 'draft-js'],
};

module.exports = nextConfig;

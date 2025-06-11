/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      unoptimized: true,
      domains: ['encrypted-tbn2.gstatic.com'],
  },
  reactStrictMode: true,
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/api/:path*',
          destination: 'http://o-complex.com:1337/:path*',
        },
      ],
    }
  },
}

export default nextConfig;

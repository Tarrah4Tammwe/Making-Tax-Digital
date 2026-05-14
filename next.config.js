/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-Robots-Tag',
            value: 'index, follow',
          },
        ],
      },
    ];
  },

  redirects: async () => {
    return [
      // Remove www
      {
        source: '/:path*',
        destination: 'https://makingtaxdigitalexplained.com/:path*',
        permanent: true,
        has: [
          {
            type: 'host',
            value: 'www.makingtaxdigitalexplained.com',
          },
        ],
      },
      // Force HTTPS
      {
        source: '/:path*',
        destination: 'https://makingtaxdigitalexplained.com/:path*',
        permanent: true,
        has: [
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'http',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: [],
  },

  // Autoriser ton IP locale pour le HMR
  allowedDevOrigins: ['192.168.1.17'],

  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.mnemosym.com' }],
        destination: 'https://mnemosym.com/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'mnemosym.fr' }],
        destination: 'https://mnemosym.com/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.mnemosym.fr' }],
        destination: 'https://mnemosym.com/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

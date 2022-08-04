const path = require('path');
const jsonImporter = require('node-sass-json-importer');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  sassOptions: {
    includePaths: [path.resolve(__dirname, 'styles')],
    importer: jsonImporter(),
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },

  async redirects() {
    return [
      {
        source: '/',
        destination: '/holding',
        permanent: false,
      },
      {
        source: '/:path((?!holding$).*)',
        has: [
          {
            type: 'host',
            value: 'stormlightstudio.co.uk',
          },
        ],
        destination: '/holding',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;

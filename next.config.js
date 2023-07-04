/** @type {import('next').NextConfig} */
const path = require('path');
// const withImages = require('next-images');

// module.exports = withImages();
module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    // prependData: '@import "./globals.scss";',
  },
  env: {
    BE_URL: process.env.BE_URL,
    API_URL: process.env.API_URL,
    IMAGE_PATH: process.env.IMAGE_PATH,
    PLATFORM_FEE_ID: process.env.PLATFORM_FEE_ID,
    KLAVIYO_PUBLIC_KEY: process.env.KLAVIYO_PUBLIC_KEY,
  },
  webpack(config, {
    buildId, dev, isServer, defaultLoaders, webpack,
  }) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    // eslint-disable-next-line no-param-reassign
    config.optimization.splitChunks.cacheGroups = { };
    // eslint-disable-next-line no-param-reassign
    config.optimization.minimize = true;
    // return config
    return config;
  },
  // webpack(config) {
  //   config.module.rules.push({
  //     test: /\.(svg|png)$/, // Your extension
  //     use: {
  //       loader: 'url-loader',
  //       options: {
  //         limit: 100000,
  //         name: '[name].[ext]',
  //         esModule: false,
  //       },
  //     },
  //   });
  //   // /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/
  //   return config;
  // },
};

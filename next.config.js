/** @type {import('next').NextConfig} */
const path = require('path');
// const withImages = require('next-images');

// module.exports = withImages();
module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
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

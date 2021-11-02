/** @type {import('next').NextConfig} */
const path = require('path');
const withImages = require('next-images');
module.exports = withImages();
module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },

};

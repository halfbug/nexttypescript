// import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
const path = require('path');

module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  stories: ['../components/**/*.stories.@(js|jsx|ts|tsx)'],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-scss",
  ],
  resolve: {
    modules: [path.resolve(__dirname, '..'), 'node_modules']
  },
   // Add nextjs preset
  //  presets: [path.resolve(__dirname, "./next-preset.js")],
  presets: [path.resolve(__dirname, './next-preset.js')],
  webpackFinal: async (config) => {
    config.resolve.modules = [
      ...(config.resolve.modules || []),
      path.resolve(__dirname, ".."),
    ];

    return config;
  },
  // webpackFinal: async config => {
  //   // Remove the existing css rule
  //   config.module.rules = config.module.rules.filter(
  //     f => f.test.toString() !== '/\\.scss$/'
  //   );

  //   config.module.rules.push({
  //     test: /\.scss$/,
  //     use: ['style-loader', {
  //       loader: 'css-loader',
  //       options: {
  //         modules: true, // Enable modules to help you using className
  //       }
  //     }, 'sass-loader'],
  //     include: path.resolve(__dirname, '../styles/global.scss'),
  //   });


  //   return config;
  // },
}
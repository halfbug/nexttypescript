const path = require('path');
// const assetRule = config.module.rules.find(({ test }) => test.test(".svg"));

// const assetLoader = {
//   loader: assetRule.loader,
//   options: assetRule.options || assetRule.query
// };

// const pathToInlineSvg = path.resolve(__dirname, '../assets');


module.exports = {
  webpackFinal: async (baseConfig, options, defaultConfig) => {
    const { module = {} } = baseConfig;
        
    const newConfig = {
      ...baseConfig,
      module: {
        ...module,
        rules: [...(module.rules || [])],
      },
    };

    // // TypeScript 
    // newConfig.module.rules.push({
    //   test: /\.(ts|tsx)$/,
    //   include: [path.resolve(__dirname, '../components')],
    //   use: [
    //     {
    //       loader: 'babel-loader',
    //       options: {
    //         presets: ['next/babel', require.resolve('babel-preset-react-app')],
    //         plugins: ['react-docgen'],
    //       },
    //     },
    //   ],
    // });
    // newConfig.resolve.extensions.push('.ts', '.tsx');

    // SCSS 
    newConfig.module.rules.push({
      test: /\.(s*)css$/,
      loaders: ['style-loader',{
        loader: 'sass-loader',
        options: {
          prependData: '@import "./globals.scss";',
        },
      }, {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          modules: true,
        }
      }, 
    ],
      include: path.resolve(__dirname, 'styles'),
    });
    
    // newConfig.module.rules.push({
    //   test: /\.svg$/,
    //   use: ['@svgr/webpack'],
    // });
    
    newConfig.module.rules.unshift({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });
    
  //   const rules = baseConfig.module.rules;
  //   // modify storybook's file-loader rule to avoid conflicts with svgr
  // const fileLoaderRule = rules.find(rule => rule.test.test('.svg'));
  // fileLoaderRule.exclude = pathToInlineSvg;

  // newConfig.module.rules.push({
  //   test: /\.svg$/,
  //   include: pathToInlineSvg,
  //   use: [{
  //     loader: '@svgr/webpack',
  //     options: {
  //       icon: true,
  //     },
  //   }],
  // });
    // If you are using CSS Modules, check out the setup from Justin (justincy)
    // Many thanks to Justin for the inspiration
    // https://gist.github.com/justincy/b8805ae2b333ac98d5a3bd9f431e8f70#file-next-preset-js

    return newConfig;
  },
};
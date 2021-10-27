module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  stories: ['../components/**/*.stories.@(js|jsx|ts|tsx)'],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ]
}
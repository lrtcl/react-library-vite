export default {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|ts)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    // Replace your-framework with the framework you are using (e.g., react-webpack5, vue3-webpack5)
    name: '@storybook/react-vite',
    options: {},
  },
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  docs: {
    autodocs: "tag",
    defaultName: "Documentation"
  },
};

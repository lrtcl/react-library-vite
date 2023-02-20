import DocumentationTemplate from './DocumentationTemplate.mdx';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
    expanded: true,
  },
  docs: {
    page: DocumentationTemplate,
  }
}

export const argTypes = {
  ref: {
    table: {
      disable: true,
    },
  },
};

/** @type {import('eslint').Linter.Config} */
const config = {
  extends: [
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
  ],
  rules: {
    "react/prop-types": "off",
  },
  globals: {
    React: "writable",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  env: {
    browser: true,
  },
};

module.exports = config;

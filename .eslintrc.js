module.exports = {
  root: true,
  extends: [
    'airbnb-typescript/base',
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    "import/prefer-default-export": "off",
    "import/no-default-export": "error"
  }
};

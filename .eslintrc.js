module.exports = {
  root: true,
  extends: [
    'airbnb-typescript/base',
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  plugins: ['import'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    "import/prefer-default-export": "off",
    "import/no-default-export": "error",
    "@typescript-eslint/prefer-optional-chain": "error",
    "@typescript-eslint/prefer-nullish-coalescing": "error",
    "@typescript-eslint/method-signature-style": ["error", "property"],
  }
};

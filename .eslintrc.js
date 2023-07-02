module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "plugin:react/recommended",
    "standard",
    "plugin:prettier/recommended"
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["react", "prettier"],
  rules: {
    // "prettier/prettier": "error",
    // indent: ["error", 2, { offsetTernaryExpressions: false }],
    indent: "off",
    semi: [2, "always"],
    "space-before-function-paren": [
      "error",
      { anonymous: "always", named: "never" }
    ],
    "multiline-ternary": ["off"],
    quotes: ["error", "double", { allowTemplateLiterals: true }]
  }
};

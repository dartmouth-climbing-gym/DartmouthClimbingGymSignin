module.exports = {
  root: true,
  env: { browser: true, es2022: true },
  ignorePatterns: ["dist", ".eslintrc.cjs", "node_modules"],
  plugins: ["html"],
  overrides: [
    {
      files: ["**/*.{ts,tsx}"],
      extends: [
        "airbnb",
        "airbnb-typescript",
        "airbnb/hooks",
        "plugin:@typescript-eslint/recommended",
      ],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.app.json",
      },
      plugins: ["react-refresh"],
      settings: {
        "import/resolver": {
          typescript: { project: "./tsconfig.app.json" },
        },
      },
      rules: {
        "react/react-in-jsx-scope": "off",
        "react/prop-types": "off",
        "import/prefer-default-export": "off",
        "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      },
    },
    {
      files: ["**/*.html"],
      plugins: ["html"],
      extends: ["airbnb"],
      rules: {
        "react/react-in-jsx-scope": "off",
      },
    },
  ],
};

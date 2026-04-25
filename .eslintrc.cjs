module.exports = {
  root: true,
  env: { browser: true, es2022: true },
  ignorePatterns: [
    'dist',
    '.eslintrc.cjs',
    'node_modules',
    // Legacy static files — removed in Phase 10
    'pages/',
    'styles/',
    'main.js',
  ],
  plugins: ['html'],
  overrides: [
    // App source (TypeScript + React)
    {
      files: ['src/**/*.{ts,tsx}'],
      extends: [
        'airbnb',
        'airbnb-typescript',
        'airbnb/hooks',
        'plugin:@typescript-eslint/recommended',
        'prettier',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.app.json',
      },
      plugins: ['react-refresh'],
      settings: {
        'import/resolver': {
          typescript: { project: './tsconfig.app.json' },
        },
      },
      rules: {
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
        'import/prefer-default-export': 'off',
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      },
    },
    // Root config files (vite.config.ts, tailwind.config.ts)
    {
      files: ['*.config.{ts,js}', 'postcss.config.js'],
      extends: ['airbnb-base', 'airbnb-typescript/base', 'prettier'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.node.json',
      },
      settings: {
        'import/resolver': {
          typescript: { project: './tsconfig.node.json' },
        },
      },
      rules: {
        'import/prefer-default-export': 'off',
        // Config files legitimately import devDependencies
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      },
    },
    // HTML files (inline scripts via eslint-plugin-html)
    {
      files: ['index.html'],
      plugins: ['html'],
    },
  ],
};

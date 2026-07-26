module.exports = {
  root: true,
  env: {
    browser: true,
    es2024: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.eslint.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".d.ts"],
      },
      typescript: {
        project: ["./tsconfig.eslint.json"],
      },
    },
  },
  extends: ["airbnb", "airbnb-typescript", "plugin:prettier/recommended"],
  plugins: ["@typescript-eslint", "prettier"],
  ignorePatterns: ["dist", "node_modules"],
  rules: {
    "prettier/prettier": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        prefer: "type-imports",
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/no-magic-numbers": [
      "error",
      {
        ignore: [-1, 0, 1],
        enforceConst: true,
        ignoreEnums: true,
        ignoreNumericLiteralTypes: true,
        ignoreReadonlyClassProperties: true,
        ignoreArrayIndexes: true,
        ignoreDefaultValues: true,
      },
    ],
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [
          "vite.config.*",
          "**/vite.config.*",
          "**/*.config.*",
          "**/*.test.*",
          "**/*.spec.*",
        ],
      },
    ],
    "max-lines-per-function": [
      "error",
      {
        max: 40,
        skipBlankLines: true,
        skipComments: true,
        IIFEs: true,
      },
    ],
    "react/react-in-jsx-scope": "off",
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "import/prefer-default-export": "off",
    eqeqeq: ["error", "always"],
    curly: ["error", "all"],
    "no-console": [
      "warn",
      {
        allow: ["warn", "error"],
      },
    ],
  },
};

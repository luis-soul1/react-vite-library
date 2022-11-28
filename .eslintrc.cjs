const RULES = {
  WARN: "warn",
  ERROR: "error",
  INFO: "info",
  OFF: "off",
};

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  globals: {
    React: true,
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      typescript: {},
    },
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "prettier",
    "plugin:tailwindcss/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "import", "tailwindcss"],
  rules: {
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal"],
        pathGroups: [
          {
            pattern: "{react}",
            group: "builtin",
            position: "before",
          },
          {
            pattern: "{assets/**}",
            group: "internal",
            position: "after",
          },
        ],
        pathGroupsExcludedImportTypes: ["builtin"],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
    "jsx-quotes": [RULES.ERROR, "prefer-double"],
    "tailwindcss/no-custom-classname": RULES.OFF,
    "@typescript-eslint/no-unused-vars": [
      RULES.ERROR,
      { ignoreRestSiblings: true },
    ],
    "react/react-in-jsx-scope": RULES.OFF,
    "react/prop-types": RULES.OFF,
    "no-console": [
      RULES.WARN,
      { allow: [RULES.WARN, RULES.INFO, RULES.ERROR] },
    ],
    "no-redeclare": RULES.OFF,
    "@typescript-eslint/no-redeclare": [RULES.ERROR],
  },
};

// eslint.config.js
import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import vueParser from "vue-eslint-parser";
import globals from "globals";

export default [
  // Base ESLint config
  {
    ...js.configs.recommended,
    files: ["**/*.js", "**/*.ts", "**/*.vue"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },

  // TypeScript config
  {
    files: ["**/*.ts", "**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        extraFileExtensions: [".vue"],
        parser: tsParser,
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/ban-ts-comment": "off",
    },
  },
];

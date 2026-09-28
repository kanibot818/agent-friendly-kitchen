import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import boundaries from "eslint-plugin-boundaries";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const noComments = require("eslint-plugin-no-comments");

export default [
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "logs/**",
      "playwright-report/**",
      "test-results/**",
      "coverage/**",
      "bin/**",
    ],
  },
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      parser: tsparser,
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      boundaries,
      "no-comments": noComments,
    },
    settings: {
      react: { version: "detect" },
      "boundaries/elements": [
        { type: "feature", pattern: "src/features/*", capture: ["feature"] },
        { type: "app", pattern: "src/app/*" },
        { type: "test-setup", pattern: "src/test/*" },
        { type: "entry", pattern: ["src/main.tsx", "src/App.tsx"] },
      ],
    },
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "react",
              importNames: ["useEffect"],
              message:
                "useEffect is banned. Prefer explicit event handlers and derived state.",
            },
          ],
          patterns: [
            {
              group: [
                "**/features/*/*",
                "!**/features/*/index",
                "!**/features/*/index.*",
              ],
              message:
                "Import features only through their public barrel (index.ts).",
            },
          ],
        },
      ],
      "boundaries/entry-point": [
        "error",
        {
          default: "disallow",
          rules: [
            {
              target: ["feature"],
              allow: "index.@(ts|tsx|js|jsx)",
            },
            {
              target: ["app", "entry", "test-setup"],
              allow: "*",
            },
          ],
        },
      ],
      "boundaries/element-types": [
        "error",
        {
          default: "disallow",
          rules: [
            { from: ["entry"], allow: ["feature", "app"] },
            { from: ["app"], allow: ["feature"] },
            { from: ["feature"], allow: ["feature"] },
            { from: ["test-setup"], allow: ["*"] },
          ],
        },
      ],
    },
  },
  {
    files: ["src/**/*.{ts,tsx,js,jsx}"],
    rules: {
      "no-comments/disallowComments": "error",
    },
  },
  {
    files: ["**/*.{test,spec}.{ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        describe: "readonly",
        it: "readonly",
        test: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        vi: "readonly",
      },
    },
  },
  {
    files: ["vite.config.ts", "vitest.config.ts", "playwright.config.ts", "eslint.config.js"],
    rules: {
      "no-comments/disallowComments": "off",
      "boundaries/entry-point": "off",
      "boundaries/element-types": "off",
    },
  },
];

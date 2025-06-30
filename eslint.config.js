import js from "@eslint/js";
import vue from "eslint-plugin-vue";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import vueParser from "vue-eslint-parser";

// Definições manuais de globals do browser
const browserGlobals = {
  window: "readonly",
  document: "readonly",
  localStorage: "readonly",
  fetch: "readonly",
  setTimeout: "readonly",
  console: "readonly",
  HTMLInputElement: "readonly",
  // Adicione outros se necessário
};
const vitestGlobals = {
  ...browserGlobals,
  describe: "readonly",
  it: "readonly",
  expect: "readonly",
  vi: "readonly",
  beforeEach: "readonly",
  afterEach: "readonly",
  beforeAll: "readonly",
  afterAll: "readonly",
};

export default [
  js.configs.recommended,
  // Configuração para arquivos .vue
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 2020,
        sourceType: "module",
      },
      globals: browserGlobals,
    },
    plugins: {
      vue,
      "@typescript-eslint": tseslint,
    },
    rules: {
      "vue/no-multiple-template-root": "off",
      "vue/multi-word-component-names": "off",
    },
  },
  // Configuração para arquivos TS/TSX
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
      },
      globals: browserGlobals,
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
    },
  },
  // Configuração para arquivos de teste
  {
    files: ["**/*.test.ts", "**/*.test.tsx"],
    languageOptions: {
      globals: vitestGlobals,
    },
  },
];

import globals from "globals";
import pluginJs from "@eslint/js";
import eslintPluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default [
  {ignores: ["node_modules/", "**/*.test.js"]},
  {files: ["**/*.{js,mjs,cjs,jsx}"]},
  {
    languageOptions: {
      parserOptions: {ecmaFeatures: {jsx: true}},
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  eslintPluginReactConfig,
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
  {
    rules: {
      "no-undef": "off",
      "no-unused-vars": "warn",
      "prettier/prettier": "warn",
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
    },
  },
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];

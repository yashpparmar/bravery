import globals from "globals";
import pluginJs from "@eslint/js";
import eslintPluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";

export default [
  {ignores: ["node_modules/", "build/", "dist/"]},
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
  eslintPluginPrettier,
  {
    plugins: {
      "react-hooks": eslintPluginReactHooks,
    },
    rules: eslintPluginReactHooks.configs.recommended.rules,
  },
  {
    rules: {
      "no-undef": "off",
      "no-unused-vars": "warn",
      "prettier/prettier": "warn",
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react-hooks/exhaustive-deps": "off",
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

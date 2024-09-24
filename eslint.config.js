import jsConfigs from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import globals from "globals";
import autoImports from "./.wxt/eslint-auto-imports.mjs";

export default [
	autoImports,
	jsConfigs.configs.recommended,
	reactPlugin.configs.flat.recommended,
	{
		ignores: [".wxt/", ".output/"],
	},
	{
		files: ["**/*.{ts,tsx,js,mjs,jsx}"],
		languageOptions:
		{
			parser: tsParser,
			globals: {
				React: true,
				JSX: true,
				...globals.browser
			},
			ecmaVersion: "latest",
			sourceType: "module",
		},
		settings: {
			react: {
				version: "detect"
			}
		},
		plugins: {
			"@typescript-eslint": tsPlugin
		}
	},
	{
		rules:
		{
			"no-unused-vars": "off",
			"no-undef": "error",
			"semi": ["error", "always"],
			"quotes": ["error", "double"],
			"indent": ["warn", "tab", { "SwitchCase": 1 }],
			"no-empty": "off",
			"react/prop-types": "off",
			"@typescript-eslint/no-unused-vars": ["error", {
				"argsIgnorePattern": "^_",
				"args": "none"
			}],
		}
	}
];

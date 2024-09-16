const pluginJs = require("@eslint/js");
const typescriptEslintPlugin = require("@typescript-eslint/eslint-plugin");
const typescriptEslintParser = require("@typescript-eslint/parser");
const pluginReact = require("eslint-plugin-react");
const globals = require("globals");
const wxtImport = require("./.wxt/eslintrc-auto-import.json");

module.exports = [
	pluginJs.configs.recommended,
	pluginReact.configs.flat.recommended,
	{
		ignores: [".wxt/", ".output/"],
	},
	{
		files: ["**/*.{ts,tsx,js,mjs,jsx}"],
		languageOptions:
		{
			parser: typescriptEslintParser,
			globals: {
				React: true,
				JSX: true,
				...globals.browser,
				...wxtImport.globals
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
			"@typescript-eslint": typescriptEslintPlugin
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

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import webExtension, { readJsonFile } from "vite-plugin-web-extension";
import path from "node:path";
import svgr from "vite-plugin-svgr";
import { viteStaticCopy } from "vite-plugin-static-copy";

const target: string = process.env.TARGET || "chrome";

function generateManifest()
{
	const manifest = readJsonFile("src/manifest.json");
	const pkg = readJsonFile("package.json");
	return {
		version: pkg.version,
		...manifest,
	};
}

// https://vitejs.dev/config/
export default defineConfig({
	define:
	{
		__BROWSER__: JSON.stringify(target)
	},
	plugins:
		[
			react(),
			svgr(),
			viteStaticCopy({
				targets: [
					{
						src: "src/Data/Locales",
						dest: ".",
						rename: "_locales"
					}
				]
			}),
			webExtension({
				manifest: generateManifest,
				browser: target,
				/* webExtConfig: {
					args: target === "firefox" ? [ ] : [ "--no-sandbox" ]
				} */
			}),
		],
	resolve:
	{
		alias:
		{
			// In dev mode, make sure fast refresh works
			"/@react-refresh": path.resolve(
				"node_modules/@vitejs/plugin-react-swc/refresh-runtime.js"
			),
		},
	},
	build:
	{
		chunkSizeWarningLimit: 1000,
	},
});

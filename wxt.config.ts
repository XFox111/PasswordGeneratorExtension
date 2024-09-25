import { defineConfig, WxtViteConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
	modules: ["@wxt-dev/module-react", "@wxt-dev/i18n/module"],
	vite: (): WxtViteConfig => ({
		build:
		{
			chunkSizeWarningLimit: 1000
		}
	}),
	imports: {
		eslintrc: {
			enabled: 9
		},
	},
	manifest: ({ browser }) => ({
		name: "__MSG_manifest_name__",
		description: "__MSG_manifest_description__",
		author: "__MSG_manifest_author__",
		homepage_url: "https://github.com/xfox111/PasswordGeneratorExtension",

		default_locale: "en",
		permissions: ["storage", "contextMenus", "activeTab"],

		icons:
		{
			16: "/icons/16.png",
			32: "/icons/32.png",
			48: "/icons/48.png",
			128: "/icons/128.png",
			1024: "/icons/1024.png"
		},

		browser_specific_settings: browser !== "firefox" ? undefined : ({
			gecko: {
				id: "passwordgenerator@xfox111.net",
				strict_min_version: "109.0"
			}
		})
	})
});

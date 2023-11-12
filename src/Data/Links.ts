import browser, { Manifest } from "webextension-polyfill";

export const PersonalLink =
{
	Website: "https://xfox111.net",
	Twitter: "https://twitter.com/xfox111",
	BuyMeACoffee: "https://buymeacoffee.com/xfox111"
};

export const WebstoreLink =
{
	Chrome: "https://chrome.google.com/webstore/detail/password-generator/jnjobgjobffgmgfnkpkjfjkkfhfikmfl",
	Edge: "https://microsoftedge.microsoft.com/addons/detail/password-generator/manimdhobjbkfpeeehlhhneookiokpbj",
	Firefox: "https://addons.mozilla.org/firefox/addon/easy-password-generator"
};

const getGithub = (path?: string): string =>
	`https://github.com/xfox111/PasswordGeneratorExtension${path}`;

export const GithubLink =
{
	Repository: getGithub(),
	Changelog: getGithub("/releases/latest"),
	TranslationGuide: getGithub("/blob/main/CONTRIBUTING.md#contributing-to-translations"),
	License: getGithub("/blob/main/LICENSE")
};

export const GetFeedbackLink = () =>
{
	if (__BROWSER__ === "firefox")
		return WebstoreLink.Firefox;

	const manifest: Manifest.WebExtensionManifest = browser.runtime.getManifest();

	const updateUrl: URL = new URL((manifest as unknown as Record<string, unknown>).update_url as string ?? "about:blank");

	if (updateUrl.host === "edge.microsoft.com")
		return WebstoreLink.Edge;
	if (updateUrl.host === "clients2.google.com")
		return WebstoreLink.Chrome;

	return "mailto:feedback@xfox111.net";
};

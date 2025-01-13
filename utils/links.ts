import { Manifest } from "webextension-polyfill";

export const personalLinks =
{
	website: "https://xfox111.net",
	social: "https://bsky.app/profile/xfox111.net",
	donation: "https://buymeacoffee.com/xfox111"
};

export const storeLinks =
{
	chrome: "https://chrome.google.com/webstore/detail/password-generator/jnjobgjobffgmgfnkpkjfjkkfhfikmfl",
	edge: "https://microsoftedge.microsoft.com/addons/detail/password-generator/manimdhobjbkfpeeehlhhneookiokpbj",
	firefox: "https://addons.mozilla.org/firefox/addon/easy-password-generator"
};

const getGithub = (path?: string): string =>
	new URL(path ?? "", "https://github.com/xfox111/PasswordGeneratorExtension/").href;

export const githubLinks =
{
	repository: getGithub(),
	changelog: getGithub("releases/latest"),
	translationGuide: getGithub("wiki/Contribution-Guidelines#contributing-to-translations"),
	license: getGithub("blob/main/LICENSE")
};

export const getFeedbackLink = () =>
{
	if (import.meta.env.FIREFOX)
		return storeLinks.firefox;

	const manifest: Manifest.WebExtensionManifest = browser.runtime.getManifest();
	const updateUrl: URL = new URL((manifest as unknown as Record<string, unknown>).update_url as string ?? "about:blank");

	if (updateUrl.host === "edge.microsoft.com")
		return storeLinks.edge;
	if (updateUrl.host === "clients2.google.com")
		return storeLinks.chrome;

	return "mailto:feedback@xfox111.net";
};

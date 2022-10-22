// BackgroundService.ts
// Background script that handles the context menu visibility

import { Tabs, Menus } from "webextension-polyfill";
import browser from "../Utils/Browser";
import { loc } from "../Utils/Localization";

function UpdateContextMenu(isEnabled: boolean): void
{
	console.log("BackgroundService.UpdateContextMenu", isEnabled);
	browser.contextMenus.update("generatePassword", { visible: isEnabled });
}

async function OnContextClick(info: Menus.OnClickData): Promise<void>
{
	console.log("BackgroundService.OnContextClick", info);
	let tabInfo: Tabs.Tab[] = await browser.tabs.query({ active: true, currentWindow: true });
	console.log("BackgroundService.OnContextClick", tabInfo);

	browser.tabs.sendMessage(tabInfo[0].id, info.menuItemId as string);
}

async function OnInstalled(): Promise<void>
{
	console.log("[BackgroundService] browser.runtime.onInstalled");
	browser.contextMenus.removeAll();

	browser.contextMenus.create(
		{
			title: loc("Quick generate password"),
			contexts: ["editable"],
			id: "generatePassword"
		}
	);

	let settings: { [key: string]: any; } = await browser.storage.sync.get({ AddContext: true });

	UpdateContextMenu(settings.AddContext);
}

async function OnStorageChanged(changes: any): Promise<void>
{
	console.log("[BackgroundService] browser.storage.sync.onChanged", changes);
	if (changes.AddContext?.newValue !== undefined)
		UpdateContextMenu(changes.AddContext.newValue);
}

if (!browser.runtime.onInstalled.hasListener(OnInstalled))
	browser.runtime.onInstalled.addListener(OnInstalled);

if (!browser.contextMenus.onClicked.hasListener(OnContextClick))
	browser.contextMenus.onClicked.addListener(OnContextClick);

if (!browser.storage.sync.onChanged.hasListener(OnStorageChanged))
	browser.storage.sync.onChanged.addListener(OnStorageChanged);

// BackgroundService.ts
// Background script that handles the context menu visibility

import { loc } from "../Utils/Localization";

function UpdateContextMenu(isEnabled: boolean) : void
{
	console.log("BackgroundService.UpdateContextMenu", isEnabled);
	chrome.contextMenus.update("generatePassword", { visible: isEnabled });
}

async function OnContextClick(info : chrome.contextMenus.OnClickData) : Promise<void>
{
	console.log("BackgroundService.OnContextClick", info);

	let tabInfo : chrome.tabs.Tab[] = await chrome.tabs.query({ active: true, currentWindow: true });

	console.log("BackgroundService.OnContextClick", tabInfo);

	chrome.tabs.sendMessage<string>(tabInfo[0].id, info.menuItemId as string);
}

async function OnInstalled() : Promise<void> {
	console.log("[BackgroundService] chrome.runtime.onInstalled");
	chrome.contextMenus.removeAll();

	chrome.contextMenus.create(
		{
			title: loc("Quick generate password"),
			contexts: [ "editable" ],
			id: "generatePassword"
		}
	);

	let settings : { [key : string]: any } = await chrome.storage.sync.get({ AddContext: true });

	UpdateContextMenu(settings.AddContext);
}

async function OnStorageChanged(changes: any) : Promise<void> {
	console.log("[BackgroundService] chrome.storage.sync.onChanged", changes);
	if (changes.AddContext?.newValue !== undefined)
		UpdateContextMenu(changes.AddContext.newValue);
}

if (!chrome.runtime.onInstalled.hasListener(OnInstalled))
	chrome.runtime.onInstalled.addListener(OnInstalled);

if (!chrome.contextMenus.onClicked.hasListener(OnContextClick))
	chrome.contextMenus.onClicked.addListener(OnContextClick);

if (!chrome.storage.sync.onChanged.hasListener(OnStorageChanged))
	chrome.storage.sync.onChanged.addListener(OnStorageChanged);

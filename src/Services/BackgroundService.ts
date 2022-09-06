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

if (!chrome.runtime.onInstalled.hasListeners())
	chrome.runtime.onInstalled.addListener(async () =>
	{
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
	});

if (!chrome.contextMenus.onClicked.hasListeners())
	chrome.contextMenus.onClicked.addListener(OnContextClick);

if (!chrome.storage.sync.onChanged.hasListeners())
	chrome.storage.sync.onChanged.addListener(changes =>
		{
			console.log("[BackgroundService] chrome.storage.sync.onChanged", changes);
			if (changes.AddContext?.newValue !== undefined)
				UpdateContextMenu(changes.AddContext.newValue);
		});

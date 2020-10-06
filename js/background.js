function AddContextMenu()
{
	chrome.contextMenus.create(
		{
			id: "generate",
			contexts: [ "all" ],
			title: chrome.i18n.getMessage("generate")
		}
	);
}

// Setting up context menu event listener
chrome.contextMenus.onClicked.addListener(() => GeneratePassword(null));

// Adding context menu entry if needed
chrome.runtime.onInstalled.addListener(() =>
{
	// Adding context menu option
	chrome.storage.sync.get({ showContext: true }, (settings) =>
	{
		if (settings.showContext !== false)
			AddContextMenu();
	});
});

chrome.storage.onChanged.addListener((changes, area) =>
{
	if (area != "sync" || changes["showContext"] == null)
		return;

	if (changes["showContext"].newValue === false)
		chrome.contextMenus.removeAll();
	else
		AddContextMenu();
});
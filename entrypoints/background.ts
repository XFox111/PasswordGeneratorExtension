export default defineBackground(() => main());

async function main(): Promise<void>
{
	await browser.contextMenus.removeAll();
	browser.contextMenus.onClicked.addListener(() => browser.action.openPopup());

	const showMenu: boolean = (await storage.getItem<boolean>("sync:ContextMenu", { fallback: true }))!;
	updateMenus(showMenu);

	storage.watch<boolean>("sync:ContextMenu", e => updateMenus(e!));
}

async function updateMenus(showMenus: boolean): Promise<void>
{
	await browser.contextMenus.removeAll();

	if (showMenus)
		browser.contextMenus.create({
			id: "password-generator",
			title: i18n.t("manifest.name"),
			contexts: ["all"],
		});
}

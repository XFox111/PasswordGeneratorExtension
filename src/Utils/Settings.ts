import browser from "../Utils/Browser";
import { Storage } from "webextension-polyfill"

export default class Settings
{
	public AddContext : boolean = true;
	public Autocopy : boolean = true;

	public static OnChanged : (changes : Partial<Settings>) => void;

	public static async Init() : Promise<Settings>
	{
		let fallbackOptions = new Settings();

		if (!browser?.storage?.sync)
			return fallbackOptions;

		let props : { [key: string]: any } = await browser.storage.sync.get(fallbackOptions);

		browser.storage.sync.onChanged.addListener(Settings.OnStorageChanged);

		return props as Settings;
	}

	public static async Update(changes : Partial<Settings>) : Promise<void>
	{
		if (browser?.storage?.sync)
			await browser?.storage?.sync?.set(changes);
		else
			Settings.OnChanged(changes);
	}

	private static OnStorageChanged(changes : { [key: string]: Storage.StorageChange }) : void
	{
		let propsList : string[] = Object.keys(new Settings());
		let settings : { [key: string]: any } = { };

		Object.entries(changes)
			.filter(i => propsList.includes(i[0]))
			.map(i => settings[i[0]] = i[1].newValue);

		if (Settings.OnChanged)
			Settings.OnChanged(settings as Partial<Settings>);
	}
}

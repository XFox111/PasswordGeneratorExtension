export default class Settings
{
	public AddContext : boolean = true;
	public Autocopy : boolean = true;

	public static OnChanged : (changes : Partial<Settings>) => void;

	public static async Init() : Promise<Settings>
	{
		let fallbackOptions = new Settings();

		if (!chrome?.storage?.sync)
			return fallbackOptions;

		let props : { [key: string]: any } = await chrome.storage.sync.get(fallbackOptions) || fallbackOptions;

		chrome.storage.sync.onChanged.addListener(Settings.OnStorageChanged);

		return props as Settings;
	}

	public static async Update(changes : Partial<Settings>) : Promise<void>
	{
		if (chrome?.storage?.sync)
			await chrome?.storage?.sync?.set(changes);
		else
			Settings.OnChanged(changes);
	}

	private static OnStorageChanged(changes : { [key: string]: chrome.storage.StorageChange }) : void
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

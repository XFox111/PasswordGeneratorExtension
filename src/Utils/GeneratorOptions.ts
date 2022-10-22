import browser from "../Utils/Browser";
import { Storage } from "webextension-polyfill"

export default class GeneratorOptions
{
	public Length: number = 16;

	public Special: boolean = true;
	public Numeric: boolean = true;
	public Lowercase: boolean = true;
	public Uppercase: boolean = true;

	public ExcludeSimilar: boolean = true;
	public ExcludeAmbiguous: boolean = true;
	public ExcludeRepeating: boolean = false;

	public static OnChanged : (changes : Partial<GeneratorOptions>) => void;

	public static async Init() : Promise<GeneratorOptions>
	{
		let fallbackOptions : GeneratorOptions = new GeneratorOptions();

		if (!browser?.storage?.sync)		// Extension is running as a standalone app
			return fallbackOptions;

		let props : { [key: string]: any } = await browser.storage.sync.get(fallbackOptions);

		browser.storage.sync.onChanged.addListener(GeneratorOptions.OnStorageChanged);

		// #51 - on firefox the field can sometimes be empty and generates an error on load
		props.Length = props.Length || 16;

		return props as GeneratorOptions;
	}

	public static async Update(changes : Partial<GeneratorOptions>) : Promise<void>
	{
		if (browser?.storage?.sync)
			await browser?.storage?.sync?.set(changes);
		else
			GeneratorOptions.OnChanged(changes);
	}

	private static OnStorageChanged(changes : { [key: string]: Storage.StorageChange }) : void
	{
		let propsList : string[] = Object.keys(new GeneratorOptions());
		let options : { [key: string]: any } = { };

		Object.entries(changes)
			.filter(i => propsList.includes(i[0]))
			.map(i => options[i[0]] = i[1].newValue);

		if (GeneratorOptions.OnChanged)
			GeneratorOptions.OnChanged(options as Partial<GeneratorOptions>);
	}
}

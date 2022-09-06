export default class Localization
{
	public static GetString(key : string) : string
	{
		let sanitizedKey : string = key
			.replaceAll(".", "_")
			.replaceAll(",", "_")
			.replaceAll(" ", "_")
			.replaceAll("-", "_")
			.replaceAll("?", "_")
			.replaceAll("!", "_");

		let str : string = chrome?.i18n?.getMessage(sanitizedKey);

		return str ?? key;
	}
}

export function loc(key : string) : string
{
	return Localization.GetString(key);
}

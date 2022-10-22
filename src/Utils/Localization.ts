import browser from "../Utils/Browser";

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

		let str : string = browser?.i18n?.getMessage(sanitizedKey);

		return str ?? key;
	}
}

export function loc(key : string) : string
{
	return Localization.GetString(key);
}

import { GeneratorOptions } from "./storage";

const Characters =
{
	Uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
	Lowercase: "abcdefghijklmnopqrstuvwxyz",
	Numeric: "1234567890",
	Special: "!#$%&*+-=?@^_"
};

const Similar: string = "iIl1Lo0O";
const Ambiguous: string = "{}[]()/\\'\"`~,;:.<>";

export const CharacterHints = { ...Characters, Similar, Ambiguous };

/**
 * Generates a random password
 * @param options Options for password generation
 * @returns Randomly generated password
 * @throws Error if options are invalid
 */
export function GeneratePassword(options: GeneratorOptions): string
{
	ValidateOptions(options);

	let password: string = GetRequiredCharacters(options);
	const availableCharacters: string = GetAvailableCharacters(options);

	for (let i = password.length; i < options.Length; i++)
	{
		const character: string = PickRandomFromArray(availableCharacters);

		if (options.ExcludeRepeating && password.includes(character))
			i--;
		else
			password += character;
	}

	password = ShuffleString(password);
	return password;
}

/**
 * Validates options for password generation
 * @param options Options for password generation
 * @throws Error if options are invalid
 */
export function ValidateOptions(options: GeneratorOptions): void
{
	if (options.Length < 4)
		throw new Error(i18n.t("errors.too_short"));

	const availableCharacters: string = GetAvailableCharacters(options);

	if (availableCharacters.length < 1)
		throw new Error(i18n.t("errors.no_characters"));

	if (options.ExcludeRepeating && options.Length > availableCharacters.length)
		throw new Error(i18n.t("errors.too_long"));
}

// Returns a string containing all characters that are available for password generation
function GetAvailableCharacters(options: GeneratorOptions): string
{
	let availableCharacters: string = "";

	for (const [key, value] of Object.entries(Characters))
		if (options[key as keyof GeneratorOptions])
			availableCharacters += value;

	if (options.ExcludeSimilar)
		availableCharacters = availableCharacters.replace(new RegExp(`[${Similar}]`, "g"), "");

	if (options.Special && !options.ExcludeAmbiguous)
		availableCharacters += Ambiguous;

	return availableCharacters;
}

// Returns a string containing all characters from every available set that are required for password generation
function GetRequiredCharacters(options: GeneratorOptions): string
{
	let result: string = "";
	const characters: Record<string, string> = Object.assign({}, Characters);

	if (!options.ExcludeAmbiguous)
		characters.Special += Ambiguous;

	if (options.ExcludeSimilar)
		for (const key of Object.keys(characters))
			characters[key] = characters[key].replace(new RegExp(`[${Similar}]`, "g"), "");

	for (const [key, value] of Object.entries(characters))
		if (options[key as keyof GeneratorOptions])
			result += PickRandomFromArray(value);

	return result;
}

// Picks a random character from a string
function PickRandomFromArray(array: string): string
{
	return array[GetRandomInt(0, array.length)];
}

// See https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// min is inclusive, max is exclusive
function GetRandomInt(min: number, max: number): number
{
	const arr = new Uint16Array(1);
	crypto.getRandomValues(arr);	// Using crypto instead of Math.random() as a CSPRNG
	return Math.floor((arr[0] / 65_536) * (max - min)) + min;
}

// Shuffles a string using Fisher-Yates algorithm and CSPRNG
// See https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
function ShuffleString(str: string): string
{
	const arr = str.split("");

	for (let i = arr.length - 1; i > 0; i--)
	{
		const j = GetRandomInt(0, i + 1);
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}

	return arr.join("");
}

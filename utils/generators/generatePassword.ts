import { pickRandomFromArray, shuffleString } from "./randomUtils";

const Characters =
{
	uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
	lowercase: "abcdefghijklmnopqrstuvwxyz",
	numeric: "1234567890",
	special: "!#$%&*+-=?@^_"
};

const similar: string = "iIl1Lo0O";
const ambiguous: string = "{}[]()/\\'\"`~,;:.<>";

export const CharacterHints = { ...Characters, similar, ambiguous };

/**
 * Generates a random password
 * @param options Options for password generation
 * @returns Randomly generated password
 * @throws Error if options are invalid
 */
export function generatePassword(options: PasswordProps): string
{
	validateOptions(options);

	let password: string = getRequiredCharacters(options);
	const availableCharacters: string = getAvailableCharacters(options);

	for (let i = password.length; i < options.length; i++)
	{
		const character: string = pickRandomFromArray(availableCharacters);

		if (options.excludeRepeating && password.includes(character))
			i--;
		else
			password += character;
	}

	password = shuffleString(password);

	if (options.separator && options.separatorInterval)
		password = addSeparator(password, options.separator, options.separatorInterval);

	return password;
}

/**
 * Validates options for password generation
 * @param options Options for password generation
 * @throws Error if options are invalid
 */
export function validateOptions(options: PasswordProps): void
{
	if (options.length < 4)
		throw new Error(i18n.t("errors.too_short"));

	const availableCharacters: string = getAvailableCharacters(options);

	if (availableCharacters.length < 1)
		throw new Error(i18n.t("errors.no_characters"));

	if (options.excludeRepeating && options.length > availableCharacters.length)
		throw new Error(i18n.t("errors.too_long"));
}

// Returns a string containing all characters that are available for password generation
function getAvailableCharacters(options: PasswordProps): string
{
	let availableCharacters: string = "";

	for (const [key, value] of Object.entries(Characters))
		if (options[key as keyof PasswordProps])
			availableCharacters += value;

	if (options.custom && options.customSet.length > 0)
		availableCharacters += options.customSet;

	if (options.excludeSimilar)
		availableCharacters = availableCharacters.replace(new RegExp(`[${similar}]`, "g"), "");

	if (options.special && !options.excludeAmbiguous)
		availableCharacters += ambiguous;

	if (options.excludeCustom.length > 0)
		availableCharacters = availableCharacters.replace(new RegExp(`[${options.excludeCustom}]`, "g"), "");

	return availableCharacters;
}

// Returns a string containing all characters from every available set that are required for password generation
function getRequiredCharacters(options: PasswordProps): string
{
	let result: string = "";
	const characters: Record<string, string> = Object.assign({}, Characters);

	if (!options.excludeAmbiguous)
		characters.special += ambiguous;

	if (options.custom && options.customSet.length > 0)
		characters.custom = options.customSet;

	for (const key of Object.keys(characters))
	{
		if (options.excludeSimilar)
			characters[key] = characters[key].replace(new RegExp(`[${similar}]`, "g"), "");

		if (options.excludeCustom.length > 0)
			characters[key] = characters[key].replace(new RegExp(`[${options.excludeCustom}]`, "g"), "");
	}

	for (const [key, value] of Object.entries(characters))
		if (options[key as keyof PasswordProps])
			for (let i = 0; i < (options[key as keyof PasswordProps] as number); i++)
			{
				if (value.length < 1)
					continue;

				const char = pickRandomFromArray(value);

				if (options.excludeRepeating && result.includes(char))
					i--;
				else
					result += char;
			}

	return result;
}

function addSeparator(password: string, separator: string, separatorInterval: number): string
{
	if (!separator || separatorInterval < 1)
		return password;

	const parts: string[] = [];
	for (let i = 0; i < password.length; i += separatorInterval)
		parts.push(password.slice(i, i + separatorInterval));

	return parts.join(separator);
}

export type PasswordProps =
	{
		length: number;

		special: boolean | number;
		numeric: boolean | number;
		lowercase: boolean | number;
		uppercase: boolean | number;
		custom: boolean | number;

		customSet: string;

		excludeSimilar: boolean;
		excludeAmbiguous: boolean;

		excludeRepeating: boolean;
		excludeCustom: string;

		separator?: string;
		separatorInterval?: number;
	};

import GeneratorOptions from "./GeneratorOptions";
import { loc } from "./Localization";

export default class Generator
{
	public static Uppercase = "ABCDEFGHJKMNPQRSTUVWXYZ";
	public static Lowercase = this.Uppercase.toLowerCase();
	public static Numeric = "23456789";
	public static SpecialCharacters = "!#$%&*+-=?@^_";
	public static AmbiguousCharacters = "{}[]()/\\'\"`~,;:.<>";
	public static SimilarCharacters = "il1Lo0O";

	public static GeneratePassword(props : GeneratorOptions) : string
	{
		if (!props.Length || isNaN(props.Length) || props.Length < 4)
			props.Length = 4;

		// Validating parameters
		if (this.ValidateProps(props))
			return "";

		// Generating password
		let availableCharacters : string = this.GetAvailableCharacters(props);
		let requiredCharacters : string = this.GetRequiredCharacters(props);

		let password : string = "";

		for (let i = 0; i < props.Length; i++)
		{
			let char : string = this.PickRandomFromArray(availableCharacters);

			if (props.ExcludeRepeating && password.includes(char))
				i--;
			else
				password += char;
		}

		for (let i = 0; i < requiredCharacters.length; i++)
		{
			if (props.ExcludeRepeating && password.includes(requiredCharacters[i]))
				continue;

			password = password.replace(this.PickRandomFromArray(password), requiredCharacters[i]);
		}

		return password;
	}

	public static ValidateProps(props : GeneratorOptions): string
	{
		if (!props.Length || isNaN(props.Length) || props.Length < 4)
			props.Length = 4;

		if (!props.Lowercase && !props.Uppercase)
			return loc("Either lowercase or uppercase characters must be included");

		let availableCharacters : string = this.GetAvailableCharacters(props);

		if (props.ExcludeRepeating && availableCharacters.length < props.Length)
			return loc("Selected length is too long to exclude repeating characters");

		return "";
	}

	private static GetAvailableCharacters(props : GeneratorOptions) : string
	{
		let availableCharacters : string = "";

		if (props.Special)
			availableCharacters += this.SpecialCharacters;
		if (props.Numeric)
			availableCharacters += this.Numeric;
		if (props.Lowercase)
			availableCharacters += this.Lowercase;
		if (props.Uppercase)
			availableCharacters += this.Uppercase;

		if (!props.ExcludeAmbiguous)
			availableCharacters += this.AmbiguousCharacters;
		if (!props.ExcludeSimilar)
			availableCharacters += this.SimilarCharacters;

		return availableCharacters;
	}

	private static GetRequiredCharacters(props : GeneratorOptions) : string
	{
		let requiredCharacters : string = "";

		if (props.Special)
			requiredCharacters += this.PickRandomFromArray(this.SpecialCharacters);
		if (props.Numeric)
			requiredCharacters += this.PickRandomFromArray(this.Numeric);
		if (props.Lowercase)
			requiredCharacters += this.PickRandomFromArray(this.Lowercase);
		if (props.Uppercase)
			requiredCharacters += this.PickRandomFromArray(this.Uppercase);

		if (!props.ExcludeAmbiguous)
			requiredCharacters += this.PickRandomFromArray(this.AmbiguousCharacters);
		if (!props.ExcludeSimilar)
			requiredCharacters += this.PickRandomFromArray(this.SimilarCharacters);

		return requiredCharacters;
	}

	// See https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Math/random
	// min is inclusive, max is exclusive
	private static GetRandomInt(min : number, max : number) : number
	{
		return Math.floor(Math.random() * (max - min)) + min;
	}

	private static PickRandomFromArray(array : string) : string
	{
		return array[this.GetRandomInt(0, array.length)];
	}
}


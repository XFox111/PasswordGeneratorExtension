export default class GeneratorOptions
{
	public Length: number = 8;

	public Special: boolean = true;
	public Numeric: boolean = true;
	public Lowercase: boolean = true;
	public Uppercase: boolean = true;

	public ExcludeSimilar: boolean = true;
	public ExcludeAmbiguous: boolean = true;

	public ExcludeRepeating: boolean = false;

	public ExcludeCustom: string = "";
}

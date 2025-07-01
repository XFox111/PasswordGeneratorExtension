import { MIN_PASSWORD_LENGTH } from "../constants";

export default class ExtensionOptions
{
	public MinLength: number = MIN_PASSWORD_LENGTH;
	public MaxLength: number = 32;
}

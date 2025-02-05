// Based on ealamiLabs - Password generator (https://github.com/ealamiLabs/password-generator)
// licensed under MIT

import dictionary from "./dictionary.json";
import { getBooleanSequence, getRandomInt } from "./randomUtils";

/* MIT License
*
* Copyright (c) 2024 ealamiLabs
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

export default function generatePassphrase(options: PassphraseProps): string
{
	const words: string[] = [];

	for (let i = 0; i < options.wordCount; i++)
	{
		const word: string = dictionary[getRandomInt(0, dictionary.length)].word;

		if (!options.allowRepeating && words.includes(word))
			i--;
		else
			words.push(word);
	}

	let result: string = words.join(options.separator).toLocaleLowerCase();

	console.log(result);

	if (options.swapCharacters)
		result = swapCharacters(result);

	if (options.randomizeCase)
		result = RandomUpperCase(result);

	return result;
}

function RandomUpperCase(passphrase: string): string
{
	const sequence: boolean[] = getBooleanSequence(passphrase.length);
	let result: string = "";

	for (let i = 0; i < passphrase.length; i++)
		result += sequence[i] ? passphrase[i].toLocaleUpperCase() : passphrase[i];

	return result;
}

function swapCharacters(passphrase: string): string
{
	const sequence: boolean[] = getBooleanSequence(passphrase.length);
	let result: string = "";

	for (let i = 0; i < passphrase.length; i++)
		if (sequence[i])
			switch (passphrase[i].toLocaleLowerCase())
			{
				case "a":
					result += getRandomInt(0, 100) < 50 ? "@" : "4";
					break;
				case "e":
					result += "3";
					break;
				case "i":
					result += "!";
					break;
				case "s":
					result += getRandomInt(0, 100) < 50 ? "$" : "5";
					break;
				default:
					result += passphrase[i];
					break;
			}
		else
			result += passphrase[i];

	return result;
}

export type PassphraseProps =
	{
		wordCount: number;
		swapCharacters: boolean;
		randomizeCase: boolean;
		allowRepeating: boolean;
		separator: string;
	};

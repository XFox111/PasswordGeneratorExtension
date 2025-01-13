// Picks a random character from a string
export function pickRandomFromArray(array: string): string
{
	return array[getRandomInt(0, array.length)];
}

// See https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// min is inclusive, max is exclusive
export function getRandomInt(min: number, max: number): number
{
	const arr = new Uint16Array(1);
	crypto.getRandomValues(arr);	// Using crypto instead of Math.random() as a CSPRNG
	return Math.floor((arr[0] / 65_536) * (max - min)) + min;
}

// Shuffles a string using Fisher-Yates algorithm and CSPRNG
// See https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
export function shuffleString(str: string): string
{
	const arr = str.split("");

	for (let i = arr.length - 1; i > 0; i--)
	{
		const j = getRandomInt(0, i + 1);
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}

	return arr.join("");
}

export function getBooleanSequence(length: number): boolean[]
{
	const arr = new Uint8Array(Math.ceil(length / 8));
	crypto.getRandomValues(arr);

	const result: boolean[] = [];

	for (let i = 0; i < length; i++)
	{
		const byte = arr[Math.floor(i / 8)];
		const bit = byte & (1 << (i % 8));
		result.push(bit !== 0);
	}

	return result;
}

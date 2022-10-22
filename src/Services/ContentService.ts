// ContentService.ts
// Content script that handles quick password generation through context menu

import browser from "../Utils/Browser";
import Generator from "../Utils/Generator";
import GeneratorOptions from "../Utils/GeneratorOptions";
import { loc } from "../Utils/Localization";

async function OnMessage(message: any) : Promise<void>
{
	console.log("[ContentService] browser.runtime.onMessage", message);

	if (message === "generatePassword")
	{
		let generatorOptions : GeneratorOptions = await GeneratorOptions.Init();
		let password : string = Generator.GeneratePassword(generatorOptions);

		let input : HTMLInputElement = document.activeElement as HTMLInputElement;

		if (![ "INPUT", "TEXTAREA" ].includes(input.tagName))
			return;

		console.log("[ContentService] browser.runtime.onMessage", input);

		if (input.tagName !== "INPUT" || input.readOnly || ![ "text", "password" ].includes(input.type))
		{
			window.alert(loc("Quick generator is only available on password fields"));
			return;
		}

		input.focus();
		input.value = password;
		window.navigator.clipboard.writeText(password);
	}
}

if (!browser.runtime.onMessage.hasListener(OnMessage))
	browser.runtime.onMessage.addListener(OnMessage);

console.log("[ContentService] Loaded");

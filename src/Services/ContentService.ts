// ContentService.ts
// Content script that handles quick password generation through context menu

import Generator from "../Utils/Generator";
import GeneratorOptions from "../Utils/GeneratorOptions";
import { loc } from "../Utils/Localization";

if (!chrome.runtime.onMessage.hasListeners())
	chrome.runtime.onMessage.addListener(async message =>
	{
		console.log("[ContentService] chrome.runtime.onMessage", message);

		if (message === "generatePassword")
		{
			let generatorOptions : GeneratorOptions = await GeneratorOptions.Init();
			let password : string = Generator.GeneratePassword(generatorOptions);

			let input : HTMLInputElement = document.activeElement as HTMLInputElement;

			if (![ "INPUT", "TEXTAREA" ].includes(input.tagName))
				return;

			console.log("[ContentService] chrome.runtime.onMessage", input);

			if (input.tagName !== "INPUT" || input.readOnly || ![ "text", "password" ].includes(input.type))
			{
				window.alert(loc("Quick generator is only available on password fields"));
				return;
			}

			input.focus();
			input.value = password;
			window.navigator.clipboard.writeText(password);
		}
	});

console.log("[ContentService] Loaded");

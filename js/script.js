// Some constants
const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = upperCase.toLowerCase();
const numbers = "1234567890";
const specialCharacters = "@#$%";
const ambiguousCharacters = "{}[]()/\\'\"`~,;:.<>";
const similarCharacters = "il1Lo0O";

chrome.storage.sync.get({ showButton: true },
	(settings) =>
	{
		if (settings.showButton)
			InsertButtons();
	}
);

// Adding button below every password field
function InsertButtons()
{
	document.querySelectorAll("input[type=password]").forEach(i =>
		{
			let actionLink = document.createElement("a");

			actionLink.innerText = chrome.i18n.getMessage("generate");
			actionLink.style.margin = "5px";
			actionLink.style.display = "block";

			// Since anchor without 'href' attrubute isn't shown as a hyperlink and '#' link potentially can break some sites logic, we add empty JS function
			actionLink.href = "javascript:void(0);";

			actionLink.addEventListener("click", GeneratePassword);

			i.insertAdjacentElement("afterend", actionLink);	// Adding button after a password field
		});
}

function GeneratePassword(e, useDefaultLength = false)
{
	// Generating password
	let availableCharacters = "";	// Set of available characters to generate a password from

	chrome.storage.sync.get(
		{
			length: 16,
			includeSymbols: true,
			includeNumbers: true,
			includeLowercase: true,
			includeUppercase: true,
			excludeSimilar: true,
			excludeSpecial: true,
			hideAlert: false,
			promptForLength: false,
			dontRepeatChars: false,
		},
		(settings) =>
		{
			// Adding or excluding characters from the set
			if (settings.includeSymbols)
				availableCharacters += specialCharacters;
			if (settings.includeNumbers)
				availableCharacters += numbers;
			if (settings.includeLowercase)
				availableCharacters += lowerCase;
			if (settings.includeUppercase)
				availableCharacters += upperCase;
			if (settings.excludeSimilar)
				similarCharacters.split("").forEach(i => availableCharacters = availableCharacters.replace(i, ""));
			if (settings.excludeSpecial === false)
				availableCharacters += ambiguousCharacters;

			if (availableCharacters.length < 1)
			{
				alert(chrome.i18n.getMessage("fail"));
				return;
			}

			let password = "";
			var pwdLength = settings.length;
			if (settings.promptForLength && !useDefaultLength)
				while(true)
				{
					var response = prompt(chrome.i18n.getMessage("lengthPrompt").replace("%LEN%", settings.length));
					if (response === null)	// If user clicked 'Cancel'
						return;

					if (parseInt(response) && response > 1)
					{
						pwdLength = response;
						break;
					}
					else if (!response)	// Continue with default length if no response is provided. Try again if input is invalid
						break;
				}

			if (settings.dontRepeatChars && availableCharacters.length < pwdLength)
			{
				alert(chrome.i18n.getMessage("notEnoughChars").replace("%MIN_CHARS%", availableCharacters.length));
				return;
			}

			for (k = 0; k < pwdLength; k++)
				password += availableCharacters[GetRandomInt(0, availableCharacters.length)];	// Picking random characters

			let field = e?.target.previousElementSibling;
			// Creating a hidden field if called as standalone
			if (!field)
			{
				field = document.createElement("input");
				document.body.appendChild(field);
			}

			field.value = password;	// Setting generated password to the field

			field.setAttribute("type", "text");	// Since we cannot copy text from a password field, we'll make it temporarly simple field

			// Some JS clipboard copying stuff
			field.select();
			document.execCommand("copy");

			// Setting field type back to 'password'
			field.setAttribute("type", "password");

			if (!e)
				field.remove();

			if (settings.hideAlert === false)
				alert(chrome.i18n.getMessage("success"));
		});
}

// See https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function GetRandomInt(min, max)
{
	return Math.floor(Math.random() * (max - min)) + min;
}
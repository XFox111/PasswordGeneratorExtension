export default defineContentScript({
	matches: ["<all_urls>"],
	runAt: "document_idle",
	main()
	{
		console.log("Password Generator: script loaded");

		browser.runtime.onMessage.addListener((message: string, _, sendResponse) =>
		{
			if (message === "probe")
				// @ts-expect-error sendResponse has incorrect signature
				sendResponse(document.querySelectorAll("form input[type=password]").length);
			else
				document
					.querySelectorAll("form input[type=password]")
					.forEach(el => {
						(el as HTMLInputElement).value = message;
						(el as HTMLInputElement).focus();
					});
		});
	},
});

import browser from "webextension-polyfill";
import messages from "../Data/Locales/en/messages.json";

/**
 * Gets the localized string for the specified message. If the message is missing, this method returns an empty string (''). If the format of the call is wrong — for example, messageName is not a string or the substitutions array has more than 9 elements — this method returns .
 * @param key The name of the message, as specified in the file.
 * @param subustitutions Optional. Substitution strings, if the message requires any.
 * @returns Message localized for current locale.
 */
export const GetLocaleString = (key: keyof typeof messages, ...subustitutions: string[]): string =>
	browser.i18n.getMessage(key, subustitutions) ?? key;

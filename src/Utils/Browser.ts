import Browser from "webextension-polyfill";

let browser: typeof chrome | typeof Browser = (process.env.NODE_ENV === "development") ? chrome : require("webextension-polyfill");

export default browser;

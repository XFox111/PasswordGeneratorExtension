import Browser from "webextension-polyfill";

const browser: typeof Browser = (process.env.NODE_ENV !== "development") ? require("webextension-polyfill") : null;
export default browser;

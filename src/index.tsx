import ReactDOM from "react-dom/client";
import App from "./App";
import Settings from "./Utils/Settings";

Settings.Init().then(settings =>
	ReactDOM
		.createRoot(document.querySelector("#root") as HTMLElement)
		.render(<App settings={ settings } />));

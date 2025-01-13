import React from "react";
import ReactDOM from "react-dom/client";
import App from "../../shared/App";
import "./main.css";
import Page from "./Page";

document.title = i18n.t("advanced.title");

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<App>
			<Page />
		</App>
	</React.StrictMode>
);

import { Tab, TabList } from "@fluentui/react-components";
import { bundleIcon, FluentIcon, Info20Filled, Info20Regular, Settings20Filled, Settings20Regular } from "@fluentui/react-icons";
import { ReactElement, StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "../../shared/App";
import AboutSection from "./AboutSection";
import "./main.css";
import SettingsSection from "./SettingsSection";

function Options(): ReactElement
{
	const [selection, setSelection] = useState<string>("settings");

	const SettingsIcon: FluentIcon = bundleIcon(Settings20Filled, Settings20Regular);
	const AboutIcon: FluentIcon = bundleIcon(Info20Filled, Info20Regular);

	return (
		<main>
			<TabList selectedValue={ selection } onTabSelect={ (_, e) => setSelection(e.value as string) }>
				<Tab icon={ <SettingsIcon /> } content={ i18n.t("settings.title") } value="settings" />
				<Tab icon={ <AboutIcon /> } content={ i18n.t("about.title") } value="about" />
			</TabList>
			{ selection === "settings" && <SettingsSection /> }
			{ selection === "about" && <AboutSection /> }
		</main>
	);
};

ReactDOM.createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App>
			<Options />
		</App>
	</StrictMode>
);

import { GeneratorOptions } from "@/utils/storage";
import { Button, Divider, makeStyles, tokens, Tooltip } from "@fluentui/react-components";
import { bundleIcon, FluentIcon, Open20Filled, Open20Regular, Settings20Filled, Settings20Regular } from "@fluentui/react-icons";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "../../shared/App";
import GeneratorView from "./GeneratorView";
import "./main.css";
import QuickOptions from "./QuickOptions";

function Popup(): React.ReactElement
{
	const [options, setOptions] = useState<GeneratorOptions | null>(null);

	const AdvancedIcon: FluentIcon = bundleIcon(Open20Filled, Open20Regular);
	const SettingsIcon: FluentIcon = bundleIcon(Settings20Filled, Settings20Regular);
	const cls = useStyles();

	return (
		<main className={ cls.root }>
			<GeneratorView options={ options } />
			<QuickOptions onChange={ setOptions } />

			<Divider />

			<div className={ cls.actionsRoot }>
				<Button as="a" icon={ <AdvancedIcon /> } href="/advanced.html" target="_blank">
					{ i18n.t("popup.advanced") }
				</Button>
				<Tooltip relationship="label" content={ i18n.t("settings.title") }>
					<Button
						appearance="subtle" icon={ <SettingsIcon /> }
						onClick={ () => browser.runtime.openOptionsPage() } />
				</Tooltip>
			</div>
		</main>
	);
};

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<App>
			<Popup />
		</App>
	</React.StrictMode>
);

const useStyles = makeStyles({
	root:
	{
		display: "flex",
		flexDirection: "column",
		padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalS}`,
		gap: tokens.spacingVerticalS,
	},
	actionsRoot:
	{
		display: "grid",
		gridTemplateColumns: "1fr auto",
		gap: tokens.spacingHorizontalS,
	},
});

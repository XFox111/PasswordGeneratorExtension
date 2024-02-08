import { Accordion, FluentProvider, Spinner } from "@fluentui/react-components";
import { useStyles } from "./App.styles";
import AboutSection from "./Components/AboutSection";
import GeneratorView from "./Components/GeneratorView";
import SettingsSection from "./Components/SettingsSection";
import Specials from "./Specials/Specials";
import { StorageProvider } from "./Utils/Storage";
import { useTheme } from "./Utils/Theme";
import { useState } from "react";

export default function App(): JSX.Element
{
	const theme = useTheme();
	const cls = useStyles();
	const [selection, setSelection] = useState<string[]>([]);

	return (
		<FluentProvider theme={ theme }>
			<main className={ cls.root }>
				<StorageProvider loader={ <Spinner size="large" className={ cls.spinner } /> }>
					<GeneratorView collapse={ selection.includes("settings") } />
					<Accordion
						openItems={ selection }
						onToggle={ (_, e) => setSelection(e.openItems as string[]) }
						collapsible
						className={ cls.accordionAnimation }>
						<SettingsSection />
						<AboutSection />
					</Accordion>
				</StorageProvider>
				<Specials />
			</main>
		</FluentProvider>
	);
}

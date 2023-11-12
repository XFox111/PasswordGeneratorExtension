import { Accordion, FluentProvider, Spinner } from "@fluentui/react-components";
import { useStyles } from "./App.styles";
import AboutSection from "./Components/AboutSection";
import GeneratorView from "./Components/GeneratorView";
import SettingsSection from "./Components/SettingsSection";
import Specials from "./Specials/Specials";
import { StorageProvider } from "./Utils/Storage";
import { useTheme } from "./Utils/Theme";

export default function App(): JSX.Element
{
	const theme = useTheme();
	const cls = useStyles();

	return (
		<FluentProvider theme={ theme }>
			<main className={ cls.root }>
				<StorageProvider loader={ <Spinner size="large" className={ cls.spinner } /> }>
					<GeneratorView />
					<Accordion collapsible className={ cls.accordionAnimation }>
						<SettingsSection />
						<AboutSection />
					</Accordion>
				</StorageProvider>
				<Specials />
			</main>
		</FluentProvider>
	);
}

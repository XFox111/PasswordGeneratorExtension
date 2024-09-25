import { StorageProvider } from "@/utils/storage";
import { useTheme } from "@/utils/useTheme";
import { Accordion, FluentProvider, Spinner } from "@fluentui/react-components";
import { useState } from "react";
import { useStyles } from "./App.styles";
import AboutSection from "./sections/AboutSection";
import GeneratorView from "./sections/GeneratorView";
import SettingsSection from "./sections/SettingsSection";
import Snow from "./specials/Snow";

const App: React.FC = () =>
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
						collapsible>

						<SettingsSection />
						<AboutSection />
					</Accordion>
				</StorageProvider>

				<Snow />
			</main>
		</FluentProvider>
	);
};

export default App;

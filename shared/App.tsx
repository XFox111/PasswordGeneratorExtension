import { StorageProvider } from "@/utils/storage";
import { useTheme } from "@/utils/useTheme";
import { FluentProvider, makeStyles, Spinner, Theme } from "@fluentui/react-components";
import Snow from "./specials/Snow";

const App: React.FC<React.PropsWithChildren> = props =>
{
	const theme: Theme = useTheme();
	const cls = useStyles();

	return (
		<FluentProvider theme={ theme }>
			<StorageProvider loader={ <Spinner size="large" className={ cls.spinner } /> }>
				{ props.children }
				<Snow />
			</StorageProvider>
		</FluentProvider>
	);
};

const useStyles = makeStyles({
	spinner:
	{
		height: "120px",
	},
});

export default App;

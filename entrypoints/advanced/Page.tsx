import DoubleLabledSwitch from "@/shared/DoubleLabeledSwitch";
import { mergeClasses, Toaster } from "@fluentui/react-components";
import { ReactElement } from "react";
import { useMediaQuery } from "react-responsive";
import PasswordList from "./components/PasswordList";
import { useStyles } from "./Page.styles";
import PassphraseSection from "./sections/PassphraseSection";
import PasswordSection from "./sections/PasswordSection";

export default function Page(): ReactElement
{
	const [isPassphrase, setIsPassphrase] = useState<boolean | null>(null);
	const [passwords, setPasswords] = useState<string[]>([]);
	const isSmall = useMediaQuery({ query: "(max-width: 1000px)" });

	const cls = useStyles();

	useEffect(() =>
	{
		advancedPassphraseSelected.getValue().then(setIsPassphrase);
		const unwatch = advancedPassphraseSelected.watch(setIsPassphrase);

		return () => unwatch();
	}, []);

	if (isPassphrase === null)
		return <></>;

	return (
		<main className={ mergeClasses(cls.root, isSmall && cls.smallRoot) }>
			<PasswordList
				passwords={ passwords }
				className={ mergeClasses(cls.listRoot, isSmall && cls.hideScroll) } />

			<article className={ mergeClasses(cls.configRoot, isSmall && cls.hideScroll) }>
				<DoubleLabledSwitch outerRoot={ { className: cls.switch } }
					checked={ isPassphrase }
					onChange={ (_, e) => advancedPassphraseSelected.setValue(e.checked) }
					offLabel={ i18n.t("advanced.password.title") }
					onLabel={ i18n.t("advanced.passphrase.title") } />

				{ isPassphrase ?
					<PassphraseSection onGenerated={ setPasswords } />
					:
					<PasswordSection onGenerated={ setPasswords } />
				}
			</article>
			<Toaster />
		</main>
	);
};

export type GeneratorProps =
	{
		onGenerated: (passwords: string[]) => void;
	};

const advancedPassphraseSelected = storage.defineItem<boolean>("sync:AdvancedPassphraseSelected", { fallback: false });

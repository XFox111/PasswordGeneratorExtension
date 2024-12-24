import generatePassphrase, { PassphraseProps } from "@/utils/generators/generatePassphrase";
import infoLabel from "@/utils/infoLabel";
import { Checkbox, Field, Input, InputOnChangeData } from "@fluentui/react-components";
import { ReactElement } from "react";
import GeneratorForm from "../components/GeneratorForm";
import { GeneratorProps } from "../Page";
import { useStyles } from "./PassphraseSection.styles";

export default function PassphraseSection(props: GeneratorProps): ReactElement
{
	const [wordCount, private_setWordCount] = useState<number | null>(2);
	const [swapCharacters, setSwapCharacters] = useState<boolean>(false);
	const [separate, setSeparate] = useState<boolean>(true);
	const [separator, setSeparator] = useState<string>("");
	const [allowRepeating, setAllowRepeating] = useState<boolean>(false);
	const [randomizeCase, setRandomizeCase] = useState<boolean>(false);

	const config = useMemo<PassphraseProps>(() => ({
		wordCount: wordCount ?? 2,
		allowRepeating,
		swapCharacters,
		randomizeCase,
		separator: separate ? (separator ? separator : " ") : ""
	}), [wordCount, allowRepeating, swapCharacters, randomizeCase, separate, separator]);

	const cls = useStyles();

	const setWordCount = useCallback((_: any, e: InputOnChangeData) =>
	{
		const n = parseInt(e.value ?? "");
		private_setWordCount(isNaN(n) || n < 1 ? null : Math.min(n, 100));
	}, []);

	const saveConfiguration = useCallback(
		async () => await browser.storage.sync.set({ AdvancedPassphraseOptions: config }),
		[config]
	);

	const generate = useCallback((count: number) =>
	{
		const passwords: string[] = [];

		for (let i = 0; i < count; i++)
			passwords.push(generatePassphrase(config));

		props.onGenerated(passwords);
	}, [config, props.onGenerated]);

	useEffect(() =>
	{
		browser.storage.sync.get("AdvancedPassphraseOptions").then(({ AdvancedPassphraseOptions }) =>
		{
			if (!AdvancedPassphraseOptions)
				return;

			private_setWordCount(AdvancedPassphraseOptions.wordCount ?? 2);
			setAllowRepeating(AdvancedPassphraseOptions.allowRepeating);
			setSwapCharacters(AdvancedPassphraseOptions.swapCharacters);
			setRandomizeCase(AdvancedPassphraseOptions.randomizeCase);
			setSeparate(!!AdvancedPassphraseOptions.separator);
			setSeparator(AdvancedPassphraseOptions.separator ?? "");
		});
	}, []);

	return (
		<GeneratorForm onGenerate={ generate } onSave={ saveConfiguration }>
			<div className={ cls.root }>
				<Field label={ i18n.t("advanced.passphrase.length") }>
					<Input value={ wordCount?.toString() ?? "" } onChange={ setWordCount } />
				</Field>
				<div className={ cls.checkboxes }>
					<Checkbox label={ i18n.t("advanced.passphrase.replace") }
						checked={ swapCharacters } onChange={ (_, e) => setSwapCharacters(e.checked as boolean) } />
					<Checkbox label={ i18n.t("advanced.passphrase.random_case") }
						checked={ randomizeCase } onChange={ (_, e) => setRandomizeCase(e.checked as boolean) } />
					<Checkbox label={ infoLabel(i18n.t("advanced.passphrase.allow_repat.label"), i18n.t("advanced.passphrase.allow_repat.hint")) }
						checked={ allowRepeating } onChange={ (_, e) => setAllowRepeating(e.checked as boolean) } />

					<div>
						<Checkbox label={ infoLabel(i18n.t("advanced.passphrase.separate_words.label"), i18n.t("advanced.passphrase.separate_words.hint")) }
							checked={ separate } onChange={ (_, e) => setSeparate(e.checked as boolean) } />
						<Input disabled={ !separate } size="small"
							value={ separator } onChange={ (_, e) => setSeparator(e.value) } />
					</div>
				</div>
			</div>
		</GeneratorForm>
	);
}

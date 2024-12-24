import { CharacterHints, generatePassword, PasswordProps } from "@/utils/generators/generatePassword";
import { Checkbox, CheckboxProps, Field, Input, InputOnChangeData, InputProps, makeStyles, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow, Text, Tooltip } from "@fluentui/react-components";
import { ReactElement } from "react";
import { GeneratorProps } from "../Page";
import GeneratorForm from "../components/GeneratorForm";
import infoLabel from "@/utils/infoLabel";

// TODO: needs refactoring
export default function PasswordSection(props: GeneratorProps): ReactElement
{
	const [length, private_setLength] = useState<number | null>(8);
	const [enableUppercase, setEnableUppercase] = useState<boolean>(true);
	const [uppercaseCount, setUppercaseCount] = useState<number | null>(1);
	const [enableLowercase, setEnableLowercase] = useState<boolean>(true);
	const [lowercaseCount, setLowercaseCount] = useState<number | null>(1);
	const [enableNumeric, setEnableNumeric] = useState<boolean>(true);
	const [numericCount, setNumericCount] = useState<number | null>(1);
	const [enableSpecial, setEnableSpecial] = useState<boolean>(true);
	const [specialCount, setSpecialCount] = useState<number | null>(1);
	const [enableCustom, setEnableCustom] = useState<boolean>(false);
	const [customCount, setCustomCount] = useState<number | null>(1);

	const [excludeSimilar, setExcludeSimilar] = useState<boolean>(true);
	const [excludeAmbiguous, setExcludeAmbiguous] = useState<boolean>(true);
	const [excludeRepeating, setExcludeRepeating] = useState<boolean>(false);
	const [excludeCustom, setExcludeCustom] = useState<boolean>(false);

	const [excludeCustomSet, setExcludeCustomSet] = useState<string>("");
	const [customSet, setCustomSet] = useState<string>("");

	const config: PasswordProps =
	{
		length: length ?? 8,
		custom: enableCustom ? customCount ?? 1 : 0,
		customSet: customSet,
		numeric: enableNumeric ? numericCount ?? 1 : 0,
		special: enableSpecial ? specialCount ?? 1 : 0,
		uppercase: enableUppercase ? uppercaseCount ?? 1 : 0,
		lowercase: enableLowercase ? lowercaseCount ?? 1 : 0,
		excludeAmbiguous,
		excludeCustom: excludeCustom ? excludeCustomSet : "",
		excludeRepeating,
		excludeSimilar,
	};

	const cls = useStyles();

	const setLength = useCallback((_: any, e: InputOnChangeData) =>
	{
		const n = parseInt(e.value ?? "");
		private_setLength(isNaN(n) || n < 1 ? null : n);
	}, []);

	const saveConfiguration = useCallback(
		async () => await browser.storage.sync.set({ AdvancedPasswordOptions: config }),
		[config]
	);

	const generate = useCallback((count: number) =>
	{
		const passwords: string[] = [];

		for (let i = 0; i < count; i++)
			passwords.push(generatePassword(config));

		props.onGenerated(passwords);
	}, [config, props.onGenerated]);

	return (
		<GeneratorForm onGenerate={ generate } onSave={ saveConfiguration }>
			<Field label={ i18n.t("advanced.password.length") }>
				<Input value={ length?.toString() ?? "" } onChange={ setLength } />
			</Field>
			<Table size="small" as="div">
				<TableHeader as="div">
					<TableRow as="div">
						<TableHeaderCell as="div">{ i18n.t("common.sections.include") }</TableHeaderCell>
						<TableHeaderCell as="div">{ i18n.t("advanced.password.min_of_type") }</TableHeaderCell>
					</TableRow>
				</TableHeader>
				<TableBody as="div">
					<Row>
						<Checkbox label={ i18n.t("common.characters.uppercase") } { ...checkboxControls(enableUppercase, setEnableUppercase) } />
						<Input { ...minInputControls(enableUppercase, uppercaseCount, setUppercaseCount) } />
					</Row>
					<Row>
						<Checkbox label={ i18n.t("common.characters.lowercase") } { ...checkboxControls(enableLowercase, setEnableLowercase) } />
						<Input { ...minInputControls(enableLowercase, lowercaseCount, setLowercaseCount) } />
					</Row>
					<Row>
						<Checkbox label={ i18n.t("common.characters.numeric") } { ...checkboxControls(enableNumeric, setEnableNumeric) } />
						<Input { ...minInputControls(enableNumeric, numericCount, setNumericCount) } />
					</Row>
					<Row>
						<Checkbox label={ infoLabel(i18n.t("common.characters.special"), CharacterHints.special) } { ...checkboxControls(enableSpecial, setEnableSpecial) } />
						<Input { ...minInputControls(enableSpecial, specialCount, setSpecialCount) } />
					</Row>
					<Row>
						<>
							<Checkbox { ...checkboxControls(enableCustom, setEnableCustom) } />
							<Tooltip relationship="label" content={ i18n.t("common.characters.custom") }>
								<Input size="small" disabled={ !enableCustom }
									value={ customSet } onChange={ (_, e) => setCustomSet(e.value) } />
							</Tooltip>
						</>
						<Input { ...minInputControls(enableCustom, customCount, setCustomCount) } />
					</Row>
				</TableBody>
			</Table>

			<section className={ cls.section }>
				<Text>{ i18n.t("common.sections.exclude") }</Text>
				<Checkbox label={ infoLabel(i18n.t("common.characters.similar"), CharacterHints.similar) } { ...checkboxControls(excludeSimilar, setExcludeSimilar) } />
				<Checkbox label={ infoLabel(i18n.t("common.characters.ambiguous"), CharacterHints.ambiguous) } disabled={ !enableSpecial } { ...checkboxControls(excludeAmbiguous, setExcludeAmbiguous) } />
				<Checkbox label={ infoLabel(i18n.t("common.characters.repeating.label"), i18n.t("common.characters.repeating.hint")) } { ...checkboxControls(excludeRepeating, setExcludeRepeating) } />
				<div>
					<Checkbox label={ i18n.t("common.characters.custom") } { ...checkboxControls(excludeCustom, setExcludeCustom) } />
					<Input size="small" disabled={ !excludeCustom }
						value={ excludeCustomSet } onChange={ (_, e) => setExcludeCustomSet(e.value) } />
				</div>
			</section>
		</GeneratorForm>
	);
}

function checkboxControls(checked: boolean, onChange: (checked: boolean) => void): Partial<CheckboxProps>
{
	return ({
		checked,
		onChange: (_, e) => onChange(e.checked as boolean)
	});
}

function minInputControls(enabled: boolean, value: number | null, onChange: (value: number | null) => void): Partial<InputProps>
{
	function parseCount(value: string): number | null
	{
		const n = parseInt(value);
		return isNaN(n) || n < 1 ? null : Math.min(n, 100);
	};

	return ({
		size: "small",
		disabled: !enabled,
		value: value?.toString() ?? "",
		onChange: (_, e) => onChange(parseCount(e.value))
	});
}

function Row(props: { children: ReactElement[]; }): ReactElement
{
	return (
		<TableRow as="div">
			{ props.children.map((i, index) =>
				<TableCell key={ index } as="div">
					{ i }
				</TableCell>
			) }
		</TableRow>
	);
}

const useStyles = makeStyles({
	section:
	{
		display: "flex",
		flexDirection: "column",
	},
});

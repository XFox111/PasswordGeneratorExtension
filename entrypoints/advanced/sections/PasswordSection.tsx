import { CharacterHints, generatePassword } from "@/utils/generators/generatePassword";
import infoLabel from "@/utils/infoLabel";
import * as fui from "@fluentui/react-components";
import { ReactElement } from "react";
import { GeneratorProps } from "../Page";
import GeneratorForm from "../components/GeneratorForm";
import { DEFAULT_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from "@/utils/constants";

// TODO: needs refactoring
export default function PasswordSection(props: GeneratorProps): ReactElement
{
	const [state, private_setState] = useState<PasswordSectionState>({
		length: DEFAULT_PASSWORD_LENGTH,
		enableUppercase: true, uppercaseCount: 1,
		enableLowercase: true, lowercaseCount: 1,
		enableNumeric: true, numericCount: 1,
		enableSpecial: true, specialCount: 1,
		enableCustom: false, customCount: 1, customSet: "",

		excludeSimilar: true,
		excludeAmbiguous: true,
		excludeRepeating: false,
		excludeCustom: false, excludeCustomSet: "",

		enableSeparator: false,
		separator: "-",
		separatorInterval: DEFAULT_PASSWORD_LENGTH / 2
	});

	const cls = useStyles();

	const setState = useCallback((newState: Partial<PasswordSectionState>) =>
	{
		private_setState({ ...state, ...newState });
	}, [state]);

	const setLength = useCallback((_: any, e: fui.InputOnChangeData) =>
	{
		const n = parseInt(e.value ?? "", 10);
		setState({ length: isNaN(n) || n < 1 ? null : Math.min(n, MAX_PASSWORD_LENGTH) });
	}, [setState]);

	const saveConfiguration = useCallback(
		async () => await browser.storage.sync.set({ AdvancedPasswordOptions: state }),
		[state]
	);

	const generate = useCallback((count: number) =>
	{
		const passwords: string[] = [];

		for (let i = 0; i < count; i++)
			passwords.push(generatePassword({
				length: state.length ?? DEFAULT_PASSWORD_LENGTH,
				custom: state.enableCustom ? state.customCount ?? 1 : 0,
				customSet: state.customSet,
				numeric: state.enableNumeric ? state.numericCount ?? 1 : 0,
				special: state.enableSpecial ? state.specialCount ?? 1 : 0,
				uppercase: state.enableUppercase ? state.uppercaseCount ?? 1 : 0,
				lowercase: state.enableLowercase ? state.lowercaseCount ?? 1 : 0,
				excludeAmbiguous: state.excludeAmbiguous,
				excludeCustom: state.excludeCustom ? state.excludeCustomSet : "",
				excludeRepeating: state.excludeRepeating,
				excludeSimilar: state.excludeSimilar,
				separator: state.enableSeparator ? state.separator : undefined,
				separatorInterval: state.separatorInterval ?? (DEFAULT_PASSWORD_LENGTH / 2)
			}));

		props.onGenerated(passwords);
	}, [state, props.onGenerated]);

	useEffect(() =>
	{
		browser.storage.sync.get("AdvancedPasswordOptions").then(({ AdvancedPasswordOptions }) =>
			private_setState({ ...state, ...AdvancedPasswordOptions as PasswordSectionState }));
	}, []);

	const checkboxControls = useCallback((key: keyof PasswordSectionState): Partial<fui.CheckboxProps> => ({
		checked: state[key] as boolean,
		onChange: (_, e) => setState({ [key]: e.checked as boolean })
	}), [state]);

	const minInputControls = useCallback((enabledKey: keyof PasswordSectionState, key: keyof PasswordSectionState): Partial<fui.InputProps> => ({
		size: "small",
		disabled: !state[enabledKey],
		value: state[key]?.toString() ?? "",
		onChange: (_, e) => setState({ [key]: parseCount(e.value) })
	}), [state]);

	const setSeparatorInterval = (_: any, e: fui.InputOnChangeData) =>
	{
		if (!e.value)
		{
			setState({ separatorInterval: undefined });
			return;
		}

		const n = parseInt(e.value);

		if (!isNaN(n))
			setState({ separatorInterval: n < 1 ? 1 : Math.min(n, state.length ?? DEFAULT_PASSWORD_LENGTH) });
	};

	const updateLength = (): void =>
	{
		const minLength = Math.max(MIN_PASSWORD_LENGTH,
			(state.enableCustom ? state.customCount ?? 1 : 0) +
			(state.enableNumeric ? state.numericCount ?? 1 : 0) +
			(state.enableSpecial ? state.specialCount ?? 1 : 0) +
			(state.enableUppercase ? state.uppercaseCount ?? 1 : 0) +
			(state.enableLowercase ? state.lowercaseCount ?? 1 : 0)
		);

		if (!state.length || state.length < minLength)
			setState({ length: minLength });
	};

	return (
		<GeneratorForm onGenerate={ generate } onSave={ saveConfiguration }>
			<fui.Field label={ i18n.t("advanced.password.length") }>
				<fui.Input value={ state.length?.toString() ?? "" } onChange={ setLength } onBlur={ updateLength } />
			</fui.Field>
			<fui.Table size="small" as="div">
				<fui.TableHeader as="div">
					<fui.TableRow as="div">
						<fui.TableHeaderCell as="div">{ i18n.t("common.sections.include") }</fui.TableHeaderCell>
						<fui.TableHeaderCell as="div">{ i18n.t("advanced.password.min_of_type") }</fui.TableHeaderCell>
					</fui.TableRow>
				</fui.TableHeader>
				<fui.TableBody as="div">
					<Row>
						<fui.Checkbox label={ i18n.t("common.characters.uppercase") } { ...checkboxControls("enableUppercase") } />
						<fui.Input { ...minInputControls("enableUppercase", "uppercaseCount") } onBlur={ updateLength } />
					</Row>
					<Row>
						<fui.Checkbox label={ i18n.t("common.characters.lowercase") } { ...checkboxControls("enableLowercase") } />
						<fui.Input { ...minInputControls("enableLowercase", "lowercaseCount") } onBlur={ updateLength } />
					</Row>
					<Row>
						<fui.Checkbox label={ i18n.t("common.characters.numeric") } { ...checkboxControls("enableNumeric") } />
						<fui.Input { ...minInputControls("enableNumeric", "numericCount") } onBlur={ updateLength } />
					</Row>
					<Row>
						<fui.Checkbox label={ infoLabel(i18n.t("common.characters.special"), CharacterHints.special, true) } { ...checkboxControls("enableSpecial") } />
						<fui.Input { ...minInputControls("enableSpecial", "specialCount") } onBlur={ updateLength } />
					</Row>
					<Row>
						<>
							<fui.Checkbox { ...checkboxControls("enableCustom") } />
							<fui.Input size="small" disabled={ !state.enableCustom }
								placeholder={ i18n.t("common.characters.custom") }
								value={ state.customSet } onChange={ (_, e) => setState({ customSet: e.value }) } />
						</>
						<fui.Input { ...minInputControls("enableCustom", "customCount") } onBlur={ updateLength } />
					</Row>
				</fui.TableBody>
			</fui.Table>

			<section className={ cls.section }>
				<fui.Text>{ i18n.t("common.sections.exclude") }</fui.Text>
				<fui.Checkbox label={ infoLabel(i18n.t("common.characters.similar"), CharacterHints.similar) } { ...checkboxControls("excludeSimilar") } />
				<fui.Checkbox label={ infoLabel(i18n.t("common.characters.ambiguous"), CharacterHints.ambiguous) } disabled={ !state.enableSpecial } { ...checkboxControls("excludeAmbiguous") } />
				<fui.Checkbox label={ infoLabel(i18n.t("common.characters.repeating.label"), i18n.t("common.characters.repeating.hint")) } { ...checkboxControls("excludeRepeating") } />
				<div>
					<fui.Checkbox { ...checkboxControls("excludeCustom") } />
					<fui.Input size="small" disabled={ !state.excludeCustom }
						placeholder={ i18n.t("common.characters.custom") }
						value={ state.excludeCustomSet } onChange={ (_, e) => setState({ excludeCustomSet: e.value }) } />
				</div>
			</section>

			<div>
				<fui.Checkbox
					{ ...checkboxControls("enableSeparator") }
					label={
						<span className={ cls.separatorLabel }>
							{ i18n.t("advanced.password.separator1") }
							<fui.Input size="small" className={ cls.separatorInput }
								disabled={ !state.enableSeparator }
								value={ state.separator ?? "" }
								onChange={ (_, e) => setState({ separator: e.value ? e.value[e.value.length - 1] : undefined }) } />
							{ i18n.t("advanced.password.separator2") }
							<fui.Input size="small" className={ cls.separatorInput }
								disabled={ !state.enableSeparator }
								value={ state.separatorInterval?.toString() ?? "" }
								onBlur={ () => state.separatorInterval ? null : setState({ separatorInterval: DEFAULT_PASSWORD_LENGTH / 2 }) }
								onChange={ setSeparatorInterval } />
							{ i18n.t("advanced.password.separator3") }
						</span>
					} />
			</div>
		</GeneratorForm>
	);
}

function parseCount(value: string): number | null
{
	const n = parseInt(value);
	return isNaN(n) || n < 1 ? null : Math.min(n, 100);
};

function Row(props: { children: ReactElement[]; }): ReactElement
{
	return (
		<fui.TableRow as="div">
			{ props.children.map((i, index) =>
				<fui.TableCell key={ index } as="div">
					{ i }
				</fui.TableCell>
			) }
		</fui.TableRow>
	);
}

const useStyles = fui.makeStyles({
	section:
	{
		display: "flex",
		flexDirection: "column",
	},
	separatorLabel:
	{
		display: "inline-flex",
		flexWrap: "wrap",
		alignItems: "center",
		gap: `${fui.tokens.spacingVerticalXXS} ${fui.tokens.spacingHorizontalS}`,
	},
	separatorInput:
	{
		width: "4em",
	}
});

type PasswordSectionState =
	{
		length: number | null;
		enableUppercase: boolean;
		uppercaseCount: number | null;
		enableLowercase: boolean;
		lowercaseCount: number | null;
		enableNumeric: boolean;
		numericCount: number | null;
		enableSpecial: boolean;
		specialCount: number | null;
		enableCustom: boolean;
		customCount: number | null;

		excludeSimilar: boolean;
		excludeAmbiguous: boolean;
		excludeRepeating: boolean;
		excludeCustom: boolean;

		excludeCustomSet: string;
		customSet: string;

		enableSeparator: boolean;
		separator?: string;
		separatorInterval?: number;
	};

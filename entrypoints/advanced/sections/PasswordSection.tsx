import { CharacterHints, generatePassword } from "@/utils/generators/generatePassword";
import infoLabel from "@/utils/infoLabel";
import * as fui from "@fluentui/react-components";
import { ReactElement } from "react";
import { GeneratorProps } from "../Page";
import GeneratorForm from "../components/GeneratorForm";

// TODO: needs refactoring
export default function PasswordSection(props: GeneratorProps): ReactElement
{
	const [state, private_setState] = useState<PasswordSectionState>({
		length: 8,
		enableUppercase: true, uppercaseCount: 1,
		enableLowercase: true, lowercaseCount: 1,
		enableNumeric: true, numericCount: 1,
		enableSpecial: true, specialCount: 1,
		enableCustom: false, customCount: 1, customSet: "",

		excludeSimilar: true,
		excludeAmbiguous: true,
		excludeRepeating: false,
		excludeCustom: false, excludeCustomSet: ""
	});

	const cls = useStyles();

	const setState = useCallback((newState: Partial<PasswordSectionState>) =>
	{
		private_setState({ ...state, ...newState });
	}, [state]);

	const setLength = useCallback((_: any, e: fui.InputOnChangeData) =>
	{
		const n = parseInt(e.value ?? "");
		setState({ length: isNaN(n) || n < 1 ? null : n });
	}, [state]);

	const saveConfiguration = useCallback(
		async () => await browser.storage.sync.set({ AdvancedPasswordOptions: state }),
		[state]
	);

	const generate = useCallback((count: number) =>
	{
		const passwords: string[] = [];

		for (let i = 0; i < count; i++)
			passwords.push(generatePassword({
				length: state.length ?? 8,
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

	return (
		<GeneratorForm onGenerate={ generate } onSave={ saveConfiguration }>
			<fui.Field label={ i18n.t("advanced.password.length") }>
				<fui.Input value={ state.length?.toString() ?? "" } onChange={ setLength } />
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
						<fui.Input { ...minInputControls("enableUppercase", "uppercaseCount") } />
					</Row>
					<Row>
						<fui.Checkbox label={ i18n.t("common.characters.lowercase") } { ...checkboxControls("enableLowercase") } />
						<fui.Input { ...minInputControls("enableLowercase", "lowercaseCount") } />
					</Row>
					<Row>
						<fui.Checkbox label={ i18n.t("common.characters.numeric") } { ...checkboxControls("enableNumeric") } />
						<fui.Input { ...minInputControls("enableNumeric", "numericCount") } />
					</Row>
					<Row>
						<fui.Checkbox label={ infoLabel(i18n.t("common.characters.special"), CharacterHints.special) } { ...checkboxControls("enableSpecial") } />
						<fui.Input { ...minInputControls("enableSpecial", "specialCount") } />
					</Row>
					<Row>
						<>
							<fui.Checkbox { ...checkboxControls("enableCustom") } />
							<fui.Input size="small" disabled={ !state.enableCustom }
								placeholder={ i18n.t("common.characters.custom") }
								value={ state.customSet } onChange={ (_, e) => setState({ customSet: e.value }) } />
						</>
						<fui.Input { ...minInputControls("enableCustom", "customCount") } />
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
	};

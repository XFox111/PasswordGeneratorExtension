import { CharacterHints } from "@/utils/PasswordGenerator";
import { ExtensionOptions, GeneratorOptions, useStorage } from "@/utils/storage";
import * as fui from "@fluentui/react-components";
import { ArrowUndoRegular, SettingsRegular } from "@fluentui/react-icons";
import { useStyles } from "./SettingsSection.styles";

// FIXME: Remove ts-ignore comments once slots override fix is released
// Tracker: https://github.com/microsoft/fluentui/issues/27090
const infoLabel = (content: string, hint: string) => ({
	children: (_: unknown, slotProps: fui.LabelProps) => (
		<fui.InfoLabel { ...slotProps } info={ hint }>{ content }</fui.InfoLabel>
	)
});

const defaultOptions =
{
	generator: new GeneratorOptions(),
	extension: new ExtensionOptions()
};

const SettingsSection: React.FC = () =>
{
	const { extOptions, generatorOptions, updateStorage } = useStorage();
	const cls = useStyles();

	const resetRange = useCallback(() =>
	{
		updateStorage({
			MinLength: defaultOptions.extension.MinLength,
			MaxLength: defaultOptions.extension.MaxLength
		});
	}, []);

	const setOption = (option: keyof (GeneratorOptions & ExtensionOptions)) =>
		(_: unknown, args: fui.CheckboxOnChangeData) =>
			updateStorage({ [option]: args.checked });

	const updateNumberField = (key: keyof (ExtensionOptions & GeneratorOptions), defaultValue: number) =>
		(_: unknown, e: fui.InputOnChangeData): void =>
		{
			if (e.value.length >= 1)
			{
				const value = parseInt(e.value);

				if (!isNaN(value) && value >= 0)
					updateStorage({ [key]: value });
			}
			else
				updateStorage({ [key]: defaultValue });
		};

	return (
		<fui.AccordionItem value="settings">
			<fui.AccordionHeader as="h2" icon={ <SettingsRegular /> }>{ i18n.t("settings.title") }</fui.AccordionHeader>

			<fui.AccordionPanel className={ cls.root }>

				<fui.Field label={ i18n.t("settings.length.title") } hint={ i18n.t("settings.length.hint") }>
					<fui.Input
						value={ generatorOptions.Length.toString() }
						onChange={ updateNumberField("Length", 0) } />
				</fui.Field>

				<fui.Field label={ i18n.t("settings.quick_range") }>
					<div className={ cls.rangeContainer }>
						<fui.Input
							input={ { className: cls.rangeInput } }
							value={ extOptions.MinLength.toString() }
							onChange={ updateNumberField("MinLength", defaultOptions.extension.MinLength) } />

						<fui.Divider />

						<fui.Input
							input={ { className: cls.rangeInput } }
							value={ extOptions.MaxLength.toString() }
							onChange={ updateNumberField("MaxLength", defaultOptions.extension.MaxLength) } />

						<fui.Tooltip relationship="label" content={ i18n.t("common.reset") }>
							<fui.Button
								appearance="subtle" icon={ <ArrowUndoRegular /> }
								onClick={ resetRange } />
						</fui.Tooltip>
					</div>
				</fui.Field>

				<fui.Divider />

				<fui.Text>{ i18n.t("settings.include.title") }</fui.Text>
				<div className={ cls.checkboxContainer }>
					<fui.Checkbox label={ i18n.t("settings.include.uppercase") }
						checked={ generatorOptions.Uppercase }
						onChange={ setOption("Uppercase") } />
					<fui.Checkbox
						label={ i18n.t("settings.include.lowercase") }
						checked={ generatorOptions.Lowercase }
						onChange={ setOption("Lowercase") } />
					<fui.Checkbox
						label={ i18n.t("settings.include.numeric") }
						checked={ generatorOptions.Numeric }
						onChange={ setOption("Numeric") } />
					<fui.Checkbox
						label={ i18n.t("settings.include.special") }
						checked={ generatorOptions.Special }
						onChange={ setOption("Special") } />
				</div>

				<fui.Text>{ i18n.t("settings.exclude.title") }</fui.Text>
				<div className={ cls.checkboxContainer }>
					<fui.Checkbox
						// @ts-expect-error See FIXME
						label={ infoLabel(i18n.t("settings.exclude.similar"), CharacterHints.Similar) }
						checked={ generatorOptions.ExcludeSimilar }
						onChange={ setOption("ExcludeSimilar") } />
					<fui.Checkbox
						// @ts-expect-error See FIXME
						label={ infoLabel(i18n.t("settings.exclude.ambiguous"), CharacterHints.Ambiguous) }
						disabled={ !generatorOptions.Special }
						checked={ generatorOptions.ExcludeAmbiguous }
						onChange={ setOption("ExcludeAmbiguous") } />
					<fui.Checkbox
						// @ts-expect-error See FIXME
						label={ infoLabel(i18n.t("settings.exclude.repeating.title"), i18n.t("settings.exclude.repeating.hint")) }
						checked={ generatorOptions.ExcludeRepeating }
						onChange={ setOption("ExcludeRepeating") } />
				</div>

				<fui.Checkbox
					label={ i18n.t("settings.context_menu") }
					checked={ extOptions.ContextMenu }
					onChange={ setOption("ContextMenu") } />

			</fui.AccordionPanel>

		</fui.AccordionItem>
	);
};

export default SettingsSection;

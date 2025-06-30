import { CharacterHints } from "@/utils/generators/generatePassword";
import { ExtensionOptions, GeneratorOptions, useStorage } from "@/utils/storage";
import * as fui from "@fluentui/react-components";
import { ArrowUndoRegular } from "@fluentui/react-icons";
import { ReactElement } from "react";
import infoLabel from "../../utils/infoLabel";
import { useStyles } from "./SettingsSection.styles";

export default function SettingsSection(): ReactElement
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

	const validateMinLimit = () =>
	{
		if (extOptions.MinLength < 4)
			updateStorage({ MinLength: 4 });
		else if (extOptions.MinLength > 511)
			updateStorage({ MinLength: 511, MaxLength: 512 });
		else if (extOptions.MinLength >= extOptions.MaxLength)
			updateStorage({ MaxLength: extOptions.MinLength + 1 });
	};

	const validateMaxLimit = () =>
	{
		if (extOptions.MaxLength > 512)
			updateStorage({ MaxLength: 512 });
		else if (extOptions.MaxLength < 5)
			updateStorage({ MinLength: 4, MaxLength: 5 });
		else if (extOptions.MaxLength <= extOptions.MinLength)
			updateStorage({ MinLength: extOptions.MaxLength - 1 });
	};

	const validateLength = () =>
	{
		updateStorage({ Length: Math.max(Math.min(generatorOptions.Length, extOptions.MaxLength), extOptions.MinLength) });
	};

	return (
		<section className={ cls.root }>

			<fui.Field label={ i18n.t("settings.length.title") } hint={ i18n.t("settings.length.hint") }>
				<fui.Input
					value={ generatorOptions.Length.toString() }
					onBlur={ validateLength }
					onChange={ updateNumberField("Length", 0) } />
			</fui.Field>

			<fui.Field label={ i18n.t("settings.quick_range") }>
				<div className={ cls.rangeContainer }>
					<fui.Input
						input={ { className: cls.rangeInput } }
						value={ extOptions.MinLength.toString() }
						onBlur={ validateMinLimit }
						onChange={ updateNumberField("MinLength", defaultOptions.extension.MinLength) } />

					<fui.Divider />

					<fui.Input
						input={ { className: cls.rangeInput } }
						value={ extOptions.MaxLength.toString() }
						onBlur={ validateMaxLimit }
						onChange={ updateNumberField("MaxLength", defaultOptions.extension.MaxLength) } />

					<fui.Tooltip relationship="label" content={ i18n.t("common.actions.reset") }>
						<fui.Button
							appearance="subtle" icon={ <ArrowUndoRegular /> }
							onClick={ resetRange } />
					</fui.Tooltip>
				</div>
			</fui.Field>

			<fui.Divider className={ cls.divider } />

			<fui.Text>{ i18n.t("common.sections.include") }</fui.Text>
			<div className={ cls.checkboxContainer }>
				<fui.Checkbox label={ i18n.t("common.characters.uppercase") }
					checked={ generatorOptions.Uppercase }
					onChange={ setOption("Uppercase") } />
				<fui.Checkbox
					label={ i18n.t("common.characters.lowercase") }
					checked={ generatorOptions.Lowercase }
					onChange={ setOption("Lowercase") } />
				<fui.Checkbox
					label={ i18n.t("common.characters.numeric") }
					checked={ generatorOptions.Numeric }
					onChange={ setOption("Numeric") } />
				<fui.Checkbox
					label={ infoLabel(i18n.t("common.characters.special"), CharacterHints.special, true) }
					checked={ generatorOptions.Special }
					onChange={ setOption("Special") } />
				<div>
					<fui.Checkbox checked={ generatorOptions.Custom } onChange={ setOption("Custom") } />
					<fui.Input size="small" placeholder={ i18n.t("common.characters.custom") }
						value={ generatorOptions.IncludeCustomSet }
						onChange={ (_, e) => updateStorage({ IncludeCustomSet: e.value }) } />
				</div>
			</div>

			<fui.Text>{ i18n.t("common.sections.exclude") }</fui.Text>
			<div className={ cls.checkboxContainer }>
				<fui.Checkbox
					label={ infoLabel(i18n.t("common.characters.similar"), CharacterHints.similar) }
					checked={ generatorOptions.ExcludeSimilar }
					onChange={ setOption("ExcludeSimilar") } />
				<fui.Checkbox
					label={ infoLabel(i18n.t("common.characters.ambiguous"), CharacterHints.ambiguous) }
					disabled={ !generatorOptions.Special }
					checked={ generatorOptions.ExcludeAmbiguous }
					onChange={ setOption("ExcludeAmbiguous") } />
				<fui.Checkbox
					label={ infoLabel(i18n.t("common.characters.repeating.label"), i18n.t("common.characters.repeating.hint")) }
					checked={ generatorOptions.ExcludeRepeating }
					onChange={ setOption("ExcludeRepeating") } />
				<div>
					<fui.Checkbox checked={ generatorOptions.ExcludeCustom } onChange={ setOption("ExcludeCustom") } />
					<fui.Input size="small" placeholder={ i18n.t("common.characters.custom") }
						value={ generatorOptions.ExcludeCustomSet }
						onChange={ (_, e) => updateStorage({ ExcludeCustomSet: e.value }) } />
				</div>
			</div>
		</section>
	);
};

const defaultOptions =
{
	generator: new GeneratorOptions(),
	extension: new ExtensionOptions()
};

import * as fui from "@fluentui/react-components";
import { ArrowUndoRegular, SettingsRegular } from "@fluentui/react-icons";
import ExtensionOptions from "../Models/ExtensionOptions";
import GeneratorOptions from "../Models/GeneratorOptions";
import { GetLocaleString as loc } from "../Utils/Localization";
import { CharacterHints } from "../Utils/PasswordGenerator";
import { useStorage } from "../Utils/Storage";
import { useStyles } from "./SettingsSection.styles";

// FIXME: Remove ts-ignore comments once slots override fix is released
// Tracker: https://github.com/microsoft/fluentui/issues/27090

export default function SettingsSection(): JSX.Element
{
	const { extOptions, generatorOptions, updateStorage } = useStorage();
	const cls = useStyles();

	const infoLabel = (content: string, hint: string) => ({
		children: (_: unknown, slotProps: fui.LabelProps) => (
			<fui.InfoLabel { ...slotProps } info={ hint }>{ content }</fui.InfoLabel>
		)
	});

	const setOption = (option: keyof (GeneratorOptions & ExtensionOptions)) =>
		(_: unknown, args: fui.CheckboxOnChangeData) =>
			updateStorage({ [option]: args.checked } );

	const updateNumberField = (key: keyof (ExtensionOptions & GeneratorOptions), defaultValue: number) =>
		(_: unknown, e: fui.InputOnChangeData): void =>
		{
			if (e.value.length < 1)
			{
				updateStorage({ [key]: defaultValue });
				return;
			}

			const value = parseInt(e.value);

			if (!isNaN(value) && value >= 0)
				updateStorage({ [key]: value });
		};

	return (
		<fui.AccordionItem value="settings">
			<fui.AccordionHeader as="h2" icon={ <SettingsRegular /> }>{ loc("settings@title") }</fui.AccordionHeader>

			<fui.AccordionPanel className={ cls.root }>

				<fui.Field label={ loc("settings@length") } hint={ loc("settings@length__hint") }>
					<fui.Input
						value={ generatorOptions.Length.toString() }
						onChange={ updateNumberField("Length", 0) } />
				</fui.Field>

				<fui.Field label={ loc("settings@lengthRange") }>
					<div className={ cls.rangeContainer }>
						<fui.Input
							input={ { className: cls.rangeInput } }
							value={ extOptions.MinLength.toString() }
							onChange={ updateNumberField("MinLength", 4) } />

						<fui.Divider />

						<fui.Input
							input={ { className: cls.rangeInput } }
							value={ extOptions.MaxLength.toString() }
							onChange={ updateNumberField("MaxLength", 32) } />

						<fui.Tooltip relationship="label" content={ loc("generator@reset") }>
							<fui.Button
								appearance="subtle" icon={ <ArrowUndoRegular /> }
								onClick={ () => updateStorage({ MinLength: 6, MaxLength: 32 }) } />
						</fui.Tooltip>
					</div>
				</fui.Field>

				<fui.Divider />

				<fui.Text>{ loc("settings@include") }</fui.Text>
				<div className={ cls.checkboxContainer }>
					<fui.Checkbox label={ loc("settings@uppercase") }
						checked={ generatorOptions.Uppercase }
						onChange={ setOption("Uppercase") } />
					<fui.Checkbox
						label={ loc("settings@lowercase") }
						checked={ generatorOptions.Lowercase }
						onChange={ setOption("Lowercase") } />
					<fui.Checkbox
						label={ loc("settings@numeric") }
						checked={ generatorOptions.Numeric }
						onChange={ setOption("Numeric") } />
					<fui.Checkbox
						label={ loc("settings@special") }
						checked={ generatorOptions.Special }
						onChange={ setOption("Special") } />
				</div>

				<fui.Text>{ loc("settings@exclude") }</fui.Text>
				<div className={ cls.checkboxContainer }>
					<fui.Checkbox
						// @ts-expect-error See line 11
						label={ infoLabel(loc("settings@similar"), CharacterHints.Similar) }
						checked={ generatorOptions.ExcludeSimilar }
						onChange={ setOption("ExcludeSimilar") } />
					<fui.Checkbox
						// @ts-expect-error See line 11
						label={ infoLabel(loc("settings@ambiguous"), CharacterHints.Ambiguous) }
						disabled={ !generatorOptions.Special }
						checked={ generatorOptions.ExcludeAmbiguous }
						onChange={ setOption("ExcludeAmbiguous") } />
					<fui.Checkbox
						// @ts-expect-error See line 11
						label={ infoLabel(loc("settings@repeating"), loc("settings@repeating__hint")) }
						checked={ generatorOptions.ExcludeRepeating }
						onChange={ setOption("ExcludeRepeating") } />
				</div>

			</fui.AccordionPanel>

		</fui.AccordionItem>
	);
}

import { AccordionItem, AccordionHeader, AccordionPanel, Label, Text, Input, Divider, Checkbox, Tooltip } from "@fluentui/react-components";
import { QuestionCircleRegular, SettingsRegular } from "@fluentui/react-icons";
import React from "react";
import GeneratorOptions from "../Utils/GeneratorOptions";
import { loc } from "../Utils/Localization";
import Settings from "../Utils/Settings";
import CharacterHelpDialog from "./CharacterHelpDialog";

interface IProps
{
	generatorOptions: GeneratorOptions;
	settings: Settings;
}

export default class SettingsSection extends React.Component<IProps>
{
	public render(): JSX.Element
	{
		let options: GeneratorOptions = this.props.generatorOptions;
		let settings: Settings = this.props.settings;

		return (
			<AccordionItem value="settings">
				<AccordionHeader as="h2" icon={ <SettingsRegular /> }>{ loc("Settings") }</AccordionHeader>
				<AccordionPanel>
					<section className="stack gap fadeIn">
						<Label weight="semibold" htmlFor="pwd-length">{ loc("Password length") }</Label>
						<div className="stack">
							<Input
								id="pwd-length"
								value={ options.Length?.toString() }
								onChange={ (_, e) => GeneratorOptions.Update({ Length: parseInt(e.value) }) }
								type="number" min={ 4 } minLength={ 1 } />
							<Text size={ 200 }>{ loc("Recommended password length") } <b>16-32</b></Text>
						</div>
						<Divider />
						<div className="stack">
							<Text as="h3" weight="semibold">
								{ loc("Character options") }
								<CharacterHelpDialog />
							</Text>

							<Text as="h4">{ loc("Include") }</Text>
							<div className="stack horizontal">
								<Checkbox label={ loc("Special symbols") }
									checked={ options.Special } onChange={ (_, e) => GeneratorOptions.Update({ Special: e.checked as boolean }) } />
								<Checkbox label={ loc("Numeric") }
									checked={ options.Numeric } onChange={ (_, e) => GeneratorOptions.Update({ Numeric: e.checked as boolean }) } />
								<Checkbox label={ loc("Uppercase") }
									checked={ options.Uppercase } onChange={ (_, e) => GeneratorOptions.Update({ Uppercase: e.checked as boolean }) } />
								<Checkbox label={ loc("Lowercase") }
									checked={ options.Lowercase } onChange={ (_, e) => GeneratorOptions.Update({ Lowercase: e.checked as boolean }) } />
							</div>

							<Text as="h4">{ loc("Exclude") }</Text>
							<div className="stack horizontal">
								<Checkbox label={ loc("Similar") }
									checked={ options.ExcludeSimilar } onChange={ (_, e) => GeneratorOptions.Update({ ExcludeSimilar: e.checked as boolean }) } />
								<Checkbox label={ loc("Ambiguous") }
									checked={ options.ExcludeAmbiguous } onChange={ (_, e) => GeneratorOptions.Update({ ExcludeAmbiguous: e.checked as boolean }) } />
								<Checkbox label={ loc("Repeating") }
									checked={ options.ExcludeRepeating } onChange={ (_, e) => GeneratorOptions.Update({ ExcludeRepeating: e.checked as boolean }) } />
							</div>
						</div>
						<Divider />
						<div className="stack">
							<Checkbox
								checked={ settings.AddContext }
								onChange={ (_, e) => Settings.Update({ AddContext: e.checked as boolean }) }
								label={
									<Tooltip content={ loc("Right-click password field to quickly generate password") } relationship="description">
										<Text>{ loc("Add shortcut to context menu") } <QuestionCircleRegular /></Text>
									</Tooltip>
								} />
							<Checkbox label={ loc("Automatically copy to clipboard") }
								checked={ settings.Autocopy } onChange={ (_, e) => Settings.Update({ Autocopy: e.checked as boolean }) } />
						</div>
					</section>
				</AccordionPanel>
			</AccordionItem>
		);
	}
}

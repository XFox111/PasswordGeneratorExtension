import { Button, Checkbox, InfoLabel, Input, MessageBar, MessageBarBody, Slider, Text, Tooltip, mergeClasses } from "@fluentui/react-components";
import { ArrowClockwiseRegular, ArrowUndoRegular, CheckmarkRegular, CopyRegular } from "@fluentui/react-icons";
import { useEffect, useState } from "react";
import GeneratorOptions from "../Models/GeneratorOptions";
import { GetLocaleString as loc } from "../Utils/Localization";
import { GeneratePassword } from "../Utils/PasswordGenerator";
import { useStorage } from "../Utils/Storage";
import { useTimeout } from "../Utils/Timeout";
import { useStyles } from "./GeneratorView.styles";

type QuickOptions = Pick<GeneratorOptions, "Length" | "Special" | "ExcludeAmbiguous">;

export default function GeneratorView(): JSX.Element
{
	const { generatorOptions } = useStorage();
	const [password, setPassword] = useState<string>("");
	const [quickOpts, _setOpts] = useState<QuickOptions>(generatorOptions);
	const [error, setError] = useState<string | null>(null);

	const [refreshTimer, copyTimer] = [useTimeout(310), useTimeout(1000)];
	const cls = useStyles();

	const resetOptions = (): void =>
		_setOpts(generatorOptions);

	const setOptions = (opts: Partial<QuickOptions>) =>
		_setOpts({ ...quickOpts, ...opts });

	function RefreshPassword(): void
	{
		setError(null);
		const options: GeneratorOptions = { ...generatorOptions, ...quickOpts };

		try { setPassword(GeneratePassword(options)); }
		catch (e) { setError((e as Error).message); }
	}

	async function CopyPassword(): Promise<void>
	{
		await window.navigator.clipboard.writeText(password);
		copyTimer.trigger();
	}

	useEffect(resetOptions, [generatorOptions]);
	useEffect(RefreshPassword, [generatorOptions, quickOpts]);
	useEffect(refreshTimer.trigger, [password]);

	const actionButtons: JSX.Element = <>
		<Tooltip content={ loc("generator@copy") } relationship="label">
			<Button
				appearance="subtle" onClick={ CopyPassword }
				icon={
					copyTimer.isActive ?
						<CheckmarkRegular className={ cls.copyIcon } /> :
						<CopyRegular className={ cls.copyIcon } />
				} />
		</Tooltip>

		<Tooltip content={ loc("generator@refresh") } relationship="label">
			<Button
				appearance="subtle" onClick={ RefreshPassword }
				icon={
					<ArrowClockwiseRegular className={ mergeClasses(refreshTimer.isActive && cls.refreshIcon) } />
				} />
		</Tooltip>
	</>;

	return (
		<section className={ cls.root }>
			{ error ?
				<MessageBar intent="warning" className={ cls.msgBar }>
					<MessageBarBody>{ error }</MessageBarBody>
				</MessageBar>
				:
				<Input readOnly contentAfter={ actionButtons } value={ password } className={ cls.input } />
			}

			<div className={ mergeClasses(cls.root, cls.optionsSpacing) }>
				<InfoLabel info={ loc("generator@quickOptions__hint") }>
					{ loc("generator@quickOptions") }
				</InfoLabel>

				<div className={ cls.lengthContainer }>
					<Slider
						min={ 6 } max={ Math.max(32, generatorOptions.Length) }
						value={ quickOpts.Length } onChange={ (_, e) => setOptions({ Length: e.value }) } />
					<Text>{ quickOpts.Length }</Text>
				</div>

				<div>
					<Checkbox
						label={ loc("settings@special") }
						checked={ quickOpts.Special }
						onChange={ (_, e) => setOptions({ Special: e.checked as boolean }) } />
					<Checkbox
						label={ loc("settings@ambiguous") } disabled={ !quickOpts.Special }
						checked={ !quickOpts.ExcludeAmbiguous }
						onChange={ (_, e) => setOptions({ ExcludeAmbiguous: !e.checked }) } />

					<Tooltip content={ loc("generator@reset") } relationship="label">
						<Button appearance="subtle" icon={ <ArrowUndoRegular /> } onClick={ resetOptions } />
					</Tooltip>
				</div>
			</div>
		</section>
	);
}

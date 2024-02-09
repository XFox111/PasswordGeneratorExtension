import * as fui from "@fluentui/react-components";
import * as Icons from "@fluentui/react-icons";
import { useEffect, useState } from "react";
import GeneratorOptions from "../Models/GeneratorOptions";
import { GetLocaleString as loc } from "../Utils/Localization";
import { GeneratePassword } from "../Utils/PasswordGenerator";
import { useStorage } from "../Utils/Storage";
import { useTimeout } from "../Utils/Timeout";
import { useStyles } from "./GeneratorView.styles";

export default function GeneratorView(props: { collapse: boolean; }): JSX.Element
{
	const { generatorOptions, extOptions } = useStorage();
	const [password, setPassword] = useState<string>("");
	const [quickOpts, _setOpts] = useState<GeneratorOptions>(generatorOptions);
	const [error, setError] = useState<string | null>(null);

	const [refreshTimer, copyTimer] = [useTimeout(310), useTimeout(1000)];
	const checkedOptions = Object.keys(quickOpts).filter(k => quickOpts[k as keyof GeneratorOptions] as boolean);
	const cls = useStyles();

	const IncludeIcon: Icons.FluentIcon = Icons.bundleIcon(Icons.AddCircleFilled, Icons.AddCircleRegular);
	const ExcludeIcon: Icons.FluentIcon = Icons.bundleIcon(Icons.SubtractCircleFilled, Icons.SubtractCircleRegular);

	const resetOptions = (): void =>
		_setOpts(generatorOptions);

	const setOptions = (opts: Partial<GeneratorOptions>) =>
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

	function OnCheckedValueChange(_: unknown, e: fui.MenuCheckedValueChangeData): void
	{
		const opts: Partial<Omit<GeneratorOptions, "Length">> = {};

		let keys = Object.keys(quickOpts).filter(i => i !== "Length") as (keyof Omit<GeneratorOptions, "Length">)[];

		if (e.name === "include")
			keys = keys.filter(i => !i.startsWith("Exclude"));
		else
			keys = keys.filter(i => i.startsWith("Exclude"));

		for (const key of keys)
			opts[key] = e.checkedItems.includes(key);

		setOptions(opts);
	}

	useEffect(resetOptions, [generatorOptions]);
	useEffect(RefreshPassword, [generatorOptions, quickOpts]);
	useEffect(refreshTimer.trigger, [password]);

	return (
		<section className={ cls.root }>
			{ error ?
				<fui.MessageBar intent="warning" className={ cls.msgBar }>
					<fui.MessageBarBody>{ error }</fui.MessageBarBody>
				</fui.MessageBar>
				:
				<fui.Input
					className={ cls.input }
					readOnly value={ password }
					contentAfter={ <>
						<fui.Tooltip content={ loc("generator@copy") } relationship="label">
							<fui.Button
								appearance="subtle" onClick={ CopyPassword }
								icon={
									copyTimer.isActive ?
										<Icons.CheckmarkRegular className={ cls.copyIcon } /> :
										<Icons.CopyRegular className={ cls.copyIcon } />
								} />
						</fui.Tooltip>

						<fui.Tooltip content={ loc("generator@refresh") } relationship="label">
							<fui.Button
								appearance="subtle" onClick={ RefreshPassword }
								icon={
									<Icons.ArrowClockwiseRegular className={ fui.mergeClasses(refreshTimer.isActive && cls.refreshIcon) } />
								} />
						</fui.Tooltip>
					</> } />
			}

			{ !props.collapse &&
				<div className={ cls.options }>
					<fui.InfoLabel info={ loc("generator@quickOptions__hint") }>
						{ loc("generator@quickOptions") }
					</fui.InfoLabel>

					<div className={ cls.lengthContainer }>
						<fui.Slider
							min={ extOptions.MinLength } max={ Math.max(extOptions.MaxLength, generatorOptions.Length) }
							value={ quickOpts.Length } onChange={ (_, e) => setOptions({ Length: e.value }) } />
						<fui.Text>{ quickOpts.Length }</fui.Text>
					</div>

					<div className={ cls.characterOptionsContainer }>
						<fui.Menu
							positioning="after" hasCheckmarks
							checkedValues={ { include: checkedOptions } }
							onCheckedValueChange={ OnCheckedValueChange }>

							<fui.MenuTrigger disableButtonEnhancement>
								<fui.MenuButton appearance="subtle" icon={ <IncludeIcon /> }>{ loc("generator@include") }</fui.MenuButton>
							</fui.MenuTrigger>

							<fui.MenuPopover>
								<fui.MenuList>
									<fui.MenuItemCheckbox name="include" value="Uppercase" icon={ <Icons.TextCaseUppercaseRegular /> }>
										{ loc("settings@uppercase") }
									</fui.MenuItemCheckbox>
									<fui.MenuItemCheckbox name="include" value="Lowercase" icon={ <Icons.TextCaseLowercaseRegular /> }>
										{ loc("settings@lowercase") }
									</fui.MenuItemCheckbox>
									<fui.MenuItemCheckbox name="include" value="Numeric" icon={ <Icons.NumberSymbolRegular /> }>
										{ loc("settings@numeric") }
									</fui.MenuItemCheckbox>
									<fui.MenuItemCheckbox name="include" value="Special" icon={ <Icons.MathSymbolsRegular /> }>
										{ loc("settings@special") }
									</fui.MenuItemCheckbox>
								</fui.MenuList>
							</fui.MenuPopover>
						</fui.Menu>

						<fui.Menu
							positioning="before"
							checkedValues={ { exclude: checkedOptions } }
							onCheckedValueChange={ OnCheckedValueChange }>

							<fui.MenuTrigger disableButtonEnhancement>
								<fui.MenuButton appearance="subtle" icon={ <ExcludeIcon /> }>{ loc("generator@exclude") }</fui.MenuButton>
							</fui.MenuTrigger>

							<fui.MenuPopover>
								<fui.MenuList>
									<fui.MenuItemCheckbox name="exclude" value="ExcludeSimilar">
										{ loc("settings@similar") }
									</fui.MenuItemCheckbox>
									<fui.MenuItemCheckbox name="exclude" value="ExcludeAmbiguous" disabled={ !quickOpts.Special }>
										{ loc("settings@ambiguous") }
									</fui.MenuItemCheckbox>
									<fui.MenuItemCheckbox name="exclude" value="ExcludeRepeating">
										{ loc("settings@repeating") }
									</fui.MenuItemCheckbox>
								</fui.MenuList>
							</fui.MenuPopover>
						</fui.Menu>

						<fui.Tooltip content={ loc("generator@reset") } relationship="label">
							<fui.Button appearance="subtle" icon={ <Icons.ArrowUndoRegular /> } onClick={ resetOptions } />
						</fui.Tooltip>
					</div>
				</div>
			}
		</section>
	);
}

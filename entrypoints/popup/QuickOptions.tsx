import { GeneratorOptions, useStorage } from "@/utils/storage";
import * as fui from "@fluentui/react-components";
import * as ic from "@fluentui/react-icons";
import { ReactElement } from "react";
import { useStyles } from "./QuickOptions.styles";

export default function QuickOptions({ onChange }: QuickOptionsProps): ReactElement
{
	const { extOptions, generatorOptions } = useStorage();
	const [quickOpts, setOptions] = useState<GeneratorOptions>(generatorOptions);
	const checkedOptions = useMemo(
		() => Object.keys(quickOpts).filter(k => quickOpts[k as keyof GeneratorOptions] as boolean),
		[quickOpts]
	);

	const onCheckedValueChange = useCallback((_: unknown, e: fui.MenuCheckedValueChangeData): void =>
	{
		const opts: Partial<Omit<GeneratorOptions, "Length" | "IncludeCustom" | "ExcludeCustom">> = {};

		const keys = Object.keys(quickOpts)
			.filter(i =>
				i !== "Length" && i !== "IncludeCustom" && i !== "ExcludeCustom" &&
				i.startsWith("Exclude") === (e.name === "exclude")
			) as (keyof Omit<GeneratorOptions, "Length" | "IncludeCustom" | "ExcludeCustom">)[];

		for (const key of keys)
			opts[key] = e.checkedItems.includes(key);

		const excludeCustom: string = e.name === "exclude" ? (e.checkedItems.includes("ExcludeCustom") ? generatorOptions.ExcludeCustom : "") : quickOpts.ExcludeCustom;

		setOptions({ ...generatorOptions, ...quickOpts, ...opts, ExcludeCustom: excludeCustom });
	}, [quickOpts]);

	useEffect(() => onChange(quickOpts), [onChange, quickOpts]);

	const IncludeIcon: ic.FluentIcon = ic.bundleIcon(ic.AddCircleFilled, ic.AddCircleRegular);
	const ExcludeIcon: ic.FluentIcon = ic.bundleIcon(ic.SubtractCircleFilled, ic.SubtractCircleRegular);
	const cls = useStyles();

	return (
		<div className={ cls.options }>

			<div className={ cls.lengthContainer }>
				<fui.Slider
					min={ extOptions.MinLength } max={ Math.max(extOptions.MaxLength, generatorOptions.Length) }
					value={ quickOpts.Length } onChange={ (_, e) => setOptions({ ...quickOpts, Length: e.value }) } />
				<fui.Text>{ quickOpts.Length }</fui.Text>
			</div>

			<div className={ cls.characterOptionsContainer }>
				<fui.Menu
					positioning={ { position: "after", align: "center", offset: -48 } }
					checkedValues={ { include: checkedOptions } }
					onCheckedValueChange={ onCheckedValueChange }>

					<fui.MenuTrigger disableButtonEnhancement>
						<fui.MenuButton appearance="subtle" icon={ <IncludeIcon /> }>
							{ i18n.t("popup.include") }
						</fui.MenuButton>
					</fui.MenuTrigger>

					<fui.MenuPopover>
						<fui.MenuList>
							<fui.MenuItemCheckbox name="include" value="Uppercase" icon={ <ic.TextCaseUppercaseRegular /> }>
								{ i18n.t("common.characters.uppercase") }
							</fui.MenuItemCheckbox>
							<fui.MenuItemCheckbox name="include" value="Lowercase" icon={ <ic.TextCaseLowercaseRegular /> }>
								{ i18n.t("common.characters.lowercase") }
							</fui.MenuItemCheckbox>
							<fui.MenuItemCheckbox name="include" value="Numeric" icon={ <ic.NumberSymbolRegular /> }>
								{ i18n.t("common.characters.numeric") }
							</fui.MenuItemCheckbox>
							<fui.MenuItemCheckbox name="include" value="Special" icon={ <ic.MathSymbolsRegular /> }>
								{ i18n.t("common.characters.special") }
							</fui.MenuItemCheckbox>
							<fui.MenuSplitGroup>
								<fui.MenuItemCheckbox name="include" value="Custom" icon={ <ic.SparkleRegular /> }>
									{ i18n.t("common.characters.custom") }
								</fui.MenuItemCheckbox>
								<fui.MenuItem icon={ <ic.EditRegular /> }
									onClick={ () => browser.runtime.openOptionsPage() } />
							</fui.MenuSplitGroup>
						</fui.MenuList>
					</fui.MenuPopover>
				</fui.Menu>

				<fui.Menu
					positioning={ { position: "after", align: "center", offset: -64 } }
					checkedValues={ { exclude: checkedOptions } }
					onCheckedValueChange={ onCheckedValueChange }>

					<fui.MenuTrigger disableButtonEnhancement>
						<fui.MenuButton appearance="subtle" icon={ <ExcludeIcon /> }>
							{ i18n.t("popup.exclude") }
						</fui.MenuButton>
					</fui.MenuTrigger>

					<fui.MenuPopover>
						<fui.MenuList>
							<fui.MenuItemCheckbox name="exclude" value="ExcludeSimilar">
								{ i18n.t("common.characters.similar") }
							</fui.MenuItemCheckbox>
							<fui.MenuItemCheckbox name="exclude" value="ExcludeAmbiguous" disabled={ !quickOpts.Special }>
								{ i18n.t("common.characters.ambiguous") }
							</fui.MenuItemCheckbox>
							<fui.MenuItemCheckbox name="exclude" value="ExcludeRepeating">
								{ i18n.t("common.characters.repeating.label") }
							</fui.MenuItemCheckbox>
							<fui.MenuSplitGroup>
								<fui.MenuItemCheckbox name="exclude" value="ExcludeCustom" disabled={ generatorOptions.ExcludeCustom.length < 1 }>
									{ i18n.t("common.characters.custom") }
								</fui.MenuItemCheckbox>
								<fui.MenuItem icon={ <ic.EditRegular /> }
									onClick={ () => browser.runtime.openOptionsPage() } />
							</fui.MenuSplitGroup>
						</fui.MenuList>
					</fui.MenuPopover>
				</fui.Menu>

				<fui.Tooltip content={ i18n.t("common.actions.reset") } relationship="label">
					<fui.Button appearance="subtle" icon={ <ic.ArrowUndoRegular /> } onClick={ () => setOptions(generatorOptions) } />
				</fui.Tooltip>
			</div>
		</div>
	);
};

export type QuickOptionsProps =
	{
		onChange: (value: GeneratorOptions) => void;
	};

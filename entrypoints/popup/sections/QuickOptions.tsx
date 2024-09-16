import { GeneratorOptions, useStorage } from "@/utils/storage";
import * as fui from "@fluentui/react-components";
import * as ic from "@fluentui/react-icons";
import React from "react";
import { useStyles } from "./QuickOptions.styles";

const QuickOptions: React.FC<IProps> = ({ onChange }) =>
{
	const { extOptions, generatorOptions } = useStorage();
	const [quickOpts, setOptions] = useState<GeneratorOptions>(generatorOptions);
	const checkedOptions = useMemo(
		() => Object.keys(quickOpts).filter(k => quickOpts[k as keyof GeneratorOptions] as boolean),
		[quickOpts]
	);

	const onCheckedValueChange = useCallback((_: unknown, e: fui.MenuCheckedValueChangeData): void =>
	{
		const opts: Partial<Omit<GeneratorOptions, "Length">> = {};

		let keys = Object.keys(quickOpts).filter(i => i !== "Length") as (keyof Omit<GeneratorOptions, "Length">)[];

		if (e.name === "include")
			keys = keys.filter(i => !i.startsWith("Exclude"));
		else
			keys = keys.filter(i => i.startsWith("Exclude"));

		for (const key of keys)
			opts[key] = e.checkedItems.includes(key);

		setOptions({ ...generatorOptions, ...quickOpts, ...opts });
	}, [quickOpts]);

	useEffect(() => onChange(quickOpts), [onChange, quickOpts]);

	const IncludeIcon: ic.FluentIcon = ic.bundleIcon(ic.AddCircleFilled, ic.AddCircleRegular);
	const ExcludeIcon: ic.FluentIcon = ic.bundleIcon(ic.SubtractCircleFilled, ic.SubtractCircleRegular);
	const cls = useStyles();

	return (
		<div className={ cls.options }>
			<fui.InfoLabel info={ i18n.t("generator.options.hint") }>
				{ i18n.t("generator.options.title") }
			</fui.InfoLabel>

			<div className={ cls.lengthContainer }>
				<fui.Slider
					min={ extOptions.MinLength } max={ Math.max(extOptions.MaxLength, generatorOptions.Length) }
					value={ quickOpts.Length } onChange={ (_, e) => setOptions({ ...quickOpts, Length: e.value }) } />
				<fui.Text>{ quickOpts.Length }</fui.Text>
			</div>

			<div className={ cls.characterOptionsContainer }>
				<fui.Menu
					positioning="after" hasCheckmarks
					checkedValues={ { include: checkedOptions } }
					onCheckedValueChange={ onCheckedValueChange }>

					<fui.MenuTrigger disableButtonEnhancement>
						<fui.MenuButton appearance="subtle" icon={ <IncludeIcon /> }>
							{ i18n.t("generator.options.include") }
						</fui.MenuButton>
					</fui.MenuTrigger>

					<fui.MenuPopover>
						<fui.MenuList>
							<fui.MenuItemCheckbox name="include" value="Uppercase" icon={ <ic.TextCaseUppercaseRegular /> }>
								{ i18n.t("settings.include.uppercase") }
							</fui.MenuItemCheckbox>
							<fui.MenuItemCheckbox name="include" value="Lowercase" icon={ <ic.TextCaseLowercaseRegular /> }>
								{ i18n.t("settings.include.lowercase") }
							</fui.MenuItemCheckbox>
							<fui.MenuItemCheckbox name="include" value="Numeric" icon={ <ic.NumberSymbolRegular /> }>
								{ i18n.t("settings.include.numeric") }
							</fui.MenuItemCheckbox>
							<fui.MenuItemCheckbox name="include" value="Special" icon={ <ic.MathSymbolsRegular /> }>
								{ i18n.t("settings.include.special") }
							</fui.MenuItemCheckbox>
						</fui.MenuList>
					</fui.MenuPopover>
				</fui.Menu>

				<fui.Menu
					positioning="before"
					checkedValues={ { exclude: checkedOptions } }
					onCheckedValueChange={ onCheckedValueChange }>

					<fui.MenuTrigger disableButtonEnhancement>
						<fui.MenuButton appearance="subtle" icon={ <ExcludeIcon /> }>
							{ i18n.t("generator.options.exclude") }
						</fui.MenuButton>
					</fui.MenuTrigger>

					<fui.MenuPopover>
						<fui.MenuList>
							<fui.MenuItemCheckbox name="exclude" value="ExcludeSimilar">
								{ i18n.t("settings.exclude.similar") }
							</fui.MenuItemCheckbox>
							<fui.MenuItemCheckbox name="exclude" value="ExcludeAmbiguous" disabled={ !quickOpts.Special }>
								{ i18n.t("settings.exclude.ambiguous") }
							</fui.MenuItemCheckbox>
							<fui.MenuItemCheckbox name="exclude" value="ExcludeRepeating">
								{ i18n.t("settings.exclude.repeating.title") }
							</fui.MenuItemCheckbox>
						</fui.MenuList>
					</fui.MenuPopover>
				</fui.Menu>

				<fui.Tooltip content={ i18n.t("common.reset") } relationship="label">
					<fui.Button appearance="subtle" icon={ <ic.ArrowUndoRegular /> } onClick={ () => setOptions(generatorOptions) } />
				</fui.Tooltip>
			</div>
		</div>
	);
};

export default QuickOptions;

interface IProps
{
	onChange: (value: GeneratorOptions) => void;
}

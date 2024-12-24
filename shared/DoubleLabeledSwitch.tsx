import { Label, LabelProps, mergeClasses, Switch, SwitchOnChangeData, SwitchProps } from "@fluentui/react-components";
import { ReactElement } from "react";
import { useStyles } from "./DoubleLabeledSwitch.styles";

export default function DoubleLabledSwitch(props: DoubleLabledSwitchProps): ReactElement
{
	const [isOn, setOn] = useState<boolean>(props.checked ?? props.defaultChecked ?? false);
	const cls = useStyles();
	const switchRef = useRef<HTMLInputElement | null>();

	const setChecked = useCallback((checked: boolean) =>
	{
		if (!switchRef.current || isOn === checked)
			return;

		switchRef.current.click();
	}, [switchRef.current, isOn]);

	const onChange = useCallback((ev: React.ChangeEvent<HTMLInputElement>, data: SwitchOnChangeData) =>
	{
		setOn(data.checked);
		props.onChange?.(ev, data);
	}, [props.onChange]);

	return (
		<div { ...props.outerRoot } className={ mergeClasses(cls.root, props.outerRoot?.className) }>

			<Label
				onClick={ () => setChecked(false) }
				{ ...props.offLabelProps }
				className={ mergeClasses(
					cls.label,
					cls.labelLeft,
					!isOn ? cls.labelChecked : cls.labelUnchecked,
					props.offLabelProps?.className
				) }>

				{ props.offLabel }
			</Label>

			<Switch { ...props } ref={ (input) => switchRef.current = input } onChange={ onChange } />

			<Label
				onClick={ () => setChecked(true) }
				{ ...props.onLabelProps }
				className={ mergeClasses(
					cls.label,
					isOn ? cls.labelChecked : cls.labelUnchecked,
					props.onLabelProps?.className
				) }>

				{ props.onLabel }
			</Label>
		</div>
	);
}

export type DoubleLabledSwitchProps = Omit<SwitchProps, "label"> &
{
	offLabel?: string;
	onLabel?: string;
	outerRoot?: React.HTMLAttributes<HTMLDivElement>;
	offLabelProps?: LabelProps;
	onLabelProps?: LabelProps;
};

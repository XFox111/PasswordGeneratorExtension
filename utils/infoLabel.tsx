import { InfoLabel, Label, LabelProps, makeStyles, Slot } from "@fluentui/react-components";

// FIXME: Remove ts-ignore comments once slots override fix is released
// Tracker: https://github.com/microsoft/fluentui/issues/27090

export default function infoLabel(label: string, hint: string, noWrap?: boolean): Slot<typeof Label>
{
	const cls = useStyles();

	// @ts-expect-error See FIXME
	return {
		children: (_: unknown, props: LabelProps) =>
			<InfoLabel { ...props } info={ { className: noWrap ? cls.noWrap : undefined, children: hint } }>
				{ label }
			</InfoLabel>
	};
}

const useStyles = makeStyles({
	noWrap:
	{
		whiteSpace: "pre"
	}
});

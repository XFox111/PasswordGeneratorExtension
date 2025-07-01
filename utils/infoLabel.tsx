import { InfoLabel, Label, LabelProps, makeStyles, Slot } from "@fluentui/react-components";

export default function infoLabel(label: string, hint: string, noWrap?: boolean): Slot<typeof Label>
{
	const cls = useStyles();

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

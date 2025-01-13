import { InfoLabel, Label, LabelProps, Slot } from "@fluentui/react-components";

// FIXME: Remove ts-ignore comments once slots override fix is released
// Tracker: https://github.com/microsoft/fluentui/issues/27090

export default function infoLabel(label: string, hint: string): Slot<typeof Label>
{
	// @ts-expect-error See FIXME
	return {
		children: (_: unknown, props: LabelProps) =>
			<InfoLabel { ...props } info={ hint }>
				{ label }
			</InfoLabel>
	};
}

import { makeStyles, shorthands, tokens } from "@fluentui/react-components";

export const useStyles = makeStyles({
	root:
	{
		display: "flex",
		flexDirection: "column",
	},
	input:
	{
		fontFamily: tokens.fontFamilyMonospace,
	},
	lengthContainer:
	{
		display: "grid",
		gridTemplateColumns: "1fr auto",
		alignItems: "center",
		paddingRight: tokens.spacingHorizontalM,
	},
	copyIcon:
	{
		animationName: "scaleUpIn",
		animationDuration: tokens.durationSlow,
		animationTimingFunction: tokens.curveEasyEaseMax,
	},
	refreshIcon:
	{
		animationName: "spin",
		animationDuration: tokens.durationSlow,
		animationTimingFunction: tokens.curveEasyEaseMax,
	},
	msgBar:
	{
		...shorthands.padding(tokens.spacingVerticalMNudge, tokens.spacingHorizontalM),
	},
	options:
	{
		display: "flex",
		flexDirection: "column",
		...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalS),
	},
	characterOptionsContainer:
	{
		display: "flex",
		...shorthands.gap(tokens.spacingHorizontalXS),
	},
});

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
});

import { makeStyles, tokens } from "@fluentui/react-components";

export const useStyles = makeStyles({
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
		padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
	},
	msgBarBody:
	{
		whiteSpace: "break-spaces",
	}
});

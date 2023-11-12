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
	optionsSpacing:
	{
		...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalS),
	},
	optionsLabel:
	{
		"> div[role=note].fui-InfoButton__info":
		{
			zIndex: 1,
		},
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
	}
});

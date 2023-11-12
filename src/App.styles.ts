import { makeStyles, shorthands, tokens } from "@fluentui/react-components";

export const useStyles = makeStyles({
	root:
	{
		display: "flex",
		flexDirection: "column",
		...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalS),
	},
	spinner:
	{
		alignSelf: "center",
		...shorthands.margin(tokens.spacingVerticalXXXL, 0),
	},
	accordionAnimation:
	{
		"> .fui-AccordionItem .fui-AccordionHeader__expandIcon > svg":
		{
			transitionProperty: "transform",
			transitionDuration: tokens.durationNormal,
			transitionTimingFunction: tokens.curveDecelerateMax,
		},
		"> .fui-AccordionItem > .fui-AccordionPanel":
		{
			animationName: "fadeIn",
			animationDuration: tokens.durationSlow,
			animationTimingFunction: tokens.curveDecelerateMin,
		}
	},
});

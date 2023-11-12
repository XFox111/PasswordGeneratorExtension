import { makeStyles, shorthands, tokens } from "@fluentui/react-components";

export const useStyles = makeStyles({
	root:
	{
		display: "flex",
		flexDirection: "column",
		...shorthands.gap(tokens.spacingVerticalM),
		paddingBottom: tokens.spacingVerticalS,
	},
	horizontalContainer:
	{
		display: "flex",
		...shorthands.gap(tokens.spacingHorizontalSNudge),
	},
});

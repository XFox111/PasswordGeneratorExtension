import { makeStyles, tokens } from "@fluentui/react-components";

export const useStyles = makeStyles({
	root:
	{
		display: "flex",
		flexDirection: "column",
		gap: tokens.spacingVerticalM,
		padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
	},
	horizontalContainer:
	{
		display: "flex",
		gap: tokens.spacingHorizontalSNudge,
	},
});

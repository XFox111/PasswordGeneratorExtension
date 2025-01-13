import { makeStyles, tokens } from "@fluentui/react-components";

export const useStyles = makeStyles({
	root:
	{
		display: "flex",
		flexFlow: "column",
		gap: tokens.spacingVerticalSNudge,
	},
	checkboxes:
	{
		display: "flex",
		flexFlow: "column",
		gap: tokens.spacingVerticalXXS,
	},
});

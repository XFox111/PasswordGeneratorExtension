import { makeStyles, shorthands, tokens } from "@fluentui/react-components";

export const useStyles = makeStyles({
	root:
	{
		display: "flex",
		flexDirection: "column",
		...shorthands.gap(tokens.spacingVerticalS),
	},
	checkboxContainer:
	{
		display: "flex",
		flexWrap: "wrap",
	},
});

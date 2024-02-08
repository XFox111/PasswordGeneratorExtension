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
	rangeContainer:
	{
		display: "grid",
		gridTemplateColumns: "1fr auto 1fr auto",
		alignItems: "center",
		...shorthands.gap(tokens.spacingHorizontalS),
	},
	rangeInput:
	{
		width: "100%",
	},
});

import { makeStyles, shorthands, tokens } from "@fluentui/react-components";

export const useStyles = makeStyles({
	characterOptionsContainer:
	{
		display: "flex",
		...shorthands.gap(tokens.spacingHorizontalXS),
	},
	options:
	{
		display: "flex",
		flexDirection: "column",
		...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalS),
	},
	lengthContainer:
	{
		display: "grid",
		gridTemplateColumns: "1fr auto",
		alignItems: "center",
		paddingRight: tokens.spacingHorizontalM,
	},
});

import { makeStyles, tokens } from "@fluentui/react-components";

export const useStyles = makeStyles({
	characterOptionsContainer:
	{
		display: "flex",
		gap: tokens.spacingHorizontalXS,
	},
	options:
	{
		display: "flex",
		flexDirection: "column",
		gap: tokens.spacingVerticalS,
	},
	lengthContainer:
	{
		display: "grid",
		gridTemplateColumns: "1fr auto",
		alignItems: "center",
		paddingRight: tokens.spacingHorizontalM,
	},
});

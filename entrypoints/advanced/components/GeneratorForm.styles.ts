import { makeStyles, tokens } from "@fluentui/react-components";

export const useStyles = makeStyles({
	root:
	{
		display: "flex",
		flexDirection: "column",
		gap: tokens.spacingVerticalXL,
	},
	actionRoot:
	{
		display: "flex",
		gap: tokens.spacingHorizontalM,
		alignSelf: "center",
	},
	bulkRoot:
	{
		display: "grid",
		alignItems: "center",
		gridTemplateColumns: "24px 24px 56px",
	}
});

import { makeStyles, tokens } from "@fluentui/react-components";

export const useStyles = makeStyles({
	root:
	{
		display: "flex",
		flexDirection: "column",
		gap: tokens.spacingVerticalMNudge,
		padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalMNudge}`,
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
		gap: tokens.spacingHorizontalS,
	},
	rangeInput:
	{
		width: "100%",
	},
	excludeCustom:
	{
		display: "grid",
		gridTemplateColumns: "auto 1fr",
		gap: tokens.spacingHorizontalS,
		alignItems: "center",
	},
	divider:
	{
		flexGrow: 0,
	},
});

import { makeStyles, tokens } from "@fluentui/react-components";

export const useStyles = makeStyles({
	root:
	{
		display: "grid",
		gridTemplateColumns: "1fr 1fr",
		height: "100vh",
		gap: tokens.spacingHorizontalXL,
		padding: `${tokens.spacingVerticalXL} ${tokens.spacingHorizontalXL}`,
		boxSizing: "border-box",
	},
	smallRoot:
	{
		display: "flex",
		flexFlow: "column-reverse",
		overflowX: "hidden",
		overflowY: "auto",
		padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalS}`,
	},
	hideScroll:
	{
		overflowY: "visible",
	},
	configRoot:
	{
		display: "flex",
		flexFlow: "column",
		gap: tokens.spacingVerticalM,
		width: "100%",
		maxWidth: "480px",
		borderRadius: tokens.borderRadiusLarge,
		boxShadow: tokens.shadow4,
		backgroundColor: tokens.colorNeutralBackground2,
		padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
		margin: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXL}`,
		boxSizing: "border-box",
		justifySelf: "center",
		alignSelf: "center",
		overflowY: "auto",
	},
	switch:
	{
		margin: `${tokens.spacingVerticalXL} ${tokens.spacingVerticalNone}`,
	},
	listRoot:
	{
		width: "100%",
		maxWidth: "840px",
		alignSelf: "center",
		justifySelf: "center",
		padding: `${tokens.spacingVerticalXL} ${tokens.spacingHorizontalXL}`,
		boxSizing: "border-box",
		overflowY: "auto",
		maxHeight: "100%",
	},
});

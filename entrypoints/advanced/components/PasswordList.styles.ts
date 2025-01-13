import { makeStyles, tokens } from "@fluentui/react-components";

export const useStyles = makeStyles({
	root:
	{
		display: "flex",
		flexFlow: "column",
		gap: tokens.spacingVerticalS,
	},
	copyAll:
	{
		alignSelf: "flex-end",
		minHeight: "32px",
	},
	table:
	{
		backgroundColor: tokens.colorNeutralBackground2,
		borderRadius: "16px",
		overflow: "clip",
	},
	row:
	{
		"&:last-child":
		{
			borderBottom: "none",
		}
	},
	cell:
	{
		padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXL}`,
		cursor: "pointer",
	},
	cellLayout:
	{
		overflowX: "auto",
	},
	passwordText:
	{
		textOverflow: "ellipsis",
		whiteSpace: "nowrap",
		overflowX: "hidden",
		display: "block",
		marginRight: "36px",
	},
	copyIcon:
	{
		verticalAlign: "middle",
		padding: tokens.spacingHorizontalXL,
	}
});

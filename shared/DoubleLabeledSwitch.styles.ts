import { makeStyles, tokens } from "@fluentui/react-components";

export const useStyles = makeStyles({
	root:
	{
		display: "grid",
		gridTemplateColumns: "1fr auto 1fr",
		alignItems: "center",
	},
	label:
	{
		color: tokens.colorNeutralForeground2,
		cursor: "pointer",
		justifySelf: "start",
	},
	labelUnchecked:
	{
		"&:hover":
		{
			color: tokens.colorNeutralForeground2Hover,

			"&:active":
			{
				color: tokens.colorNeutralForeground2Pressed,
			},
		},
	},
	labelLeft:
	{
		justifySelf: "end",
		textAlign: "right",
	},
	labelChecked:
	{
		fontWeight: tokens.fontWeightSemibold,
		color: tokens.colorNeutralForeground1,

		"&:hover":
		{
			color: tokens.colorNeutralForeground1Hover,

			"&:active":
			{
				color: tokens.colorNeutralForeground1Pressed,
			},
		},
	}
});

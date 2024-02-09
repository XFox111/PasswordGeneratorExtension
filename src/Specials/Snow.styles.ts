import { GriffelStyle, makeStyles, shorthands, tokens } from "@fluentui/react-components";

const random = (max: number) => Math.floor(Math.random() * max);

export const useStyles = (count: number) => makeStyles({
	snow:
	{
		position: "absolute",
		...shorthands.overflow("hidden"),
		pointerEvents: "none",

		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
	},
	snowflake:
	{
		"--size": "1px",
		width: "var(--size)",
		height: "var(--size)",
		backgroundColor: tokens.colorScrollbarOverlay,
		...shorthands.borderRadius(tokens.borderRadiusCircular),
		position: "absolute",
		top: "-5px",
	},
	...[...Array(count)].reduce(
		(acc, _, i): Record<string, GriffelStyle> => ({
			...acc,
			[`snowflake-${i}`]: {
				"--size": `${random(5)}px`,
				"--left-ini": `${random(20) - 10}vw`,
				"--left-end": `${random(20) - 10}vw`,
				left: `${random(100)}vw`,
				animationName: "snowfall",
				animationDuration: `${5 + random(10)}s`,
				animationTimingFunction: "linear",
				animationIterationCount: "infinite",
				animationDelay: `-${random(10)}s`,
			},
		}),
		{},
	),
});

import { GriffelStyle, makeStyles, tokens } from "@fluentui/react-components";

const random = (max: number): number => Math.floor(Math.random() * max);

export const SNOWFLAKES_NUM: number = 100;

export const useStyles = makeStyles({
	snow:
	{
		position: "absolute",
		overflow: "hidden",
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
		borderRadius: tokens.borderRadiusCircular,
		position: "absolute",
		top: "-5px",
	},
	...[...Array(SNOWFLAKES_NUM)].reduce(
		(acc, _, i): Record<string, GriffelStyle> => ({
			...acc,
			[`snowflake-${i}`]: {
				"--size": `${random(5)}px`,
				"--left-start": `${random(20) - 10}vw`,
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

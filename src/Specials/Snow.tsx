import { mergeClasses } from "@fluentui/react-components";
import { useStyles } from "./Snow.styles";

const SNOWFLAKES_NUM: number = 100;

export default function Snow(): JSX.Element
{
	const cls = useStyles(SNOWFLAKES_NUM)();

	if (![0, 11].includes(new Date().getMonth()))
		return <></>;

	return (
		<div className={ cls.snow }>
			{ [...Array(SNOWFLAKES_NUM)].map((_, i) => <div key={ i } className={ mergeClasses(cls.snowflake, cls[`snowflake-${i}`]) } />) }
		</div>
	);
}

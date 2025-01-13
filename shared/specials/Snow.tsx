import { mergeClasses } from "@fluentui/react-components";
import { SNOWFLAKES_NUM, useStyles } from "./Snow.styles";
import "./Snow.css";

const Snow: React.FC = () =>
{
	const cls = useStyles();

	if (![0, 11].includes(new Date().getMonth()))
		return null;

	return (
		<div className={ cls.snow }>
			{ [...Array(SNOWFLAKES_NUM)].map((_, i) =>
				<div key={ i } className={ mergeClasses(cls.snowflake, cls[`snowflake-${i}`]) } />
			) }
		</div>
	);
};

export default Snow;

import "./Snow.scss";

const Snow = (): JSX.Element => (
	![0, 11].includes(new Date().getMonth()) ? <></> :	// Only shows in December and January

		<div className="snow">
			{ [...Array(50)].map((_, i) => <div key={ i } className="snowflake" />) }
		</div>
);

export default Snow;

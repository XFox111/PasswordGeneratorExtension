import React from "react";
import "./Snow.scss";

export default class Snow extends React.Component
{
	public render(): JSX.Element
	{
		// Show snowflakes only from 15th of December till 10th of January
		let now = new Date();

		if (
			(now.getMonth() !== 11 || now.getDate() < 15) &&
			(now.getMonth() !== 0 || now.getDate() > 10)
		)
			return <></>;

		return (
			<div className="snowflakeContainer">
				{ [...Array(50)].map((_, i) => <div key={i} className="snowflake" />) }
			</div>
		);
	}
}

import { Input, Button, Link, Text, Tooltip } from "@fluentui/react-components";
import { Alert } from "@fluentui/react-components/unstable";
import { ArrowClockwiseRegular, CheckmarkRegular, CopyRegular } from "@fluentui/react-icons";
import React from "react";
import Generator from "../Utils/Generator";
import GeneratorOptions from "../Utils/GeneratorOptions";
import { loc } from "../Utils/Localization";
import Settings from "../Utils/Settings";

interface IStates
{
	password: string;
	error?: string;
	copyIcon: JSX.Element;
}

interface IProps
{
	generatorOptions: GeneratorOptions;
	settings: Settings;
}

export default class PasswordView extends React.Component<IProps, IStates>
{
	constructor(props: IProps)
	{
		super(props);
		this.state =
		{
			password: Generator.GeneratePassword(props.generatorOptions),
			error: Generator.ValidateProps(props.generatorOptions),
			copyIcon: <CopyRegular className="scaleUpIn" />,
		};
	}

	private OnCopyPassword(password: string): void
	{
		console.log("PasswordView.OnCopyPassword");

		if (!document.hasFocus())
			return;

		window.navigator.clipboard.writeText(password);

		this.setState({ copyIcon: <CheckmarkRegular className="scaleUpIn" /> });
		setTimeout(() => this.setState({ copyIcon: <CopyRegular className="scaleUpIn" /> }), 3000);
	}

	private OnRefreshPassword(): void
	{
		console.log("PasswordView.OnRefreshPassword");

		let password: string = Generator.GeneratePassword(this.props.generatorOptions);

		this.setState({ password });

		document.querySelector("svg#refresh-btn")?.classList.add("spin");
		setTimeout(() => document.querySelector("svg#refresh-btn")?.classList.remove("spin"), 600);

		if (this.props.settings.Autocopy)
			this.OnCopyPassword(password);
	}

	public componentDidUpdate(prevProps: Readonly<IProps>): void
	{
		console.log("PasswordView.componentDidUpdate");

		// Converting to JSON is the easiest way to compare objects
		if (JSON.stringify(prevProps.generatorOptions) === JSON.stringify(this.props.generatorOptions))
			return;

		let error: string = Generator.ValidateProps(this.props.generatorOptions);
		let password = Generator.GeneratePassword(this.props.generatorOptions);

		this.setState({ password, error });

		if (!error && this.props.settings.Autocopy)
			this.OnCopyPassword(password);
	}

	private AlterSpecialsOnce(useSpecials: boolean): void
	{
		console.log("PasswordView.AlterSpecialsOnce", `useSpecials: ${useSpecials}`);

		let options: GeneratorOptions = { ...this.props.generatorOptions, Special: useSpecials, ExcludeAmbiguous: true };

		let error: string = Generator.ValidateProps(options);
		let password: string = Generator.GeneratePassword(options);

		this.setState({ password, error });

		if (error)
			setTimeout(() => this.OnRefreshPassword(), 3000);
	}

	public render(): JSX.Element
	{
		return this.state.error ?
			<Alert intent="error" className="fadeIn">{ this.state.error }</Alert>
			:
			<section className="stack fadeIn">
				<Input
					value={ this.state.password } readOnly
					contentAfter={
						<>
							<Tooltip content={ loc("Copy") } relationship="label">
								<Button onClick={ () => this.OnCopyPassword(this.state.password) } appearance="subtle" icon={ this.state.copyIcon } />
							</Tooltip>

							<Tooltip content={ loc("Generate new") } relationship="label">
								<Button onClick={ () => this.OnRefreshPassword() } appearance="subtle" icon={ <ArrowClockwiseRegular id="refresh-btn" /> } />
							</Tooltip>
						</>
					} />
				<Text>
					{ this.props.generatorOptions.Special ?
						<Link onClick={ () => this.AlterSpecialsOnce(false) }>
							{ loc("Exclude special symbols one time") }
						</Link>
						:
						<Link onClick={ () => this.AlterSpecialsOnce(true) }>
							{ loc("Include special symbols one time") }
						</Link>
					}
				</Text>
			</section>
			;
	}
}

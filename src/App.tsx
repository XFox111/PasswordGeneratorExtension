import React from "react";
import { Accordion, FluentProvider, Text, Theme, Title2, webDarkTheme, webLightTheme } from "@fluentui/react-components";
import "./App.scss";
import SettingsSection from "./Components/SettingsSection";
import AboutSection from "./Components/AboutSection";
import Package from "../package.json";
import PasswordView from "./Components/PasswordView";
import Settings from "./Utils/Settings";
import GeneratorOptions from "./Utils/GeneratorOptions";
import { loc } from "./Utils/Localization";

interface IStates
{
	theme: Theme;
	generatorOptions: GeneratorOptions;
	settings: Settings;
}

interface IProps
{
	settings: Settings;
}

export default class App extends React.Component<IProps, IStates>
{
	constructor(props: IProps)
	{
		super(props);

		this.state =
		{
			theme: this.UpdateTheme(),
			generatorOptions: new GeneratorOptions(),
			settings: props.settings
		};

		Settings.OnChanged = (changes) => this.setState({ settings: { ...this.state.settings, ...changes } });
		GeneratorOptions.OnChanged = (changes) => this.setState({ generatorOptions: { ...this.state.generatorOptions, ...changes } });
	}

	public async componentDidMount(): Promise<void>
	{
		window
			.matchMedia("(prefers-color-scheme: dark)")
			.addEventListener("change",
				(arg: MediaQueryListEvent) =>
					this.setState({ theme: this.UpdateTheme(arg.matches) })
			);

		this.setState({ generatorOptions: await GeneratorOptions.Init() });
	}

	private UpdateTheme(isDark?: boolean): Theme
	{
		let theme: Theme = (isDark ?? window.matchMedia("(prefers-color-scheme: dark)").matches) ? webDarkTheme : webLightTheme;
		document.body.style.backgroundColor = theme.colorNeutralBackground1;

		return theme;
	}

	public render(): JSX.Element
	{
		return (
			<FluentProvider theme={ this.state.theme }>
				<main className="stack gap">
					<header className="stack horizontal gap">
						<Title2 as="h1">{ loc("Password generator") }</Title2>
						<Text as="span">v{ Package.version }</Text>
					</header>

					<PasswordView settings={ this.state.settings } generatorOptions={ this.state.generatorOptions } />

					<Accordion collapsible>
						<SettingsSection
							generatorOptions={ this.state.generatorOptions }
							settings={ this.state.settings } />
						<AboutSection />
					</Accordion>
				</main>
			</FluentProvider>
		);
	}
}

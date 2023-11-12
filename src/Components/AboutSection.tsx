import * as fui from "@fluentui/react-components";
import { InfoRegular, PersonFeedbackRegular } from "@fluentui/react-icons";
import Package from "../../package.json";
import BuyMeACoffee from "../Assets/BuyMeACoffee.svg?react";
import { bmcDarkTheme, bmcLightTheme } from "../Data/BmcTheme";
import { GetFeedbackLink, GithubLink, PersonalLink } from "../Data/Links";
import { GetLocaleString as loc } from "../Utils/Localization";
import { useTheme } from "../Utils/Theme";
import { useStyles } from "./AboutSection.styles";

export default function AboutSection(): JSX.Element
{
	const theme = useTheme(bmcLightTheme, bmcDarkTheme);
	const cls = useStyles();

	const link = (text: string, href: string): JSX.Element => (
		<fui.Link target="_blank" href={ href }>{ text }</fui.Link>
	);

	const buttonProps = (href: string, icon: JSX.Element): fui.ButtonProps => (
		{
			as: "a", target: "_blank", href,
			appearance: "primary", icon
		}
	);

	return (
		<fui.AccordionItem value="about">
			<fui.AccordionHeader as="h2" icon={ <InfoRegular /> }>{ loc("about@title") }</fui.AccordionHeader>
			<fui.AccordionPanel className={ cls.root }>
				<header className={ cls.horizontalContainer }>
					<fui.Subtitle1 as="h1">{ loc("name") }</fui.Subtitle1>
					<fui.Caption1 as="span">v{ Package.version }</fui.Caption1>
				</header>

				<fui.Text as="p">
					{ loc("about@developedBy") } ({ link("@xfox111", PersonalLink.Twitter) })
					<br />
					{ loc("about@licensedUnder") } { link(loc("about@mitLicense"), GithubLink.License) }
				</fui.Text>

				<fui.Text as="p">
					{ loc("about@translationCta") }<br />
					{ link(loc("about@translationCtaButton"), GithubLink.TranslationGuide) }
				</fui.Text>

				<fui.Text as="p">
					{ link(loc("about@website"), PersonalLink.Website) } <br />
					{ link(loc("about@sourceCode"), GithubLink.Repository) } <br />
					{ link(loc("about@changelog"), GithubLink.Changelog) }
				</fui.Text>

				<div className={ cls.horizontalContainer }>
					<fui.Button { ...buttonProps(GetFeedbackLink(), <PersonFeedbackRegular />) }>
						{ loc("about@feedback") }
					</fui.Button>
					<fui.FluentProvider theme={ theme }>
						<fui.Button { ...buttonProps(PersonalLink.BuyMeACoffee, <BuyMeACoffee />) }>
							{ loc("about@sponsor") }
						</fui.Button>
					</fui.FluentProvider>
				</div>
			</fui.AccordionPanel>
		</fui.AccordionItem>
	);
}

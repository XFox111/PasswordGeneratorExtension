import { bmcDarkTheme, bmcLightTheme } from "@/utils/BmcTheme";
import { getFeedbackLink, githubLinks, personalLinks } from "@/utils/links";
import { useTheme } from "@/utils/useTheme";
import * as fui from "@fluentui/react-components";
import { PersonFeedbackRegular } from "@fluentui/react-icons";
import { ReactElement, ReactNode } from "react";
import { useStyles } from "./AboutSection.styles";

export default function AboutSection(): ReactElement
{
	const bmcTheme = useTheme(bmcLightTheme, bmcDarkTheme);
	const cls = useStyles();

	return (
		<section className={ cls.root }>
			<fui.Subtitle1 as="h1">{ i18n.t("about.title") }</fui.Subtitle1>
			<header className={ cls.horizontalContainer }>
				<fui.Subtitle2 as="h2">{ i18n.t("manifest.name") }</fui.Subtitle2>
				<fui.Caption1 as="span">v{ browser.runtime.getManifest().version }</fui.Caption1>
			</header>

			<fui.Text as="p">
				{ i18n.t("about.developed_by") } ({ link("@xfox111.net", personalLinks.social) })
				<br />
				{ i18n.t("about.licensed_under") } { link(i18n.t("about.mit_license"), githubLinks.license) }
			</fui.Text>

			<fui.Text as="p">
				{ i18n.t("about.translation_cta.text") }<br />
				{ link(i18n.t("about.translation_cta.button"), githubLinks.translationGuide) }
			</fui.Text>

			<fui.Text as="p">
				{ link(i18n.t("about.links.website"), personalLinks.website) } <br />
				{ link(i18n.t("about.links.source"), githubLinks.repository) } <br />
				{ link(i18n.t("about.links.changelog"), githubLinks.changelog) }
			</fui.Text>

			<div className={ cls.horizontalContainer }>
				<fui.Button { ...buttonProps(getFeedbackLink(), <PersonFeedbackRegular />) }>
					{ i18n.t("about.cta.feedback") }
				</fui.Button>
				<fui.FluentProvider theme={ bmcTheme }>
					<fui.Button { ...buttonProps(personalLinks.donation, <img style={ { height: 20 } } src="bmc.svg" />) }>
						{ i18n.t("about.cta.sponsor") }
					</fui.Button>
				</fui.FluentProvider>
			</div>
		</section>
	);
};

const link = (text: string, href: string): ReactNode => (
	<fui.Link target="_blank" href={ href }>{ text }</fui.Link>
);

const buttonProps = (href: string, icon: JSX.Element): fui.ButtonProps => (
	{
		as: "a", target: "_blank", href,
		appearance: "primary", icon
	}
);

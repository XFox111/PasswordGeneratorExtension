import { AccordionItem, AccordionHeader, AccordionPanel, Link, Text, Button } from "@fluentui/react-components";
import { InfoRegular, PersonFeedbackRegular } from "@fluentui/react-icons";
import { ReactComponent as BuyMeACoffee } from "../Assets/BuyMeACoffee.svg";
import React from "react";
import { loc } from "../Utils/Localization";
import browser from "../Utils/Browser";

export default class AboutSection extends React.Component
{
	public render(): JSX.Element
	{
		return (
			<AccordionItem value="about">
				<AccordionHeader as="h2" icon={ <InfoRegular /> }>{ loc("About") }</AccordionHeader>
				<AccordionPanel>
					<section className="stack gap fadeIn">
						<Text as="p">
							{ loc("Developed by Eugene Fox") } (<Link href="https://twitter.com/xfox111" target="_blank">@xfox111</Link>)
							<br />
							{ loc("Licensed under") } <Link href="https://github.com/XFox111/PasswordGeneratorExtension/blob/master/LICENSE" target="_blank">{ loc("MIT license") }</Link>
						</Text>
						<Text as="p">
							{ loc("Want to contribute translation for your language?") } <Link href="https://github.com/XFox111/PasswordGeneratorExtension/blob/master/CONTRIBUTING.md" target="_blank">{ loc("Read this to get started") }</Link>
						</Text>
						<Text as="p">
							<Link href="https://xfox111.net/" target="_blank">{ loc("My website") }</Link>
							<br />
							<Link href="https://github.com/xfox111/PasswordGeneratorExtension" target="_blank">{ loc("Source code") }</Link>
							<br />
							<Link href="https://github.com/XFox111/PasswordGeneratorExtension/releases/latest" target="_blank">{ loc("Changelog") }</Link>
						</Text>

						<div className="stack horizontal gap">
							<Button
								as="a" target="_blank"
								href={ this.GetFeedbackLink() }
								appearance="primary" icon={ <PersonFeedbackRegular /> }>

								{ loc("Leave feedback") }
							</Button>

							<Button
								as="a" target="_blank"
								href="https://buymeacoffee.com/xfox111"
								className="bmc" appearance="primary" icon={ <BuyMeACoffee /> }>

								{ loc("Buy me a coffee") }
							</Button>
						</div>
					</section>
				</AccordionPanel>
			</AccordionItem>
		);
	}

	private GetFeedbackLink(): string
	{
		let manifest: { [key: string]: string | any } = browser?.runtime?.getManifest();

		if (!manifest)
			window.open("mailto:feedback@xfox111.net");
		else
		{
			if (manifest.update_url)
			{
				let host: string = new URL(manifest.update_url).host;

				if (host.endsWith("edge.microsoft.com"))
					return "https://microsoftedge.microsoft.com/addons/detail/password-generator/manimdhobjbkfpeeehlhhneookiokpbj";
				else if (host.endsWith("google.com"))
					return "https://chrome.google.com/webstore/detail/password-generator/jnjobgjobffgmgfnkpkjfjkkfhfikmfl";
				else
					return "mailto:feedback@xfox111.net";
			}
			else
				return "mailto:feedback@xfox111.net";
		}
	}
}

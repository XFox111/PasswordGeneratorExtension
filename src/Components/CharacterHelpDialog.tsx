import { Button, Text, Dialog, DialogTrigger, DialogSurface, DialogTitle, DialogBody, DialogActions, DialogContent } from "@fluentui/react-components";
import { Table, TableHeader, TableRow, TableHeaderCell, TableBody, TableCell } from "@fluentui/react-components/unstable";
import { QuestionCircleRegular } from "@fluentui/react-icons";
import React from "react";
import Generator from "../Utils/Generator";
import { loc } from "../Utils/Localization";

export default class CharacterHelpDialog extends React.Component
{
	public render(): JSX.Element
	{
		return (
			<Dialog>
				<DialogTrigger>
					<Button appearance="subtle" style={ { marginLeft: 5 } } icon={ <QuestionCircleRegular /> } />
				</DialogTrigger>
				<DialogSurface aria-label="label">
					<DialogBody>
						<DialogTitle>{ loc("Character options") }</DialogTitle>
						<DialogContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHeaderCell>{ loc("Set_name") }</TableHeaderCell>
										<TableHeaderCell>{ loc("Characters") }</TableHeaderCell>
									</TableRow>
								</TableHeader>
								<TableBody>
									<TableRow>
										<TableCell>{ loc("Lowercase") }</TableCell>
										<TableCell>
											<Text font="monospace">{ Generator.Lowercase.substring(0, 10) }{ loc(", etc.") }</Text>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>{ loc("Uppercase") }</TableCell>
										<TableCell>
											<Text font="monospace">{ Generator.Uppercase.substring(0, 10) }{ loc(", etc.") }</Text>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>{ loc("Numeric") }</TableCell>
										<TableCell>
											<Text font="monospace">{ Generator.Numeric }</Text>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>{ loc("Special symbols") }</TableCell>
										<TableCell>
											<Text font="monospace">{ Generator.SpecialCharacters }</Text>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>{ loc("Ambiguous") }</TableCell>
										<TableCell>
											<Text font="monospace">{ Generator.AmbiguousCharacters }</Text>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>{ loc("Similar") }</TableCell>
										<TableCell>
											<Text font="monospace">{ Generator.SimilarCharacters }</Text>
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</DialogContent>
						<DialogActions>
							<DialogTrigger>
								<Button appearance="secondary">{ loc("OK") }</Button>
							</DialogTrigger>
						</DialogActions>
					</DialogBody>
				</DialogSurface>
			</Dialog>
		);
	}
}

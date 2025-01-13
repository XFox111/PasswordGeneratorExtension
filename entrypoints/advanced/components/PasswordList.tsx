import * as fui from "@fluentui/react-components";
import { bundleIcon, Copy32Regular, CopyFilled, CopyRegular } from "@fluentui/react-icons";
import { ReactElement } from "react";
import { useStyles } from "./PasswordList.styles";

export default function PasswordList({ passwords, className }: PasswordListProps): ReactElement
{
	const toaster = fui.useToastController();

	const CopyIcon = bundleIcon(CopyFilled, CopyRegular);
	const cls = useStyles();

	const copy = (password?: string) =>
	{
		navigator.clipboard.writeText(password ?? passwords.join("\n"));
		toaster.dispatchToast(
			<fui.Toast>
				<fui.ToastTitle>{ i18n.t("advanced.copied_msg") }</fui.ToastTitle>
			</fui.Toast>,
			{
				intent: "success",
				timeout: 1000
			}
		);
	};

	return (
		<div className={ fui.mergeClasses(cls.root, className) }>
			{ passwords.length > 0 &&
				<>
					<fui.Button className={ cls.copyAll }
						appearance="subtle" icon={ <CopyIcon /> }
						onClick={ () => copy() }>

						{ i18n.t("advanced.actions.copy_all") }
					</fui.Button>

					<fui.Table className={ cls.table }>
						<fui.TableBody>

							{ passwords.map((password, index) =>
								<fui.TableRow key={ index } className={ cls.row }
									onClick={ () => copy(password) }>

									<fui.TableCell className={ cls.cell }>

										<fui.TableCellLayout content={ { className: cls.cellLayout } }>
											<fui.Tooltip relationship="description" content={ password }>

												<fui.Text className={ cls.passwordText }
													font="monospace" size={ 600 }>

													{ password }
												</fui.Text>

											</fui.Tooltip>
										</fui.TableCellLayout>

										<fui.TableCellActions>
											<Copy32Regular className={ cls.copyIcon } />
										</fui.TableCellActions>

									</fui.TableCell>
								</fui.TableRow>
							) }

						</fui.TableBody>
					</fui.Table>
				</>
			}
		</div>
	);
}

export type PasswordListProps =
	{
		className?: string;
		passwords: string[];
	};

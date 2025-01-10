import { Button, Input, InputOnChangeData, MessageBar, MessageBarBody, MessageBarTitle, Text, Toast, ToastTitle, useToastController } from "@fluentui/react-components";
import { bundleIcon, Key24Regular, Save20Filled, Save20Regular } from "@fluentui/react-icons";
import { PropsWithChildren, ReactElement } from "react";
import { useStyles } from "./GeneratorForm.styles";

export default function GeneratorForm(props: GeneratorFormProps): ReactElement
{
	const [passwordCount, private_setPasswordCount] = useState<number | null>(5);
	const [error, setError] = useState<string | null>(null);
	const toaster = useToastController();

	const cls = useStyles();
	const SaveIcon = bundleIcon(Save20Filled, Save20Regular);

	const setPasswordCount = useCallback((_: any, e: InputOnChangeData) =>
	{
		const n = parseInt(e.value ?? "1");
		private_setPasswordCount(isNaN(n) || n < 1 ? null : Math.min(n, 1000));
	}, []);

	const onSubmit = useCallback((args: React.FormEvent<HTMLFormElement>) =>
	{
		args.preventDefault();

		try
		{
			setError(null);
			props.onGenerate(passwordCount ?? 1);
		}
		catch (ex)
		{
			setError((ex as Error).message);
		}
	}, [props.onGenerate, passwordCount]);

	const onSave = useCallback(async () =>
	{
		props.onSave();
		await browser.storage.sync.set({ AdvancedBulkCount: passwordCount ?? 5 });

		toaster.dispatchToast(
			<Toast>
				<ToastTitle>{ i18n.t("advanced.saved_msg") }</ToastTitle>
			</Toast>,
			{
				intent: "success",
				timeout: 1000
			}
		);
	}, [props.onSave, toaster, passwordCount]);

	useEffect(() =>
	{
		browser.storage.sync.get("AdvancedBulkCount").then(({ AdvancedBulkCount }) =>
			private_setPasswordCount(AdvancedBulkCount as number ?? 5)
		);
	}, []);

	return (
		<form onSubmit={ onSubmit } className={ cls.root }>
			{ props.children }

			{ error &&
				<MessageBar intent="error">
					<MessageBarBody>
						<MessageBarTitle>{ error }</MessageBarTitle>
					</MessageBarBody>
				</MessageBar>
			}

			<div className={ cls.actionRoot }>
				<div className={ cls.bulkRoot }>
					<Key24Regular />
					<Text align="center">x</Text>
					<Input value={ passwordCount?.toString() ?? "" } onChange={ setPasswordCount } />
				</div>
				<Button appearance="primary" type="submit">{ i18n.t("advanced.actions.generate") }</Button>
			</div>

			<Button appearance="subtle" icon={ <SaveIcon /> } onClick={ onSave }>
				{ i18n.t("advanced.actions.save_config") }
			</Button>
		</form>
	);
}

export type GeneratorFormProps = PropsWithChildren &
{
	onSave: () => void;
	onGenerate: (count: number) => void;
};

import { GeneratePassword } from "@/utils/PasswordGenerator";
import { GeneratorOptions, useStorage } from "@/utils/storage";
import useTimeout from "@/utils/useTimeout";
import * as fui from "@fluentui/react-components";
import * as ic from "@fluentui/react-icons";
import { useEffect, useState } from "react";
import { useStyles } from "./GeneratorView.styles";
import QuickOptions from "./QuickOptions";

const GeneratorView: React.FC<{ collapse: boolean }> = props =>
{
	const { generatorOptions } = useStorage();
	const [options, setOptions] = useState<GeneratorOptions>(generatorOptions);
	const [showInsert, setShowInsert] = useState<boolean>(false);
	const [password, setPassword] = useState<string>("");
	const [error, setError] = useState<string | null>(null);

	const [refreshTimer, copyTimer, insertTimer] = [useTimeout(310), useTimeout(1000), useTimeout(1000)];
	const cls = useStyles();

	const refresh = useCallback(() =>
	{
		setError(null);
		try { setPassword(GeneratePassword(options)); }
		catch (e) { setError((e as Error).message); }
	}, [options]);

	const copy = useCallback(async () =>
	{
		await window.navigator.clipboard.writeText(password);
		copyTimer.trigger();
	}, [password]);

	const insert = useCallback(async () =>
	{
		const tabId: number = (await browser.tabs.query({ active: true, currentWindow: true }))[0].id!;
		await browser.tabs.sendMessage(tabId, password);
		insertTimer.trigger();
		copy();
	}, [password]);

	useEffect(() => setOptions(generatorOptions), [generatorOptions]);
	useEffect(refresh, [options]);
	useEffect(refreshTimer.trigger, [password]);

	useEffect(() =>
	{
		(async () =>
		{
			try
			{
				const tabId: number = (await browser.tabs.query({ active: true, currentWindow: true }))[0].id!;
				const fieldCount: number = await browser.tabs.sendMessage(tabId, "probe");

				if (fieldCount > 0)
					setShowInsert(true);
			}
			catch { }
		})();
	}, []);

	return (
		<section className={ cls.root }>
			{ error ?
				<fui.MessageBar intent="warning" className={ cls.msgBar }>
					<fui.MessageBarBody>{ error }</fui.MessageBarBody>
				</fui.MessageBar>
				:
				<fui.Input
					className={ cls.input }
					readOnly value={ password }
					contentAfter={ <>
						<fui.Tooltip content={ i18n.t("common.copy") } relationship="label">
							<fui.Button
								appearance="subtle" onClick={ copy }
								icon={
									copyTimer.isActive ?
										<ic.CheckmarkRegular className={ cls.copyIcon } /> :
										<ic.CopyRegular className={ cls.copyIcon } />
								} />
						</fui.Tooltip>

						<fui.Tooltip content={ i18n.t("generator.refresh") } relationship="label">
							<fui.Button
								appearance="subtle" onClick={ refresh }
								icon={
									<ic.ArrowClockwiseRegular className={ fui.mergeClasses(refreshTimer.isActive && cls.refreshIcon) } />
								} />
						</fui.Tooltip>

						{ showInsert &&
							<fui.Tooltip content={ i18n.t("generator.insert") } relationship="label">
								<fui.Button
									appearance="subtle" onClick={ insert }
									icon={
										insertTimer.isActive ?
											<ic.CheckmarkRegular className={ cls.copyIcon } /> :
											<ic.ArrowRightRegular className={ cls.copyIcon } />
									} />
							</fui.Tooltip>
						}
					</> } />
			}

			{ !props.collapse &&
				<QuickOptions onChange={ e => setOptions(e) } />
			}
		</section>
	);
};

export default GeneratorView;

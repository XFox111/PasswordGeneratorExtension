import { generatePassword } from "@/utils/generators/generatePassword";
import { GeneratorOptions } from "@/utils/storage";
import useTimeout from "@/utils/useTimeout";
import { Button, Input, mergeClasses, MessageBar, MessageBarBody, Tooltip } from "@fluentui/react-components";
import { ArrowClockwise20Regular, CheckmarkRegular, Copy20Regular } from "@fluentui/react-icons";
import { ReactElement, useEffect, useState } from "react";
import { useStyles } from "./GeneratorView.styles";

export default function GeneratorView({ options }: GeneratorViewProps): ReactElement
{
	const [password, setPassword] = useState<string>("");
	const [error, setError] = useState<string | null>(null);

	const [refreshTimer, copyTimer] = [useTimeout(310), useTimeout(1000)];
	const cls = useStyles();

	const refresh = useCallback(() =>
	{
		if (!options)
			return;

		setError(null);
		try
		{
			setPassword(generatePassword({
				length: options.Length,
				uppercase: options.Uppercase,
				lowercase: options.Lowercase,
				numeric: options.Numeric,
				special: options.Special,
				custom: options.Custom,
				excludeSimilar: options.ExcludeSimilar,
				excludeAmbiguous: options.ExcludeAmbiguous,
				excludeRepeating: options.ExcludeRepeating,
				excludeCustom: options.ExcludeCustom,
				customSet: options.IncludeCustom
			}));
		}
		catch (e) { setError((e as Error).message); }

		refreshTimer.trigger();
	}, [options]);

	const copy = useCallback(async () =>
	{
		await window.navigator.clipboard.writeText(password);
		copyTimer.trigger();
	}, [password]);

	useEffect(refresh, [options]);

	if (error)
		return (
			<MessageBar intent="warning" className={ cls.msgBar }>
				<MessageBarBody className={ cls.msgBarBody }>{ error }</MessageBarBody>
			</MessageBar>
		);

	return (
		<Input
			className={ cls.input }
			readOnly value={ password }
			contentAfter={ <>
				<Tooltip content={ i18n.t("common.actions.copy") } relationship="label">
					<Button
						appearance="subtle" onClick={ copy }
						icon={
							copyTimer.isActive ?
								<CheckmarkRegular className={ cls.copyIcon } /> :
								<Copy20Regular className={ cls.copyIcon } />
						} />
				</Tooltip>

				<Tooltip content={ i18n.t("popup.refresh") } relationship="label">
					<Button
						appearance="subtle" onClick={ refresh }
						icon={
							<ArrowClockwise20Regular className={ mergeClasses(refreshTimer.isActive && cls.refreshIcon) } />
						} />
				</Tooltip>
			</> } />
	);
};

export type GeneratorViewProps =
	{
		options: GeneratorOptions | null;
	};

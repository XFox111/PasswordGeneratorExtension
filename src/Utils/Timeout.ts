import { useState } from "react";

export function useTimeout(timeout: number)
{
	const [isActive, setActive] = useState<boolean>(false);

	const trigger = () =>
	{
		setActive(true);
		setTimeout(() => setActive(false), timeout);
	};

	return { isActive, trigger };
}

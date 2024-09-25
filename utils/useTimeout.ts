import { useState } from "react";

export default function useTimeout(timeout: number)
{
	const [isActive, setActive] = useState<boolean>(false);

	const trigger = () =>
	{
		setActive(true);
		setTimeout(() => setActive(false), timeout);
	};

	return { isActive, trigger };
}

import { useState, useEffect } from "react";
import { Theme, webDarkTheme, webLightTheme } from "@fluentui/react-components";

export function useTheme(lightTheme?: Theme, darkTheme?: Theme): Theme
{
	const media = window.matchMedia("(prefers-color-scheme: dark)");

	const getTheme = (isDark: boolean) =>
		isDark ? (darkTheme ?? webDarkTheme) : (lightTheme ?? webLightTheme);

	const [theme, setTheme] = useState<Theme>(getTheme(media.matches));

	useEffect(() =>
	{
		const updateTheme = (args: MediaQueryListEvent) => setTheme(getTheme(args.matches));
		media.addEventListener("change", updateTheme);
		return () => media.removeEventListener("change", updateTheme);
	}, []);

	return theme;
}

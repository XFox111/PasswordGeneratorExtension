import { BrandVariants, Theme, createDarkTheme, createLightTheme } from "@fluentui/react-components";

const bmcBrandRamp: BrandVariants =
{
	"10": "#050201",
	"20": "#20140C",
	"30": "#372014",
	"40": "#492918",
	"50": "#5C321D",
	"60": "#6F3C21",
	"70": "#834525",
	"80": "#984F2A",
	"90": "#AD5A2E",
	"100": "#C36433",
	"110": "#D96E37",
	"120": "#EF793C",
	"130": "#FF884A",
	"140": "#FFA170",
	"150": "#FFB792",
	"160": "#FFCCB3"
};

export const bmcLightTheme: Theme =
{
	...createLightTheme(bmcBrandRamp),
	colorBrandBackground: bmcBrandRamp[110],
};

export const bmcDarkTheme: Theme =
{
	...createDarkTheme(bmcBrandRamp),
	colorBrandBackground: bmcBrandRamp[120],
	colorBrandForeground1: bmcBrandRamp[110],
	colorBrandForeground2: bmcBrandRamp[120]
};

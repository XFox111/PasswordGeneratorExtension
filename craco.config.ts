import { CracoConfig, WebpackContext } from "@craco/types";
import { Configuration as WebpackConfig } from "webpack";
import HtmlWebapckPlugin, { MinifyOptions } from "html-webpack-plugin";
import { Configuration } from "webpack";

// Craco config file
// Craco is used to separate content and background scripts from the main JS bundle
const cracoConfig: CracoConfig =
{
	webpack:
	{
		configure: ((webpackConfig: WebpackConfig, { env, paths }: WebpackContext): WebpackConfig =>
		{
			const isProduction: boolean = env === "production";

			const config: WebpackConfig =
			{
				...webpackConfig,
				entry:
				{
					main: paths!.appIndexJs,
					background: "./src/Services/BackgroundService.ts",
					contentScript: "./src/Services/ContentService.ts",
				},
				output:
				{
					...webpackConfig.output,
					filename: "static/js/[name].js"
				},
				optimization:
				{
					...webpackConfig.optimization,
					splitChunks: { cacheGroups: { default: false } },
					runtimeChunk: false
				}
			};

			const minifyOptions: MinifyOptions =
			{
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true
			};

			config.plugins = config.plugins?.filter((plugin: any) => plugin.constructor.name !== "HtmlWebpackPlugin") ?? [];

			config.plugins.push(new HtmlWebapckPlugin({
				inject: true,
				chunks: ["main"],
				template: paths!.appHtml,
				filename: "index.html",
				minify: isProduction && minifyOptions
			}));

			return config;
		})
	}
};

export default cracoConfig;

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

// var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env, argv) => {

	return {
		context: path.resolve(__dirname, './src'),

		entry: {
			app: './index.ts'
		},

		output: {
			filename: '[name].[contenthash].bundle.js',
			chunkFilename: '[name].[contenthash].bundle.js',
			path: path.resolve(__dirname, 'dist'),
		},

		devServer: {
			historyApiFallback: true,
			noInfo: false,
		},

		devtool: "source-map",

		resolve: {
			extensions: ['.ts', '.js'],
			alias: {
				'vue': 'vue/dist/vue.esm.js'
			}
		},

		module: {
			rules: [
				{
					test: /\.ts?$/,
					loader: 'ts-loader',
					options: { transpileOnly: true }
				},
				{
					test: /\.scss$/,
					use: [
						MiniCssExtractPlugin.loader,
						"css-loader",
						"sass-loader"
					]
				},
				{ test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loader: 'file-loader?name=assets/[name].[ext]' },
				{
					test: /\.(png|jpg|gif|svg)$/,
					use: [
						{
							loader: 'file-loader',
							options: {
								name: '[name].[ext]',
								outputPath: 'assets/img',
								publicPath: 'assets/img'
							}
						}
					]
				}
			]
		},

		plugins: [
			new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ['dist']}),
			new HtmlWebpackPlugin({
				template: "./index.html",
				title: 'VueJs Typescript Template',
				filename: "index.html",
				chunksSortMode: "manual",
				chunks: ['polyfills', 'vendors', 'app'],
				favicon: 'favicon.ico'
			}),
			new MiniCssExtractPlugin({
				filename: "style.[contenthash].css",
				chunkFilename: "style.css"
			}),
			new CopyWebpackPlugin([
				// copy static assets here
			]),
			new webpack.DefinePlugin({
				// define environment vars here
			})
		],

		optimization: {
			splitChunks: {
				cacheGroups: {
					commons: { test: /[\\/]node_modules[\\/]/, name: "vendors", chunks: "all" }
				}
			},
			minimizer: [
				new UglifyJsPlugin({
					uglifyOptions: {
						output: {
							comments: false
						}
					}
				}),
				new OptimizeCSSAssetsPlugin({})
			]
		}
	}

	// plugins: [new BundleAnalyzerPlugin()]
};

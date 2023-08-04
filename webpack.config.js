const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DotenvWebpack = require('dotenv-webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const IS_DEV = process.env.NODE_ENV === 'development'

const config = {
	entry: path.join(__dirname, 'src', 'index.tsx'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/[name].min.js',
		publicPath: 'auto'
	},
	resolve: {
		extensions: [ '.js', '.ts', '.tsx' ]
	},
	devServer: {
		allowedHosts: [ '0.0.0.0', 'dev.taydenflitcroft.com' ],
		historyApiFallback: true,
		hot: true,
		port: 3000,
		setupMiddlewares: (middlewares, { app }) => {
			require(path.join(__dirname, 'mocks', 'mock-routes.ts'))(app)
			return middlewares
		}
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'template', 'index.html'),
			minify: {
				collapseWhitespace: true
			}
		}),
		new DotenvWebpack({
			path: path.join(__dirname, `.env${ IS_DEV ? '' : '.production' }`),
			allowEmptyValues: true
		}),
		new MiniCssExtractPlugin({
			filename: 'css/[name].min.css'
		}),
		new CssMinimizerPlugin(),
		new CopyWebpackPlugin({
			patterns: [
				{ from: path.join(__dirname, 'public', 'media'), to: path.join(__dirname, 'dist', 'media') }
			]
		})
	],
	module: {
		rules: [
			{
				test: /.tsx?$/,
				use: 'babel-loader',
				exclude: /node-modules/
			}, {
				test: /.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{ loader: 'css-loader' },
					{ loader: 'postcss-loader' }
				]
			}
		]
	},
	optimization: {
		minimize: !IS_DEV,
		minimizer: [ new TerserPlugin() ]
	}
}

config.mode = IS_DEV ? 'development' : 'production'

module.exports = config

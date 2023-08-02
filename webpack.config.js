const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DotenvWebpack = require('dotenv-webpack')

const IS_DEV = process.env.NODE_ENV === 'development'

const config = {
	entry: path.join(__dirname, 'src', 'index.tsx'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/[name].min.js',
		publicPath: '/'
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
		new webpack.LoaderOptionsPlugin({
			options: {
				postcss: [ autoprefixer ]
			}
		}),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'template', 'index.html'),
			minify: {
				collapseWhitespace: true
			}
		}),
		new DotenvWebpack({
			path: path.join(__dirname, `.env${ IS_DEV ? '' : '.production' }`),
			allowEmptyValues: true
		})
	],
	module: {
		rules: [
			{
				test: /.tsx?$/,
				use: 'babel-loader',
				exclude: /node-modules/
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

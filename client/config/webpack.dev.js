var path    = require('path');
var webpack = require('webpack');

module.exports = {
  resolve: {
		modulesDirectories: ['node_modules', 'client/app', 'client/app/components'],
		root: path.join(process.cwd(), 'client/app'),
		extensions: ['', '.js', '.jsx', '.scss', '.css']
	},
	devtool: 'sourcemap',
	entry: [
    path.join(process.cwd(), 'client/app/app.jsx'),
    'webpack-dev-server/client?http://localhost:8080/'
  ],
	output: {
		path: path.join(process.cwd(), 'client/build/assets'),
    publicPath: 'http://localhost:8080/assets',
		filename: 'bundle.js'
	},
	resolveLoader: {
    modulesDirectories: ['node_modules', 'web_modules', 'src']
	},
	debug: true,
  plugins: [
    new webpack.DefinePlugin({
        __DEV__: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
	module: {
		loaders: [
				{ test: /\.js$/, exclude: [/app\/lib/, /node_modules/], loaders: ['react-hot','babel'] },
        { test: /\.jsx$/, exclude: [/app\/lib/, /node_modules/], loaders: ['react-hot','babel']},
			  { test: /\.html$/, loader: 'raw' },
        { test: /\.scss$/, loader: 'style!css!sass' },
				{ test: /\.css$/, loader: 'style!css' },

			  // Needed for the css-loader when [bootstrap-webpack](https://github.com/bline/bootstrap-webpack)
			  // loads bootstrap's css.
			  { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,   loader: "url?limit=10000&minetype=application/font-woff" },
				{ test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,   loader: "url?limit=10000&minetype=application/font-woff" },
			  { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&minetype=application/octet-stream" },
			  { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file" },
			  { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&minetype=image/svg+xml" }
			]
	}
}

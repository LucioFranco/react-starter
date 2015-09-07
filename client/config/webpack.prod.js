var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  resolve: {
		modulesDirectories: ['node_modules', 'client/app'],
		root: path.join(process.cwd(), 'client/app'),
		extensions: ['', '.js', '.jsx', '.scss', '.css']
	},
	entry: {
    bundle: path.join(process.cwd(), 'client/app/app.jsx'),
    vendor: [
      'react'
    ]
  },
	output: {
		path: path.join(process.cwd(), 'client/build/assets'),
		filename: '[name].js'
	},
	resolveLoader: {
		modulesDirectories: ['node_modules', 'web_modules', 'src']
	},
  plugins: [
    new webpack.DefinePlugin({
        __DEV__: false
    }),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.CommonsChunkPlugin({
       name: 'vendor',
       filename: 'vendor.bundle.js',
       chunks: ['bundle']
     }),
    new ExtractTextPlugin("bundle.css"),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      mangle: {
        except: ['exports', 'require']
      }
    }),
    new webpack.NoErrorsPlugin()
  ],
	module: {
		loaders: [
				{ test: /\.js$/, exclude: [/app\/lib/, /node_modules/], loader: 'babel' },
        { test: /\.jsx$/, exclude: [/app\/lib/, /node_modules/], loader: 'babel' },
			  { test: /\.html$/, loader: 'raw' },
        { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!sass') },
				{ test: /\.css$/, loader: ExtractTextPlugin.extract("style", "css") },

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

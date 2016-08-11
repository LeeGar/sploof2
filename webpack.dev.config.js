const path = require('path');
const webpack = require('webpack');
// const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
// const webpackIsomorphicConfig = require('./webpack-isomorphic-config');

// const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(webpackIsomorphicConfig)
//   .development()

module.exports = {
  devtool: 'source-map',
  context: path.resolve(__dirname, ''),
  entry: [ 
  './client/index.js'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  resolve: {
    alias: {},
    // require() file without adding .jsx and .js .suffix
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    //new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
    //webpackIsomorphicToolsPlugin
  ],
  module: {
	  loaders: [
	    {
	      test: /\.jsx?$/,
	      loader: 'babel',
	      exclude: /node_modules/,
	      include: __dirname,
	      query: {
	        presets: [ 'react-hmre', "es2015", "stage-0", "react" ],
	      }
	    },
	    {
	      test: /\.css$/,
	      loader: "style!css",
	    },
	  ]
  }
};

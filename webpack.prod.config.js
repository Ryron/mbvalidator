var merge = require('webpack-merge')
var webpack = require('webpack')
var path = require('path')
var baseWebpackConfig = require('./webpack.config')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var UglifyJSPlugin = require('uglifyjs-webpack-plugin')
var config = merge(baseWebpackConfig, {
  output: {
    filename: 'mbValidator.min.js'
  },
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
        compress:{
            warnings:false
        }
    })
	]
});
module.exports = config;
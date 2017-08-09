var webpack = require('webpack')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname,'./dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.css'],
    alias: {   // 别名设置
    }
  },
  module: {
    rules: [
      {
        test:/\.js$/,
        use: [
          'babel-loader',
          'eslint-loader'
        ]
      },
      {
        test:/\.css$/,
        use: [
        {
          loader: "style-loader",
        },
        {
          loader: "css-loader"
        }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {  
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8080
  }
}

module.exports = config;
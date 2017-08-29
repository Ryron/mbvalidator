var webpack = require('webpack')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var UglifyJSPlugin = require('uglifyjs-webpack-plugin')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
const config = {
  entry: ['./src/index.js'],
  output: {
    path: path.resolve(__dirname,'./dist'),
    filename: 'validator.js'
  },
  externals: {
    'Zepto': 'Zepto'
  },
  resolve: {
    extensions: ['.js', '.css', '.vue'],
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
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './template.html'
    }),
    new webpack.HotModuleReplacementPlugin()
    // new UglifyJSPlugin({
    //   compress: {
    //     warnings: true
    //   }
    // })
  ],
  devServer: {  
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8080
  }
}

module.exports = config;
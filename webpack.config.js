var webpack = require('webpack')
var path = require('path')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
const config = {
  entry: ['./src/index.js'],
  output: {
    path: path.resolve(__dirname,'./dist'),
    filename: 'validator.js',
    publicPath:"/assets/"
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
        use: [{
          loader: 'babel-loader',
          query: {
              'presets': ['es2015'],
          }
        },{
          loader: 'eslint-loader'
        }
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
  devServer: {
  }
}

module.exports = config;
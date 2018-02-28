var path = require('path')
var webpack = require('webpack')
var UglifyJSPlugin = webpack.optimize.UglifyJsPlugin
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
module.exports = {
  entry: './src/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist')
  },
  resolve: {
    extensions: ['.jsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }, {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react']
          }
        }
      },
      {
        test: /\.html?$/,
        loader: 'html-loader'
      },
      { test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, loader: 'url-loader' }

    ]
  },
  // devtool: 'source-map',
  plugins: [
    // 清空dist
    new CleanWebpackPlugin(['dist']),
    // 压缩
    new UglifyJSPlugin(),
    // 加入 html 模板任务
    new HtmlWebpackPlugin({
      // 模板文件
      template: 'src/index.html',
      // 打包后文件名称，会自动放到 output 指定的 dist 目录
      filename: 'index.html'
    }),
    new ExtractTextPlugin('style.css'),
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname, './src/images/icons'), to: path.resolve(__dirname, './dist/images/icons') }
    ])
  ]
}

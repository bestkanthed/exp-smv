/* eslint-disable */
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: ['./src/index'],
  devtool: "inline-sourcemap",
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devServer: {
    port: 7357,
    contentBase: './dist',
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        exclude: /node_modules|packages/,
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties']        
        }
      },
      {
        test: [/\.scss$/, /\.css$/],
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      }
    ],
  },
  plugins: [
    /*
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    */
    new HtmlWebpackPlugin({
      template: './dist/index.html',
      inject: false
    }),
    new webpack.NamedModulesPlugin(),
    /*
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: true
        },
        output: {
          comments: false
        },
        sourceMap: false
      }
    })
    */
  ],
}

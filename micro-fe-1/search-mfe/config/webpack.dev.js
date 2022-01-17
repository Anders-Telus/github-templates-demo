const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const packageJson = require('../package.json')
const commonConfig = require('./webpack.common')

const devConfig = {
  mode: 'development',
  // entry: '../src/index.web.js',
  output: {
    publicPath: 'http://localhost:8001/'
  },
  devServer: {
    port: 8001,
    historyApiFallback: {
      index: '/index.html'
    }
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'searchexperience',
      filename: 'remoteEntry.js',
      exposes: {
        './experience': './src/bootstrap'
      },
      shared: packageJson.dependencies
    }),
    new HtmlWebpackPlugin({
      template: './static/index.html'
    })
  ]
}

module.exports = merge(commonConfig, devConfig)

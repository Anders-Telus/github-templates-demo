const paths = require("./paths");
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const packageJson = require('../package.json')

module.exports = merge(common, {
  // Set the mode to development or production
  mode: "development",

  // Control how source maps are generated
  devtool: "inline-source-map",

  // Spin up a server for quick development
  devServer: {
    historyApiFallback: true,
    contentBase: paths.build,
    open: true,
    compress: true,
    hot: true,
    port: 8000,
  },

  plugins: [
    // Only update what has changed on hot reload
    new webpack.HotModuleReplacementPlugin(),
    new ModuleFederationPlugin({
      name: 'mfxp-container-mve',
      remotes: {
        searchexperience: 'searchexperience@http://localhost:8001/remoteEntry.js',
        createnoteexperience: 'createnoteexperience@http://localhost:8004/remoteEntry.js'
      },
      shared: packageJson.dependencies
    })
  ],
});

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  module: {
    rules: [
      {
        test: /\.m?(js|jsx)$/,
        resolve: {
          extensions: ['.js', '.jsx', '.web.js', '.scss', '.css'],
          alias: {
            "react-native$": "react-native-web",
          },
        },
     
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
            plugins: ['react-native-web', '@babel/plugin-syntax-jsx']
          }
        }
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['preact', '@babel/preset-env'],
            },
          },
          {
            loader: '@svgr/webpack',
            options: { babel: false },
          }
        ],
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './static/index.html'
    })
  ]
}
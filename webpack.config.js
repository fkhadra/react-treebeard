var path = require('path');
var webpack = require('webpack');

module.exports = {
  cache: true,
  entry: {
    app: './example/app.js'
  },
  output: {
    path: __dirname,
    filename: './app.min.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: [/node_modules\/(?!react-treebeard).*/],
      loaders: ['babel-loader?stage=0']
    }]
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
}
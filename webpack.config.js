module.exports = {
  context: __dirname + '/app',
  entry: './src/index.js',
  output: {
    path: __dirname + '/app',
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel', exclude: /node_modules/},
      {test: /\.html$/, loader: 'raw'},
      {test: /\.sass$/, loader: 'style!css!sass?indentedSyntax'},
    ]
  }
}

const webpack = require('webpack');
const path = require('path');

const PORT = 1337;
let entryPoints = [];

if (process.env.NODE_ENV !== 'production') {
  entryPoints = [`webpack-dev-server/client?http://localhost:${PORT}`, 'webpack/hot/only-dev-server'];
}

entryPoints.push('./src/index.js');

module.exports = {
  entry: entryPoints,
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'react-hot-loader!babel-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              includePaths: [path.resolve(__dirname, './src/styles.scss')],
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: ['./dist', './node_modules'],
    hot: true,
    historyApiFallback: true,
    port: PORT,
  },
  plugins: [
    new webpack.ProvidePlugin({
      fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch',
    }),
  ],
};

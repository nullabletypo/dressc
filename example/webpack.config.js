const path = require('path')
const webpack = require('webpack')
const NotifierPlugin = require('webpack-notifier')

module.exports = (_env, { mode }) => ({
  context: path.resolve(__dirname),
  entry: './index.tsx',
  output: {
    path: path.join(__dirname, 'examples'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|tsx?)$/,
        exclude: /(\/node_modules\/|\.test\.tsx?$)/,
        loader: 'awesome-typescript-loader',
        options: {
          configFileName: path.resolve(__dirname, 'tsconfig.json'),
          module: 'esnext',
        },
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new NotifierPlugin({ title: 'Webpack' }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  devtool: mode === 'production' ? 'none' : 'inline-source-map',
  devServer: {
    contentBase: 'examples',
    historyApiFallback: true,
    noInfo: true,
    hot: true,
  },
})

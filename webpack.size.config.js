const path = require('path')

module.exports = (_env, { mode }) => ({
  context: path.resolve(__dirname, 'src'),
  entry: './index.ts',
  output: {
    path: path.join(__dirname, 'pref'),
    filename: 'bundle-size.js',
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|tsx?)$/,
        exclude: /(\/node_modules\/|\.test\.tsx?$)/,
        loader: 'awesome-typescript-loader',
        options: {
          outDir: 'pref',
          declaration: false,
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  devtool: mode === 'production' ? 'none' : 'inline-source-map',
  stats: 'errors-only',
})

const path = require('path')

module.exports = {
    entry: path.resolve(__dirname, './index.js'),
    output: {
      path: path.resolve(__dirname, './lib'),
      filename: 'index.js',
      library: {
        type: 'commonjs',
      },
    },
    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        }
      ]
    },
    resolve: {
      extensions: ['*', '.js']
    },
}
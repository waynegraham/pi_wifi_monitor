const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  watch: true,
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: {
      directory: path.join(__dirname),
    },
    compress: true,
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
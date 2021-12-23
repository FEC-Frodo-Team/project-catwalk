// const path = require('client/src');

module.exports = {
  entry: __dirname + "/client/index.js",
  output: {
    filename: 'bundle.js',
    path: __dirname + "/client/dist"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  }
}

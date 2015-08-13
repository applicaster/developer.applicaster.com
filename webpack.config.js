const webpack = require('webpack');
const path = require("path");

module.exports = {  
  entry: [
    //'webpack/hot/only-dev-server',
    "./src/client/app.js"
  ],
  output: {
    path: __dirname + '/dist',
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.js?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
      {
        test: /\.scss$/,
        loader: 'style!css!sass?root=.'
      },
      { test: /\.png$/,    loader: "url-loader?limit=10000&minetype=image/png" }
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
  ],

  resolve: {
    extensions: ["", ".js", ".sass"],
    modulesDirectories: ["src", "node_modules"],
  },

};

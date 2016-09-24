var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var precss = require('precss');

module.exports = {
  entry: "./public/javascripts/entry.js",

  output: {
      path:'./public/javascripts/',
      filename: 'index.js',
   },

  
  plugins: [
    new webpack.DefinePlugin({
      'process.env':{
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        query: {
          presets: ["react", "es2015"],
          plugins: ["transform-object-rest-spread"]
        }
      },
      {
        test: /\.(css|less)$/,
        loader: 'style-loader!css-loader!postcss-loader!less-loader'
      },
      { test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'url-loader?limit=10000&name=./images/[name].[ext]'
      }
    ]
  },

  postcss: function(){
    return [autoprefixer, precss];
  },
  watch: true
};

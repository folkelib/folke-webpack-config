"use strict";
const extractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const fs = require('fs');

const environment = process.env.ASPNETCORE_ENVIRONMENT || process.env.NODE_ENV;
const production = environment && (environment.startsWith("prod") || environment == "staging");

const plugins = [ new extractTextPlugin('[name].css') ];
if (production) {
    plugins.push(new webpack.optimize.UglifyJsPlugin());
}

const files = fs.readdirSync("./src");
const entries = {};
for (let file of files) {
    if (!file.match(/\.d\.ts$/)) {
        const match = file.match(/^(.*)\.ts$/);
        if (match) {
            entries[match[1]] = "./src/" + file;
        }
    }
}

module.exports = {
    entry: entries,
    output: {
        path: 'wwwroot',
        filename: '[name].js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js'],
        modulesDirectories: ['node_modules'],
        root: path.resolve("./node_modules")
    },
    module: {
        loaders: [
          { test: /\.ts$/, loader: 'ts-loader' },
          { test: /\.html$/, loader: 'raw-loader' },
          { test: /\.less$/, loader: extractTextPlugin.extract('style-loader', 'css-loader!less-loader') },
          { test: /\.(jpe?g|gif|png|eot|svg|woff2?|ttf)(\?.*)?$/, loader: 'file-loader' }
        ]
    },
    plugins: plugins,
    devtool: 'source-map',
}
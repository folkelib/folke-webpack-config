"use strict";
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const fs = require('fs');

const environment = process.env.ASPNETCORE_ENVIRONMENT || process.env.NODE_ENV;
const production = environment && (environment.startsWith("prod") || environment == "staging");

const extractTextPlugin = new ExtractTextPlugin('[name].css');
const plugins = [ extractTextPlugin ];
if (production) {
    plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = function(dir) {
    const files = fs.readdirSync(path.join(dir, "./src"));
    const entries = {};
    for (let file of files) {
        if (!file.match(/\.d\.ts$/)) {
            const match = file.match(/^(.*)\.tsx?$/);
            if (match) {
                entries[match[1]] = "./src/" + file;
            }
        }
    }

    return {
        entry: entries,
        context: path.resolve(dir, ""),
        output: {
            path: path.resolve(dir, 'wwwroot'),
            filename: '[name].js',
            publicPath: '/'
        },
        resolve: {
            extensions: ['.tsx', '.jsx', '.ts', '.js']
        },
        module: {
            loaders: [
            { test: /\.tsx?$/, loader: 'ts-loader' },
            { test: /\.html$/, loader: 'raw-loader' },
            { test: /\.less$/, loader: extractTextPlugin.extract('style-loader', 'css-loader!less-loader') },
            { test: /\.(jpe?g|gif|png|eot|svg|woff2?|ttf)(\?.*)?$/, loader: 'file-loader' }
            ]
        },
        plugins: plugins,
        devtool: 'source-map',
    }
}
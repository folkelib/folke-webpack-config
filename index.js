const extractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/index.ts',
    output: {
        path: 'wwwroot',
        filename: 'index.js',
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
    plugins: [
        new extractTextPlugin('[name].css')
    ],
    devtool: 'source-map',
}
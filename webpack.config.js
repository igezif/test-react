'use strict';
const path = require('path');

const webpack = require('webpack');

const ExtractTextPlugin  = require('extract-text-webpack-plugin');

module.exports = {

    //context: path.join(__dirname, '/js'),
    context: __dirname,

    entry: './frontend/app.js',

    output: {
        path:     './assets',
        filename: 'main.js',
    },

    resolve: {
        modulesDirectories: ['node_modules'],
        extensions:         ['', '.js', '.jsx']
    },

    resolveLoader: {
        modulesDirectories: ['node_modules'],
        moduleTemplates:    ['*-loader', '*'],
        extensions:         ['', '.js', '.jsx']
    },

    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                include: [
                    path.join(__dirname, './frontend')
                ],
                loader: 'babel',
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('css')
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=8192'
            },
            {
                test: /\.(mp4|ogg|svg)$/,
                loader: 'file-loader'
            }
        ]
    },

    plugins: [
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin('main.css', { allChunks : true }),
    ]

};
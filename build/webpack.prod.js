const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require("compression-webpack-plugin");
const CommmonConfig = require('./webpack.config');
const WebpackMerge = require('webpack-merge');
module.exports = WebpackMerge.merge(CommmonConfig, {
    mode: 'production',
    devtool: 'none',
    plugins: [
        new CleanWebpackPlugin(),    //清除残上次留打包
        new BundleAnalyzerPlugin()
    ],
})
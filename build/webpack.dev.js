const path = require('path');
const CommmonConfig = require('./webpack.config');
const WebpackMerge = require('webpack-merge');
module.exports = WebpackMerge.merge(CommmonConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        port: 3000,
        hot: true,
        static: {
            directory: path.join(__dirname, 'dist1'),
        },
    },
    // plugins: [
    //     new Webpack.HotModuleReplacementPlugin()
    // ]
})
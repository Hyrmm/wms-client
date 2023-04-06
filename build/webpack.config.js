
const HtmlWebpackPlugin = require('html-webpack-plugin')
const vueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path');
module.exports = {
    entry: path.resolve(__dirname, '../src/main.js'),    // 入口文件
    output: {
        filename: '[name].[hash:8].js',      // 打包后的文件名称
        path: path.resolve(__dirname, '../dist')  // 打包后的目录
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader',]
            },
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
                use: [{
                    loader: "file-loader",
                    options: {
                        outputPath: "./fonts",
                    }
                }]
            },
            {
                test: /\.less$/,
                use: ['vue-style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.(jpe?g|png|gif)$/i, //图片文件
                use: [{
                    loader: "file-loader",
                    options: {
                        outputPath: "./img",
                    }
                }]
            }, {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                }
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.runtime.esm.js',
            '@': path.resolve(__dirname, '../src')  //引入路径别名
        },
        extensions: ['*', '.js', '.json', '.vue']   //忽略文件后缀
    },

    plugins: [
        new HtmlWebpackPlugin({ template: path.resolve(__dirname, '../public/index.html') }), //HTML模板
        new vueLoaderPlugin()
    ],
}
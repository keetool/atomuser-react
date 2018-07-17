const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
    output: {
        publicPath: "/",
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
    },
    devServer: {
        contentBase: './dist',
        hot: true,
        port: 3000,
        historyApiFallback: true,
        stats: {
            children: false
        },
        host: '0.0.0.0',
        public: 'localhost:3000',
        disableHostCheck: true
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: "less-loader", options: {
                            javascriptEnabled: true,
                        }
                    }
                ]
            },
        ],
    },
    devtool: 'eval-cheap-module-source-map',
});
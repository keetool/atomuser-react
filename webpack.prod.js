const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
    output: {
        publicPath: "https://d255zuevr6tr8p.cloudfront.net/build-social/"
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                oneOf: [
                    {
                        exclude: /node_modules/,
                        use: [MiniCssExtractPlugin.loader, {
                            loader: "css-loader",
                            options: {
                                sourceMap: true,
                                modules: true,
                                localIdentName: '[local]__[hash:base64:5]',
                            },

                        }, {
                            loader: "less-loader", options: {
                                javascriptEnabled: true,
                            }
                        }]
                    },
                    {
                        include: /node_modules/,
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
            }
        ]
    },
})
;

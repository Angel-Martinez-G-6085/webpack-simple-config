const path=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const MiniCssExtractPlugin=require('mini-css-extract-plugin');
const FontConfigWebpackPlugin = require('font-config-webpack-plugin');

module.exports={
    mode:'development',
    devtool:'source-map',
    entry:'./src/index.js',
    output:{
        path:path.resolve(__dirname,'./dist'),
        filename:'js/[name].[contenthash].js',
    },
    resolve:{
        extensions:['.js'],
        alias:{
            '@styles': path.resolve(__dirname,'./src/scss/'),
            '@components': path.resolve(__dirname,'./src/components/'),
            '@fonts': path.resolve(__dirname,'./src/assets/fonts/'),
            '@templates': path.resolve(__dirname,'./src/templates/'),
        }
    },
    devServer:{
        contentBase: path.join(__dirname, './dist'),
        compress: true,
        port: 3000,
        open:true,
        watchContentBase: true
    },
    
    module:{
        rules:[
            {
                test:/\m?.js$/,
                exclude:/node_modules/,
                loader:'babel-loader'
            },
            {
                test:/\.scss$/i,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ]
            },
            {
                test:/\.css$/i,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use:[
                    {
                        loader: 'file-loader',
                        options: {
                        publicPath: '../',
                        outputpath:'./assets/images',
                        name: 'assets/images/[name].[ext]',
                        }
                    },
                    {
                        loader:'image-webpack-loader',
                        options:{
                            mozjpeg:{
                                progressive: true,
                            },
                            optipng: {
                                enabled: false,
                            },
                            pngquant:{
                                quality: [0.65, 0.90],
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            webp:{
                                quality: 75
                            },
                        },
                    }
                ]
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test:/\.(woff|woff2|ttf|eot|svg|otf)$/,
                loader: 'file-loader',
                options: {
                    publicPath: '../',
                    outputpath:'./assets/fonts',
                    name: 'assets/fonts/[name].[ext]',
                }
            },
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            inject:'body',
            template:'./public/index.html',
            filename:"./index.html"
        }),
        new MiniCssExtractPlugin({
            filename:'./styles/[name].[contenthash].css'
        }),
        new FontConfigWebpackPlugin({
            name: 'assets/fonts/[name].[ext]',
        }),
    ]
}
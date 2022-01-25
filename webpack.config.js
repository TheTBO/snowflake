const path = require('node:path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    mode: 'development',
    output:{
        path: path.resolve(__dirname, 'dist'),
    },
    entry: path.resolve(__dirname, 'src/sketch.js'),

    plugins: [new HtmlWebpackPlugin({
        title: 'Snowflake',
        template: path.resolve(__dirname, 'public/index.html'),
        inject: 'body',
    })],
}
const path = require('path');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
module.exports = merge(common, {
    mode: 'development',
    devServer: {
        hot: true,
        open: true,
        contentBase: path.join(__dirname, './output'),
        port: 2333,
        host: '127.0.0.1',
        historyApiFallback: true
    }
});
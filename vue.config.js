const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: '/admin/',
    configureWebpack: {
        publicPath: '/admin/',
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            comments: false
        }),

    ],
}


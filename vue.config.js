const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    outputDir: 'dist',
    configureWebpack: {
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
    ]

}


const path = require('path')

let mode = process.env.NODE_ENV
let filename = 'websocket-client.js'
let devtool = 'none'

if (mode === 'development') {
    filename = 'websocket-client.dev.js'
    devtool = '#source-map'
}
module.exports = {
    mode,
    entry: './src/index.js',
    output: {
        filename,
        path: path.resolve(__dirname, 'lib'),
        library: 'WS',
        libraryTarget: 'window'
    },
    devtool,
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                include: [path.resolve(__dirname, './src')],
                exclude: /node_modules/
            }
        ]
    }
}

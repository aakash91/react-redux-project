const path = require("path");

module.exports = {
    mode: "development",
    entry: path.resolve(__dirname,`src`,`app`),
    output:{
        path:path.resolve(__dirname,`dist`),
        filename: 'bundle.js',
        publicPath: '/'
    },
resolve: {
    extensions: ['.js','.jsx']
},
devServer: {
    historyApiFallback: true,
    host: '192.168.0.20',
    port:8080
},
module: {
    rules:[{
        test: /\.jsx?/,
        loader:'babel-loader'
    }]
}
}
const webpack = require('webpack')
const path = require('path') // 引用path模块
// const pkg = require('../package.json')
const rootPath = path.resolve(__dirname, '../')
const isEnvDevelopment = false
module.exports = {
    devtool: 'source-map',
    entry: path.resolve(rootPath, 'src', "index.js"),
    // devtool: 'inline-source-map',
    output: {
        filename: 'mutils.min.js',
        path: path.resolve(rootPath, 'min'),
        clean: true, // 自动将上次打包目录资源清空
        library: "mutils",
        libraryTarget: "umd"
    },
    module: {
        rules: []
    },
    plugins: [
        //热更新插件
        new webpack.HotModuleReplacementPlugin()
    ],
    // 开发服务器：在dist文件夹里不会输出资源，资源是在内存中编译打包的
    devServer: {
        static: "./src/",
        liveReload: true,  // liveReload替代hot进行热更新
        host: "localhost", // 启动服务器域名
        port: "3000", // 启动服务器端口号
        // open: true, // 是否自动打开浏览器
    },
    mode: 'development'
}
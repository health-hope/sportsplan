const vuxLoader = require('vux-loader');
module.exports = {
    configureWebpack: config => {
        vuxLoader.merge(config, {
            options: {},
            plugins: ['vux-ui'],
        })
    },

    devServer: {
        port: 8081
    },
    lintOnSave: false,
    outputDir: 'sportsplan',
    assetsDir: undefined,
    publicPath: './',

    //包含运行时编译器的 Vue 构建版本
    runtimeCompiler: true,

    productionSourceMap: false,
    parallel: undefined,
    // todo 全局配置scss 不起作用，目前没有找到原因，故按文件单独引入
    // css: {
    //     loaderOptions: {
    //         sass: {
    //             data: `@import "~@/assets/style/mixin.scss";`
    //         }
    //     }
    // }
}
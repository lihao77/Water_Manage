const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')
const name = '钱塘江水管理' // 标题
const webpack = require('webpack')

function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    publicPath: './',
    devServer: {
        port: 8081,   // 端口号
    },

    //语法检查关闭
    lintOnSave: false,
    outputDir:'water',//打包的时候生成的一个文件名
    //配置代理（方式1）
    /* devServer:{
        proxy: 'http://localhost:8080'
    } */

    //配置代理（方式2）
    /* devServer: {
        proxy: {
            '/pei': {
                target: 'http://localhost:8080',
                pathRewrite: { '^/pei': '' },
                //用于支持websocket
                ws: true,
                //用于控制请求头中的host值
                changeOrigin: true
            }
        }
    } */

    configureWebpack: {
        name: name,
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            }
        }
    },

    configureWebpack: config => {
        if (process.env.NODE_ENV === "production") {
          // 为生产环境修改配置...
          config.mode = "production";
          // 这里修改下 
          config.optimization.minimizer = [
            new UglifyJsPlugin({
              uglifyOptions: {
                compress: {
                  drop_console: true, //console
                  drop_debugger: true,
                  pure_funcs: ['console.log'] //移除console
                }
              }
            })
          ]
          //打包文件大小配置
          config["performance"] = {
            "maxEntrypointSize": 10000000,
            "maxAssetSize": 30000000
          }
        } else {
          // 为开发环境修改配置...
          config.mode = "development";
        }
      },

    chainWebpack(config) {
        config.module
            .rule('svg')
            .exclude.add(resolve('src/icons'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()
        config
            .plugin('html')
            .tap((args) => {
                args[0].title = '钱塘江水质监测管理系统';
                return args;
            });
    },


}
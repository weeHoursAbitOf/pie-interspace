const path = require('path');
const webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
// const cssLoader = {
//   loader: 'css-loader',
//   options: {
//     sourceMap: options.sourceMap
//   }
// }

// const px2remLoader = {
//   loader: 'px2rem-loader',
//   options: {
//     remUnit: 192
//   }
// }
module.exports = {
  publicPath: './',
  lintOnSave: false,
  runtimeCompiler: true,
  configureWebpack: {
    resolve: {
      symlinks: false,
    },

  },
  devServer: {
    hot: true,
    open: true,
    port: 8080,
    proxy: {
      '/pie': {
        //本地服务接口地址
        target: 'http://10.0.0.3:8092',
        //远程演示服务地址,可用于直接启动项目
        //target: 'https://saber.bladex.vip/api',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/pie': 'http://10.0.0.5:30092'
        }
      },
      // '/text': {
      //   //本地服务接口地址
      //   target: 'http://172.16.10.18:30091',
      //   //远程演示服务地址,可用于直接启动项目
      //   //target: 'https://saber.bladex.vip/api',
      //   changeOrigin: true,
      //   ws: true,
      //   pathRewrite: {
      //     '^/text': ''
      //   }
      // }
    }
  },



  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require('postcss-px2rem')({
            remUnit: 192
          })
        ]
      }
    }
  },
  chainWebpack: config => {
    config.plugin('provide').use(webpack.ProvidePlugin, [{
      'window.Quill': 'quill'
    }]);
    // 配置less全局变量
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
    // 配置less全局变量

  },

}
function addStyleResource(rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/styles/variable.less'),
      ],
    })
}

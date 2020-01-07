module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        // port: port,
        open: true,
        overlay: {
          warnings: false,
          errors: true
        },
        proxy: {
    
            '/api': {
               target: `https://dev.app.qianyipan.com`, // 这个链接是要代理到的api地址
               changeOrigin: true,
               pathRewrite: {
                 '^/api': ''
               }
             }
           
     
         }
    }
}
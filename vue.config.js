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
               target: `http://39.97.210.157:9090/`, // 这个链接是要代理到的api地址
               changeOrigin: true,
               pathRewrite: {
                 '^/api': ''
               }
             }
           
     
         }
    }
}
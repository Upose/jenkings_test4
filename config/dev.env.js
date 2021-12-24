'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  VUE_APP_IMG_URL:'"http://192.168.21.71:5075"',//图片路径、域名前缀
  VUE_APP_template_url:'"http://192.168.21.71:9000"',//模板路径名
})

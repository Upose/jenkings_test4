'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  VUE_APP_FILE_URL: 'http://192.168.21.46:6900/',

  // VUE_APP_BASE_API: '"http://192.168.21.46:8000/"',//api域名
  // VUE_APP_IMG_URL: '"http://192.168.21.46:6900/"',//文件站点域名
})

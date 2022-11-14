'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  VUE_APP_FILE_URL: 'http://192.168.21.46/cdn/',
  LOCAL:'./static/js/',//本地第三方引入地址
})

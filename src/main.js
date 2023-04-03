import Vue from 'vue'
import App from './App'

import router from './router'
import store from '@/store'
import Debounce from '@/utils/debounce'
import './utils/plugin'
import './utils/scene'
import './utils/fileUP'
import previewComponent from './utils/previewComponent'

Vue.use(previewComponent)
Vue.config.productionTip = false
Vue.component('Debounce',Debounce)

let timer = setInterval(() => {
  if (axios && axios.defaults && axios.defaults.loaded) {
    clearInterval(timer);
    new Vue({
      el: '#home_sys',
      router,
      store,
      components: { App },
      data(){
        return{
          fileUrl:'',
          collapse:false,
        }
      },
      template: '<App/>'
    })
  }
}, 100)

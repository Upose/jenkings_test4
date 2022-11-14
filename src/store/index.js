import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: undefined,//token参数
    language:'zh-CN',//语言
    skin_template:'template1',
    userInfo:{},
    menuList:[],//后台左侧菜单
    appDetails:null,//应用信息
    baseinfo:{},
  },
  getters: {
    userInfo: (state) => state.userInfo,
    token: (state) => state.token,
    language: (state) => state.language||'zh-CN',
  },
  mutations: {
    baseinfo: (state, data) => {
      state.baseinfo = data;
    },
    menuList: (state, data) => {
      state.menuList = data;
    },
    appDetails: (state, data) => {
      state.appDetails = data;
    },
    login: (state, data) => {
      state.token = data.token || undefined;
      sessionStorage.setItem('token',data.token);
    },
    setUserInfo: (state, data) => {
      state.userinfo = data || {};
      localStorage.setItem('userInfo',JSON.stringify(data));
    },
    logout: (state) => {
      state.token = undefined;
      sessionStorage.clear();
    },
    setLanguage:(state,data)=>{
      state.language = data.language || 'zh-CN';
      sessionStorage.setItem('language',data.language);
    },
    setSkinTemplate:(state,data)=>{
      state.skin_template = data.skin_template || 'template1';
      sessionStorage.setItem('skin_template',data.skin_template);
    },
    getSession:(state)=>{
      state.userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
      state.token = sessionStorage.getItem('token') || undefined;
      state.language = sessionStorage.getItem('language') || 'zh-CN';
      state.skin_template = sessionStorage.getItem('skin_template') || 'template1';
    },
  },
});


/**
 * 使用：
 * js中使用 this.$store.state.menus;   页面中使用 {{ $store.state.menus }}
 * this.$store.commit('logout',{});方法调用
 */
/***
 * 用sessionStorage存数据
 * 默认先从sessionStorage里面取
 * 然后放入state里面，便于页面取值
 * 
 * 在main.js里面判断是否session还存在，不存在跳到登录，存在则将信息重新存储到store中
 * 退出登录的时候，要将session全部清除掉
 */




<template>
<div class="web-warp" :class="skin_template">
    <div class="content-warp"><router-view></router-view></div>
    <div class="template-warp">
      <span @click="skinClick('template1')" class="c1">中国红</span>
      <span @click="skinClick('template2')" class="c2">景泰蓝</span>
      <span @click="skinClick('template4')" class="c3">青竹绿</span>
      <span @click="skinClick('template5')" class="c4">克莱因蓝</span>
    </div>
</div>
</template>
<style scoped lang="less">
.web-warp{
    min-width: 1200px;
    width: 100%;
    height: 100%;
    position: relative;
}
.template-warp{
  position: fixed;
  top: 50%;
  right:10px;
  z-index: 99;
  margin-top: -200px;
  span{
    display: block;
    line-height:50px;
    color: #fff;
    font-weight: bold;
    text-align: center;
    font-size: 12px;
    padding: 2px;
    cursor: pointer;
    margin-bottom: 10px;
    border-radius: 4px;
    border: 1px solid #fff;
  }
  .c1{
    background: #d10016;
  }
  .c2{
    background: #0269b8;
  }
  .c3{
    background: #02997f;
  }
  .c4{
    background: #3e54ee;
  }
}
</style>
<script>
export default {
  name: 'index',
  mounted(){
    
  },
  data () {
    return {
      skin_template:this.$store.state.skin_template||'template1',
    }
  },
  methods:{
    addStyle(url){
      var link=document.createElement("link"); 
      link.setAttribute("rel", "stylesheet"); 
      link.setAttribute("type", "text/css"); 
      link.setAttribute("href", url);
      document.getElementsByTagName("body")[0].appendChild(link);
    },
    addScript(url){
      var js_element=document.createElement("script");
      js_element.setAttribute("type","text/javascript");
      js_element.setAttribute("src",url);
      document.getElementsByTagName("body")[0].appendChild(js_element);
    },
    skinClick(val){
      this.skin_template = val;
      this.$store.state.skin_template = this.skin_template;
      this.$store.commit('setSkinTemplate',{skin_template:this.skin_template});
    },
  }
}
</script>



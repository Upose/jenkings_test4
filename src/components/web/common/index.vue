<template>
<div class="web-warp" :class="skin_template">
    <div class="content-warp"><router-view></router-view></div>
    <div class="template-warp">
      <span @click="skinClick('template1')">红</span>
      <span @click="skinClick('template2')">蓝</span>
      <span @click="skinClick('template3')">绿</span>
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
  top: 10px;
  right: 0;
  span{
    cursor: pointer;
    padding: 1px 2px;
    border-radius: 4px;
    background-color: #eee;
    border: 1px solid #eee;
  }
}
</style>
<script>
export default {
  name: 'index',
  mounted(){
    console.log(this.$store.state.skin_template);
    if(this.$store.state.skin_template == 'template1'){
        
      }else{
        
      }
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
      // this.$refs.skin_template.add(val);
      this.skin_template = val;
      this.$store.state.skin_template = this.skin_template;
      this.$store.commit('setSkinTemplate',{skin_template:this.skin_template});
      setTimeout(() => {
          window.location.reload();
      }, 1000);
    },
  }
}
</script>



<!--热门服务模板-->
<template>
  <div class="services-w">
    <div class="l-title">
      <label>
        <span>热门</span>
        <span>服务</span>
      </label>
      <a href="javascript:;">更多服务 +</a>
    </div><!--title end-->

    <div class="r-link">
      <div class="r-link-box" v-for="i in 8" :key="i">
        <img src="#">
        <span>开馆时间</span>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
  .services-w{
    color: #fff;
    width: 100%;
    height: 110px;
    background: rgba(83, 83, 83, 0.65);
    border-radius: 5px 5px 0px 0px;
  }
</style>

<script>
export default {
  created(){},
  data () {
    return {
        
    }
  },
  mounted(){
  },
  methods:{
      
  },
}
</script>


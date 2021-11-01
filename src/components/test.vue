<template>
  <div class="news-warp-page">
    测试页面
  </div>
</template>

<script>
import http from "@/assets/public/js/http";
export default {
  name: 'footerPage',
  created(){},
  data () {
    return {
      
    }
  },
  mounted(){
    //   this.initData();
  },
  methods:{
      initData(){
        http.getPlain('AssetNewest','PlateId=109&PageSize=9&PageIndex=1').then(res=>{ //学生专区
            this.list1 = res.result.dtos||[];
        }).catch(err=>{
            console.log(err);
        })
      },
  },
}
</script>

<style lang="less" scoped>
    .footer-page{
       text-align: center;
    }
</style>

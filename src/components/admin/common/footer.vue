<template>
  <div class="footer-page">
    版权所有© 2019-2021 Chongqing weipuzhitu Data Technology Co., Ltd.,　客服热线：023-63016015
  </div>
</template>

<script>
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
        this.http.getPlain('AssetNewest','PlateId=109&PageSize=9&PageIndex=1').then(res=>{ //学生专区
            this.list1 = res.result.dtos||[];
        }).catch(err=>{
            console.log(err);
        })
      },
  },
}
</script>

<style lang="less" scoped>
@import "../../../assets/admin/css/color.less";/**颜色配置 */
@import "../../../assets/admin/css/style.less";/**颜色配置 */
  .footer-page{
    text-align: center;
    color: @6C757D;
    font-size: 12px;
    height: 40px;
    line-height: 40px;
  }
</style>

<!--面包屑-->
<template>
  <div class="breadcrumb-page">
    <el-breadcrumb separator-class="el-icon-arrow-right" :class="fontColor?'fff':'gray'">
        <!-- <el-breadcrumb-item :to="{ path: '/' }"><i class="el-icon-s-home"></i></el-breadcrumb-item> -->
        <!-- <el-breadcrumb-item>服务中台</el-breadcrumb-item>  -->
        <el-breadcrumb-item v-for="(item,index) in breadcrumbList" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'breadcrumbPage',
  created(){
  },
  props:['cuMenu','fontColor'],
  data () {
    return {
      breadcrumbList:[]
    }
  },
  mounted(){
    //   this.initData();
    this.breadcrumbList = this.$route.meta.title.split('-');
  },
  methods:{
      initData(){
        this.http.getPlain('AssetNewest','PlateId=109&PageSize=9&PageIndex=1').then(res=>{
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
  .breadcrumb-page{
    color: @34395E;
    height: 30px;
  }
  .fff{
    /deep/ .el-breadcrumb__inner{
      color: @fff !important;
    }
    /deep/ .el-breadcrumb__separator{
      color: @fff !important;
    }
  }
</style>

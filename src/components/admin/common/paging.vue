<!--分页-->
<template>
  <div class="paging-page">
    <!--<el-pagination background layout="total,prev, pager, next" :total="100"></el-pagination>-->
    <el-pagination background 
      @size-change="SizeChange"
      @current-change="CurrentChange"
      :current-page="pagedata.pageIndex"
      :page-sizes="pageSizes"
      :page-size="pagedata.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagedata.totalCount">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'pagingPage',
  created(){
  },
  props:['pagedata'],
  data () {
    return {
      pageSizes:[]
    }
  },
  mounted(){
    // 如果每页条数设置小于50 条数下拉选择框增加当前条数
    if(this.pagedata.pageSize < 50){
      // let sizeList = [50,100,150,200];
      // sizeList.unshift(this.pagedata.pageSize);
      // this.pageSizes = sizeList;
      this.pageSizes = [10,20,50,100,150,200];
    }else{
      this.pageSizes = [50,100,150,200];
    }
  },
  methods:{
      SizeChange(val) {
        // console.log(`每页 ${val} 条`);
        // this.pagedata.pageSize = val;
        this.$emit('pagechange',{key:'pageSize',value:val})
      },
      CurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.pagedata.pageIndex = val;
        this.$emit('pagechange',{key:'pageIndex',value:val})
      },
  },
}
</script>

<style lang="less" scoped>
@import "../../../assets/admin/css/color.less";/**颜色配置 */
@import "../../../assets/admin/css/style.less";/**颜色配置 */
.paging-page{
  padding-top: 20px;
  text-align: right;
  /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active{
    background-color:@6777EF;
  }
  /deep/ .el-pagination.is-background .el-pager li:not(.disabled):hover{
    color:@9CADFF;
  }
}
</style>

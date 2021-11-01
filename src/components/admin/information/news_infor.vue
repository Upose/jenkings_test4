<!---新闻发布-具体栏目（新闻列表）-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse?'fold-menu':''"><serviceLMenu :isActive="2"></serviceLMenu></el-aside>
      <el-main class="admin-content pd admin-bg-top" :class="{'content-collapse':$root.collapse}">
        <breadcrumb :cuMenu="'新闻发布'" :fontColor="'fff'"></breadcrumb><!--面包屑导航--->
        <div class="content search-table-general">
            <div class="search-table-w">
                <h1 class="search-title">馆内资讯</h1>
                <div class="search-term" v-if="auditStatusCountList.length>0">
                  <div class="col-select" :class="auditStatus_menu==index?'col-select-active':''" v-for="(it,index) in auditStatusCountList" :key="index+'audit'" @click="auditStatus(index,it)"><span>{{it.name||'无'}}</span><span class="number">{{it.counts||0}}</span></div>
                   <!-- <h2 class="m-title" v-if="auditStatusCountList.length>0">
                    <el-button size="medium" v-for="(it,index) in auditStatusCountList" :key="index+'audit'" class="gray-btn" @click="auditStatus(0)">{{it.name||'无'}}({{it.counts||0}})</el-button>
                  </h2> -->
                </div>
            </div><!--顶部查询 end-->
            <div class="table-w">
              <div class="search-table-w">
                  <div class="search-term">
                      <el-input class="width187" v-model="postForm.searchKey" size="medium" placeholder="标题/内容/发布者"></el-input>
                      <el-select class="width136" v-if="isHasCatalogue" v-model="postForm.lableId" size="medium" placeholder="子类">
                          <el-option v-for="item in lableList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                      <el-date-picker class="width187" v-model="postForm.beginCreateTime" size="medium" type="date" placeholder="创建时间"></el-date-picker>
                      <el-date-picker class="width187" v-model="postForm.endCreateTime" size="medium" type="date" placeholder="更新时间"></el-date-picker>
                      <el-button type="primary" size="medium" icon="el-icon-search" @click="searchClick()">查找</el-button>
                      <div class="r-btn">
                        <el-button type="primary" size="medium" @click="newsAdd()">新增新闻</el-button>
                        <el-button size="medium" class="gray-btn" @click="allOut()">批量下架</el-button>
                        <el-button size="medium" class="gray-btn" @click="allDel()">批量删除</el-button>
                      </div>
                  </div>
                </div><!--顶部查询 end-->
                <div class="t-p">
                    <el-table stripe :data="tableData" ref="singleTable" @selection-change="handleSelectionApp" border class="admin-table">
                        <el-table-column type="selection" width="45"></el-table-column>
                        <el-table-column prop="indexNum" label="序号" align="center" width="58"></el-table-column>
                        <el-table-column prop="title" label="新闻标题"></el-table-column>
                        <el-table-column prop="parentCatalogue" label="子类" v-if="isHasCatalogue">
                           <template slot-scope="scope">
                            <span v-for="(item,index) in (scope.row.parentCatalogue||[])">{{item.value}},</span>
                          </template>
                        </el-table-column>
                        <el-table-column prop="statusName" label="状态">
                          <template slot-scope="scope">
                            <span :class="scope.row.aduitStatus==8?'color-blue':'color-red'">{{scope.row.statusName}}</span>
                          </template>
                        </el-table-column>
                        <el-table-column prop="publisher" label="发布者"></el-table-column>
                        <el-table-column prop="createdTime" label="创建时间">
                          <template slot-scope="scope">
                            <span>{{(scope.row.createdTime||'0000-00-00').substring(0,10)}} </span>
                          </template>
                        </el-table-column>
                        <el-table-column prop="updateTime" label="更新时间">
                          <template slot-scope="scope">
                            <span>{{(scope.row.updateTime||'0000-00-00').substring(0,10)}} </span>
                          </template>
                        </el-table-column>
                        <el-table-column label="操作" min-width="380">
                          <template slot-scope="scope">
                            <el-button @click="handleEdit(scope.row)" type="text" size="mini" icon="el-icon-delete" round>编辑</el-button>
                            <el-button @click="handleAudit(scope.row)" type="text" size="mini" icon="el-icon-delete" round>{{scope.row.nextAuditBottonName||'审核'}}</el-button>
                            <el-button @click="handleDel(scope.row)" type="text" size="mini" icon="el-icon-delete" class="operate-red-btn" round>删除</el-button>
                            <el-button @click="handleSort(scope.row)" type="text" size="mini" icon="el-icon-delete" class="handleSort" round>排序</el-button>
                            <el-button @click="handlePreview(scope.row)" type="text" size="mini" icon="el-icon-delete" round>预览</el-button>
                          </template>
                        </el-table-column>
                        <el-table-column prop="content" label="操作记录" width="85">
                          <template slot-scope="scope">
                            <!-- <el-button @click="handleEdit(scope.row)" type="text" size="mini" round>日志</el-button> -->
                            <el-button @click="handleLog(scope.row)" type="text" size="mini">日志</el-button>
                          </template>
                        </el-table-column>
                    </el-table>
                    <!--<el-button size="small" class="default-btn-n-border next-btn">下一页</el-button>-->
                    <!-- <paging></paging> -->
                    <paging :pagedata="pageData" @pagechange="pageChange" v-if="pageData.totalCount"></paging>
                </div>
            </div><!--管理页列表 end--->
            
        </div><!---顶部查询板块 end--->
        <footerPage class="top20"></footerPage>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import paging from "@/components/admin/common/paging";
import footerPage from "@/components/admin/common/footer";
import breadcrumb from "@/components/admin/common/breadcrumb";
import serviceLMenu from "@/components/admin/common/serviceLMenu";
export default {
  name: 'index',
  created(){
    this.bus.$on('collapse', msg => {
      this.$root.collapse = msg;
    })
    //获取栏目详情
    this.http.postJson('news-column-content-manage-get',this.postForm.columnID).then(res=>{
      if(res.data){
        this.auditStatusCountList = res.data.auditStatusCountList||[];
        this.lableList = res.data.lableList||[];
        this.isHasCatalogue = res.data.isHasCatalogue;
      }
    }).catch(err=>{
        console.log(err);
    })
  },
  watch:{
    '$route':'getId'
  },
  mounted(){
    this.initData();
    this.dragSort();
  },
  components:{footerPage,serviceLMenu,breadcrumb,paging},
  data () {
    return {
      auditStatus_menu:0,//菜单
      multipleSelection:[],//选择列表
      pageData: {
        pageIndex: 1,
        pageSize: 50,
      },//分页参数
      isHasCatalogue:false,//是否显示子类
      //列表查询条件
      postForm:{
        "columnID": this.$route.query.id||"",//栏目id 左边菜单
        "pageIndex":1,
        "pageSize":50,
        "searchKey": "",
        "lableId": "",
        "auditStatus": 0,
      },
      lableList:[
        {
          value: '选项1',
          label: '选项1'
        }
      ],
      auditStatusCountList: [
      //   {
      //   value: '已发布',
      //   label: '1',
      //   number:569,
      // },{
      //   value: '待提交',
      //   label: '2',
      //   number:56,
      // },{
      //   value: '待初审',
      //   label: '3',
      //   number:0,
      // },{
      //   value: '待初校',
      //   label: '4',
      //   number:0,
      // },{
      //   value: '待二审',
      //   label: '5',
      //   number:0,
      // },{
      //   value: '待二校',
      //   label: '6',
      //   number:0,
      // },{
      //   value: '待终审',
      //   label: '7',
      //   number:0,
      // },{
      //   value: '待终校',
      //   label: '8',
      //   number:0,
      // },{
      //   value: '待发布',
      //   label: '9',
      //   number:0,
      // },{
      //   value: '已退回',
      //   label: '10',
      //   number:0,
      // },{
      //   value: '已下架',
      //   label: '11',
      //   number:0,
      // }
      ],
      tableData:[{},{},{}],
    }
  },
  methods:{
    //初始化数据
    initData(){
      this.postForm.pageIndex = this.pageData.pageIndex;
      this.postForm.pageSize = this.pageData.pageSize;
      this.http.postJson('news-content-get-by-column',this.postForm).then(res=>{
        this.tableData = res.data.newsContents.items || [];
        this.auditStatusCountList = res.data.auditStatusCountList||[];
        this.pageData.totalCount = res.data.newsContents.totalCount;
        // if(this.tableData.length>0){
        //   this.auditStatus(0,this.tableData[0]);
        // }
        this.dragSort();
      }).catch(err=>{
          console.log(err);
      })
    },
    // 分页 页面修改
    pageChange(data) {
      this.pageData[data.key] = data.value;
      this.initData();
    },
    getId(){
      this.postForm['columnID'] = this.$route.query.id;
      this.initData();
      this.$forceUpdate();
    },
    // 获取图标
    coverUrl(url){
      this.postForm.cover = url;
    },
    // 点击排序
    handleSort(row) {
      var _this = this;
      this.$prompt('请输入序号', '排序', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[0-9]*$/,
        inputErrorMessage: '请输入正确的序号'
      }).then(({ value }) => {
        _this.byIndex('alertNum',row.id,value,'',false);
      }).catch(() => {
        _this.$message({type: 'info',message: '取消输入'});
      });
    },
    //排序提交
    byIndex(type,sourceID,sortIndex,TargetCataID,isUp){ //ghost 拖动 alertNum 输入序号
      var _this = this;
      if(type == 'ghost'){ //拖动排序
        this.http.postJson('news-sort-content-by-target',{"sourceID": sourceID,"targetCataID": TargetCataID,"isUp": isUp}).then(res=>{
          _this.$message({type: 'success',message: '排序成功!'});
          _this.initData();
        }).catch(err=>{
          _this.$message({type: 'error',message: '排序失败'});
         
        })
      }else{ //输入序号排序
        this.http.postJson('news-sort-content-by-index',{sourceID:sourceID,sortIndex:sortIndex}).then(res=>{
          _this.$message({type: 'success',message: '排序成功!'});
           _this.initData();
        }).catch(err=>{
           _this.$message({type: 'error',message: '排序失败'});
        })
      }
    },
    //表格拖动排序
    dragSort() {
      const el = this.$refs.singleTable.$el.querySelectorAll(
        ".el-table__body-wrapper > table > tbody"
      )[0];
      this.sortable = Sortable.create(el, {
        animation: 150,
        ghostClass: "sortable-ghost",
        // handle: '.handleSort',
        onEnd: e => {
          // 拖动了但是没有改变位置 不执行
          if (e.newIndex == e.oldIndex) {
            return;
          }
          //e.oldIndex为拖动一行原来的位置，e.newIndex为拖动后新的位置
          const targetRow = this.tableData.splice(e.oldIndex, 1)[0];
          this.tableData.splice(e.newIndex, 0, targetRow);
          // console.log(this.tableData, '排序后的数据')
          let dragId = this.tableData[e.newIndex].id; //拖动行的id
          let oneId, twoId, isUp, curId;
          //拖动行的前一行
          if (this.tableData[e.newIndex - 1]) {
            oneId = this.tableData[e.newIndex - 1].id;
          } else {
            oneId = "";
          }
          //拖动行的后一行
          if (this.tableData[e.newIndex + 1]) {
            twoId = this.tableData[e.newIndex + 1].id;
          } else {
            twoId = "";
          }
          // 是否向上移动
          isUp = e.newIndex - e.oldIndex < 0 ? true : false;
          // 目标id
          curId = isUp ? twoId : oneId;
          // console.log(dragId, oneId, twoId, isUp, curId)
          //这里提交
           this.byIndex('ghost',dragId,'',curId,isUp); //SourceID:源ID,TargetCataID:目标ID, isUp:位置(true:上，false:下)
        }//onEnd
      });
    },
    //审核状态
    auditStatus(index,row){
      this.auditStatus_menu = index;
      this.postForm['auditStatus'] = row.auditStatus||0;
      this.postForm.pageIndex = 1;
      this.postForm.pageSize = 50;
      this.initData();
    },
    //批量下架
    allOut(){
      var _this = this;
      if(this.multipleSelection.length>0){
        this.$confirm('是否确定取消?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '关闭',
          type: 'warning'
        }).then(() => {
          this.http.postJson('news-content-off-shelf',this.multipleSelection).then(res=>{//传数组
            _this.$message({type: 'success',message: '下架成功!'});
            _this.initData();
          }).catch(err=>{
            console.log(err);
          })
        }).catch(() => {
          _this.$message({type: 'info',message: '已关闭'});          
        });
      }else{
        _this.$message({type: 'info',message: '请选择要批量操作的数据'});      
      }
    },
    //批量删除
    allDel(){
      var _this = this;
      if(this.multipleSelection.length>0){
        this.$confirm('是否确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '关闭',
          type: 'warning'
        }).then(() => {
          this.http.postJson('news-content-delete',this.multipleSelection).then(res=>{//传数组
            _this.$message({type: 'success',message: '删除成功!'});
            _this.initData();
          }).catch(err=>{
            console.log(err);
          })
        }).catch(() => {
          _this.$message({type: 'info',message: '已关闭'});          
        });
      }else{
        _this.$message({type: 'info',message: '请选择要批量操作的数据'});      
      }
    },
    //评审
    handleAudit(row){
      var _this = this;
      this.$confirm('是否通过该新闻初审?', '提示', {
          confirmButtonText: '通过',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.http.postJson('news-content-update-audit-status',{contentID:row.id,auditStatus:row.aduitStatus}).then(res=>{//传数组
            _this.$message({type: 'success',message: '操作成功!'});
            _this.initData();
          }).catch(err=>{
            _this.$message({type: 'error',message: '操作失败!'});
          })
        }).catch(() => {
          // console.log('弹窗新窗口，填写退回备注（输入框，0-200字）状态改为已退回');     
        });
    },
    //预览
    handlePreview(row){
      console.log(row);
    },
    //新增新闻
    newsAdd(){
      this.$router.push({path:'/addNews',query:{c_id:this.$route.query.id}})
    },
    //编辑新闻
    handleEdit(row){
      this.$router.push({path:'/addNews',query:{id:row.id,c_id:this.$route.query.id}})
    },
    //新闻日志
    handleLog(row){
      this.$router.push({path:'/newsLog',query:{id:row.id}})
    },
    /**表格选择框**/
    handleSelectionApp(val) {
      var list = [];
      val.forEach(item=>{
        list.push(item.id);
      })
      this.multipleSelection = list;
    },
    //查找
    searchClick(){
      this.initData();
      this.pageData.pageIndex = 1;
      this.pageData.pageSize = 50;
    },
    //删除
    handleDel(row){
      var _this = this;
      this.$confirm('是否确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.http.postJson('news-content-delete',[row.id]).then(res=>{
            _this.$message({type: 'success',message: '删除成功!'});
            _this.initData();
          }).catch(err=>{
            console.log(err);
          })
      }).catch(() => {
        _this.$message({type: 'info',message: '已取消'});          
      });
    },
  },
}
</script>

<style lang="less" scoped>
@import "../../../assets/admin/css/color.less";/**颜色配置 */
@import "../../../assets/admin/css/style.less";/**颜色配置 */
@import "../../../assets/admin/css/table.less";
</style>

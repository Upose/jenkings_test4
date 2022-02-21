<!---服务中台-栏目-左边2,3步骤 -->
<template>
  <div class="right-check-page">
    <div class="drag-r-warp">
        <h1 class="step-num"><span class="num">4</span><span class="txt">应用设置：页头主导航</span></h1>
        <div class="select-type">
            <h2 class="s-title">选择样式</h2>
            <div class="s-list">
                <div class="d-temp-box" v-for="(it,i) in template_list" :key="i" :style="{'background-image':'url('+it.cover+')'}">
                    <span class="temp-name">{{it.name||'无'}}</span>
                    <el-button type="primary" class="button" size="mini" @click="appsTemplate(it,i)"><i class="iconfont" :class="template_check == it.id?'el-icon-vip-check':'el-icon-vip-no-check'"></i> 选用</el-button>
                </div>
            </div>
            </div><!--选择样式 end-->

            <div class="select-type">
            <h2 class="s-title bor-botm">设置内容</h2>
            <div class="s-choose">
               <div class="" v-for="(it,i) in set_list" :key="i">
                    <div class="s-c-row" v-if="availableConfig.indexOf('1')>-1">
                        <h2 class="s-title">绑定栏目 <!--<span class="s-edit" @click="addRow()">添加</span>--></h2>
                        <el-select class="w-saml" v-model="it.id" size="medium" placeholder="请选择">
                            <el-option v-for="(item,i) in appPlateList" :key="i+'c'" :label="item.key" :value="item.value"></el-option>
                        </el-select>
                    </div>
                    <div class="s-c-row" v-if="availableConfig.indexOf('2')>-1">
                        <h2 class="s-title">显示条数</h2>
                        <el-select class="w-saml" v-model="it.topCount" size="medium" placeholder="请选择">
                            <el-option v-for="(item,i) in topCountList" :key="i+'b'" :label="item.key" :value="item.value"></el-option>
                        </el-select>
                    </div>
                    <div class="s-c-row" v-if="availableConfig.indexOf('3')>-1">
                        <h2 class="s-title">排序规则</h2>
                        <el-select class="w-saml" v-model="it.sortType" size="medium" placeholder="请选择">
                            <el-option v-for="(item,i) in sortList" :key="i+'a'" :label="item.key" :value="item.value"></el-option>
                        </el-select>
                    </div>
               </div>
                <button class="s-c-add" @click="addRow()" v-if="this.availableConfig.indexOf('1')!=-1"><i class="el-icon-plus"></i><span>添加</span></button>
                <el-button class="default-btn-border btn-block" icon="el-icon-setting"  v-if="isShowBtn()" @click="saveClick('edit')" size="medium">保存</el-button>
            </div>
        </div><!--设置内容 end-->
    </div><!--右边菜单 end-->
  </div>
</template>

<script>
export default {
  name: 'index',
  mounted(){},
  data () {
    return {
      is_add:true,//是点击应用添加，还是点击的渲染模板，true为点击应用
      availableConfig:'',//显示哪几栏设置
      sortList:[],//排序列表
      topCountList:[],//显示条数列表
      appPlateList:[],//栏目列表

      template_list:[],//模板列表
      template_check:'',//选择的模板id

      set_list:[ //这里为了渲染有哪几栏，有哪些设置参数
        {
            topCount:'',//数据条数-（需要参数）
            sortType:'',//排序方式 1-创建时间倒序 2-访问量倒序-（需要参数）
            id:'',//应用栏目标识 -（需要参数）
            orderIndex:1,
        }
      ],
    }
  },

  methods:{
    //设置详情
    setDatils(val){
    //   console.log(val);
    },
    //应用详情
    appDetails(val){
        // console.log(val);
        var _this = this;
        _this.is_add = val.is_add;
        //获取应用组件列表 /{appid}
        _this.http.getPlain_url('app-widget-list-by-app-id','/'+val.id).then(res=>{
            _this.template_list = res.data||[];
            if(val.is_add){
                _this.set_list = [{topCount:'',sortType:'',id:'',orderIndex:1}];
                //获取模板列表，默认选中第一个模板
                if(_this.template_list.length>0){
                    //默认选择添加第一个模板之后，需要将当前渲染的那一个模板id拿到，方便做应用选择。
                    _this.appsTemplate(_this.template_list[0],'add');
                    _this.template_check = _this.template_list[0].id;
                    _this.$emit('addCompont',{'list':_this.template_list[0],'is_add_compont':true});
                }
            }else{//修改
                _this.set_list = JSON.parse((val.set_list||"[]").replace(/'/g,'"'));
                console.log(_this.set_list);
                if(_this.set_list.length==0){
                    _this.set_list = [{topCount:'',sortType:'',id:'',orderIndex:1}];
                }
                _this.template_check = val.temp_id;
                var index = 0;
                _this.template_list.forEach((item,i)=>{
                    if(item.id == val.temp_id){
                        index = i;
                    }
                })
                _this.appsTemplate(_this.template_list[index],'edit');
            }
        }).catch(err=>{
            console.log(err);
        })
    },
    //选择某个模板
    appsTemplate(val,isAdd){
        // console.log('right',val,isAdd);
        this.template_check = val.id;

        this.availableConfig = val.availableConfig;//有哪几项设置
        this.sortList = val.sortList;//排序
        if(this.set_list[0] && !this.set_list[0].sortType){
            this.set_list[0].sortType = val.sortList[0].value;
        }
        //获取应用栏目列表 /{appid}
        this.http.getPlain_url('app-plate-list-by-app-id','/'+val.appId).then(res=>{
            this.appPlateList = res.data||[];
            if(this.set_list[0] && !this.set_list[0].id){
                this.set_list[0].id = res.data[0].value;
            }
        }).catch(err=>{
            console.log(err);
        })
        this.topCountList = val.topCountList;//显示条数
        if(this.set_list[0] && !this.set_list[0].topCount){
            this.set_list[0].topCount = val.topCountList[0].value;
        }
        if(isAdd == 'add'){
            console.log('应用点击的默认添加第一个模板');
            setTimeout(()=>{
                this.saveClick('add');
            },100)
        }else{//修改这个地方，稍微有点问题。
            val['appPlateItems'] = this.set_list||[];
            this.$emit('addCompont',{'list':val,'is_add_compont':false});
        }
        this.$forceUpdate();
    },
    //添加一组
    addRow(){
        var index = this.set_list.length;
        this.set_list.push({
            topCount:'',
            sortType:'',
            id:'',
            orderIndex:index+1,
        });
    },
    //是否显示保存按钮
    isShowBtn(){
        if(this.availableConfig && this.availableConfig!=""){
            return true;
        }else{
            return false;
        }
    },
    /**保存的时候，需要将所有的参数循环塞入到对应选择的模板中，塞入到close按钮上一层参数。循环塞入，可能有多层。
        取值时，需要将所有的参数获取，并且也需要循环取多层值。然后根据顺序，默认到页面取的数组中去。、
    */
    saveClick(val){
        var is_cu_temp = document.getElementsByClassName('mask-layer-active');
        var divId = is_cu_temp[0].parentNode.dataset.id;
        is_cu_temp[0].setAttribute('data-set',JSON.stringify(this.set_list));
        is_cu_temp[0].offsetParent.setAttribute('data-set',JSON.stringify(this.set_list));
        // var cs = is_cu_temp[0].offsetParent.getAttribute('class').replace('jl_vip_zt_vray','');
        // is_cu_temp[0].offsetParent.setAttribute('class',cs);
        //将父级的jl_vip_zt_vray去除
        this.$emit('saveTempSet',{'list':this.set_list,'divId':divId});//这里还需要把内容存到要要提交的数据中
        if(val == 'edit'){
            this.$message({message: '设置成功',type: 'success'});
            console.log('刷新');
            setTimeout(() => {
                this.appDetails({'id':is_cu_temp[0].dataset.appid,'temp_id':is_cu_temp[0].dataset.appwidgetid,'is_add':false,'set_list':JSON.stringify(this.set_list)});//设置成功，重新点击一次让模板刷新；
            }, 400);
        }
    },
  },
}
</script>

<style lang="less" scoped>
@import "../../../../assets/admin/css/color.less";/**颜色配置 */
@import "../../../../assets/admin/css/style.less";
.drag-r-warp{
    right: 0;
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.02);
    .cut-btn{
        right: 255px;
        border-radius:40px 0px 0px 40px;
    }
    .step-num{
        line-height: 60px;
        position: relative;
        &::after{
        content: '';
        display: block;
        position: absolute;
        height: 1px;
        left: -20px;
        right: -20px;
        bottom: 0;
        background-color: @EBEEF5;
        }
    }
    .s-title{
        font-size: 14px;
        color: @34395E;
        display: block;
        line-height: 30px;
        font-weight: bold;
    }
    .bor-botm{
        border-bottom: 1px solid @EBEEF5;
    }
    .select-type{
        /******************选择样式-模板 */
        .d-temp-box{
            width: 214px;
            height: 100px;
            padding: 10px;
            margin-bottom: 10px;
            border-radius: 3px;
            background-color: #A5B3CC;
            border: 1px solid #A5B3CC;
            position: relative;
            background-position: center;
            background-repeat: no-repeat;
            background-size: 100%;
            .temp-name{
                color: @fff;
            }
            .button{
                position: absolute;
                bottom: 10px;
                left:50%;
                margin-left: -37px;
                width: 74px;
                height: 28px;
                padding: 6px 14px;
                span{
                line-height: 28px;
                }
                i{
                font-size: 14px;
                }
                i.n-check{
                display: inline-block;
                border: 1px solid @fff;
                border-radius: 50%;
                width: 14px;
                height: 14px;
                vertical-align: bottom;
                }
            }
        }
        /******************设置内容 */
        .s-choose{
        .s-title{
            font-weight: 400;
            margin-top: 10px;
            .s-edit{
            cursor: pointer;
            color: @6777EF;
            float: right;
            user-select: none;
            &:hover{
                opacity: .9;
            }
            &:active{
                opacity: 1;
            }
            }
        }
        .s-c-add{
            cursor: pointer;
            width: 100%;
            outline: none;
            border: none;
            color: @6777EF;
            font-size: 14px;
            line-height: 40px;
            background-color: @fff;
            margin-top: 10px;
            border-bottom: 1px dashed @E4E6FC;
            i{
            font-size: 14px;
            margin-right: 8px;
            }
            &:hover{
            opacity: .9;
            }
            &:active{
            opacity: 1;
            }
        }
        .btn-block{
            width: 100%;
            margin-top: 30px;
        }
        }
    }
}
</style>

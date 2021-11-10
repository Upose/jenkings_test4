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
                    <el-button type="primary" class="button" size="mini" @click="appsTemplate(it,i)"><i class="iconfont" :class="template_check == it.id?'vip-check':'vip-no-check'"></i> 选用</el-button>
                </div>
            </div>
            </div><!--选择样式 end-->

            <div class="select-type">
            <h2 class="s-title bor-botm">设置内容</h2>
            <div class="s-choose">
               <div class="" v-for="(it,i) in set_list" :key="i">
                    <div class="s-c-row" v-if="it.availableConfig.indexOf('1')>-1">
                        <h2 class="s-title">绑定栏目 <span class="s-edit">编辑</span></h2>
                        <el-select class="w-saml" v-model="it.appPlateIds" size="medium" placeholder="请选择">
                            <el-option v-for="(item,i) in options" :key="i+'c'" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </div>
                    <div class="s-c-row" v-if="it.availableConfig.indexOf('2')>-1">
                        <h2 class="s-title">显示条数</h2>
                        <el-select class="w-saml" v-model="it.topCount" size="medium" placeholder="请选择">
                            <el-option v-for="(item,i) in it.topCountList" :key="i+'b'" :label="item.key" :value="item.value"></el-option>
                        </el-select>
                    </div>
                    <div class="s-c-row" v-if="it.availableConfig.indexOf('3')>-1">
                        <h2 class="s-title">排序规则</h2>
                        <el-select class="w-saml" v-model="it.sortType" size="medium" placeholder="请选择">
                            <el-option v-for="(item,i) in it.sortList" :key="i+'a'" :label="item.key" :value="item.value"></el-option>
                        </el-select>
                    </div>
               </div>
                <button class="s-c-add"><i class="el-icon-plus"></i><span>添加</span></button>
                <el-button class="default-btn-border btn-block" icon="el-icon-setting" @click="saveClick()" size="medium">保存</el-button>
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
      is_add:true,//是添加模板还是修改模板，true为添加
      template_list:[],//模板列表
      template_check:'',//选择的模板
      options:[],
      set_list:[ //这里为了渲染有哪几栏，有哪些设置参数
        {
            availableConfig:'1,2,3',//显示那几栏
            sortList:[{key:'添加时间倒序',value:'CreatedTime-DESC'}],//排序
            topCountList:[{key:'1',value:'1'},{key:'2',value:'2'}],//显示条数
            topCount:'',//数据条数-（需要参数）
            sortType:'CreatedTime-DESC',//排序方式 1-创建时间倒序 2-访问量倒序-（需要参数）
            appPlateIds:'',//应用栏目标识 -（需要参数）
        }
      ],
    }
  },

  methods:{
    appDetails(val){
        console.log(val);
        this.is_add = val.is_add||true;
        //获取应用组件列表 /{appid}
        this.http.getPlain_url('app-widget-list-by-app-id','/'+val.id).then(res=>{
            this.template_list = res.data||[];
            if(val.is_add){
                //获取模板列表，默认选中第一个模板
                if(this.template_list.length>0){
                    //默认选择添加第一个模板之后，需要将当前渲染的那一个模板id拿到，方便做应用选择。
                    this.appsTemplate(this.template_list[0],'add');
                    this.template_check = this.template_list[0].id;
                    this.$emit('addCompont',{'list':this.template_list[0],'is_add_compont':true});
                }
            }else{
                this.template_check = val.temp_id;
            }
        }).catch(err=>{
            console.log(err);
        })
    //获取应用栏目列表 /{appid}  (这个地方还未处理)
    //   this.http.getPlain_url('app-plate-list-by-app-id','/'+id).then(res=>{
    //     // console.log(res)
    //   }).catch(err=>{
    //     console.log(err);
    //   })
    },
    //选择某个模板
    appsTemplate(val){
        console.log(val);
        this.template_check = val.id;
        if(!this.is_add){
            console.log('修改指定模板');
            this.$emit('addCompont',{'list':this.template_list[0],'is_add_compont':false});
        }
        this.$forceUpdate();
    },
    //保存的时候，需要将所有的参数循环塞入到对应选择的模板中，塞入到close按钮上一层参数。循环塞入，可能有多层。
    //取值时，需要将所有的参数获取，并且也需要循环取多层值。然后根据顺序，默认到页面取的数组中去。
    saveClick(){

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

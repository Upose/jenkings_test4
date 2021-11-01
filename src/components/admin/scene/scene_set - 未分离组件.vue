<!---服务中台-栏目管理-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse?'fold-menu':''"><serviceLMenu_scene :isActive="1"></serviceLMenu_scene></el-aside>
      <el-main class="admin-content" :class="{'content-collapse':$root.collapse}">
        <!-- <breadcrumb :cuMenu="'栏目管理'"></breadcrumb>面包屑导航- -->
        <div class="content">
          <leftCheck></leftCheck>
          <div class="drag-top">
            <h1 class="step-num"><span class="num">1</span><span class="txt">场景信息</span></h1>
            <div class="search-top">
              <div class="s-col"><span class="s-txt">电脑门户：</span><el-input class="w-saml" v-model="postForm.name" size="medium" placeholder="首页"></el-input></div>
              <div class="s-col"><span class="s-txt">服务状态：</span>
                <el-select class="w-saml" v-model="postForm.val" size="medium" placeholder="请选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </div>
              <div class="s-col"><span class="s-txt">权限控制：</span>
                <el-select class="w-saml" v-model="postForm.val" size="medium" placeholder="请选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </div>
              <div class="s-col"><span class="s-txt">用户类型：</span>
                <el-select class="w-saml" v-model="postForm.val" size="medium" placeholder="请选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </div>
              <el-button class="default-btn-border" icon="el-icon-setting" size="medium">高级设置</el-button>
              <div class="s-r-btns">
                <el-button icon="el-icon-download" size="medium">复制链接</el-button>
                <el-button class="default-btn-border" icon="el-icon-download" type="primary" size="medium">保存</el-button>
                <el-button class="default-btn-border" icon="el-icon-download" type="primary" size="medium">预览</el-button>
              </div>
            </div>
          </div><!--顶部条件筛选 end-->

          <div class="drag-content" :style="{'min-height':drag_height+'px'}">
            <div class="drag-l">
              <h1 class="step-num"><span class="num">2</span><span class="txt">主题风格</span></h1>
              <el-collapse v-model="activeCollapse" @change="collapseClick" class="drag-collapse">
                <el-collapse-item title="请选择布局" name="1">
                  <div class="drag-box" v-for="i in 5" :key="i+'1'">
                    <i class="el-icon-s-marketing d-b-img"></i>
                    <span class="d-b-txt">默认布局</span>
                  </div>
                </el-collapse-item>
                <el-collapse-item title="请选择模板" name="2">
                  <div class="drag-box" v-for="i in 2" :key="i+'2'">
                    <i class="el-icon-s-marketing d-b-img"></i>
                    <span class="d-b-txt">首页模板</span>
                  </div>
                </el-collapse-item>
                <el-collapse-item title="请选择主题色" name="3">
                  <div class="color-temp">颜色模板一</div>
                  <div class="color-temp">颜色模板二</div>
                  <div class="color-temp">颜色模板二</div>
                </el-collapse-item>
              </el-collapse><!--主题风格 end-->
              <div class="step-three">
                <h1 class="step-num">
                  <span class="num">2</span><span class="txt">应用选择</span>
                  <el-dropdown trigger="click" class="r-select">
                    <span class="el-dropdown-link">常用服务<i class="el-icon-arrow-down el-icon--right"></i></span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>常用服务</el-dropdown-item>
                      <el-dropdown-item>其他</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </h1>
                <div class="drag-box-warp">
                  <div class="drag-box" v-for="i in 3" :key="i+'3'">
                    <i class="el-icon-s-marketing d-b-img"></i>
                    <span class="d-b-txt">新闻资讯</span>
                  </div>
                </div>
              </div>
              
              <i class="cut-btn" :class="left_fold?'el-icon-arrow-right':'el-icon-arrow-left'" @click="leftFold()"></i>
            </div><!--左边菜单 end-->

            <div class="drag-c" :class="isFoldClass()">
              <div class="screen-btn-drag">
                <el-button size="small" class="default-btn-n-border s-b-active">首屏<span class="s-b-d-close el-icon-error"></span></el-button>
                <el-button size="small" class="default-btn-n-border">第一屏<span class="s-b-d-close el-icon-error"></span></el-button>
                <el-button size="small" class="default-btn-n-border">第二屏<span class="s-b-d-close el-icon-error"></span></el-button>
                <el-button size="small" class="default-btn-n-border s-b-add" icon="el-icon-plus" @click="addScreen()">新增1屏</el-button>
              </div><!--屏幕数量+拖拽 end-->
              <div class="drag-container" ref="dragContainer">
                <div class="drag-content" :style="{'transform':'scale('+ratio_num+')'}">
                  <!--<iframe src="http://lib.cqu.edu.cn/" border="0" width="1198px" height="600px" scrolling="no"></iframe>
                --></div><!--拖拽内容板块 end-->

              </div>
              <scalingPage ref="scalingRef" @getRatio="getRatio"></scalingPage>
            </div><!--中间内容 end-->

            <div class="drag-r">
              <h1 class="step-num"><span class="num">4</span><span class="txt">应用设置：页头主导航</span></h1>
              
              <div class="select-type">
                <h2 class="s-title">选择样式</h2>
                <div class="s-list">
                  <div class="d-temp-box">
                    <span class="temp-name">模板一</span>
                    <el-button type="primary" class="button" size="mini"><i class="n-check"></i> 选用</el-button>
                  </div>
                  <div class="d-temp-box">
                    <span class="temp-name">模板一</span>
                    <el-button type="primary" class="button" size="mini"><i class="el-icon-success"></i> 已选</el-button>
                  </div>
                </div>
              </div><!--选择样式 end-->

              <div class="select-type">
                <h2 class="s-title bor-botm">设置内容</h2>
                <div class="s-choose">
                  <div class="s-c-row">
                    <h2 class="s-title">绑定栏目 <span class="s-edit">编辑</span></h2>
                    <el-select class="w-saml" v-model="postForm.val" size="medium" placeholder="请选择">
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </div>
                  <div class="s-c-row">
                    <h2 class="s-title">显示条数</h2>
                    <el-select class="w-saml" v-model="postForm.val" size="medium" placeholder="请选择">
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </div>
                  <div class="s-c-row">
                    <h2 class="s-title">排序规则</h2>
                    <el-select class="w-saml" v-model="postForm.val" size="medium" placeholder="请选择">
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </div>
                  <button class="s-c-add"><i class="el-icon-plus"></i><span>添加</span></button>
                  <el-button class="default-btn-border btn-block" icon="el-icon-setting" size="medium">保存</el-button>
                </div>
              </div><!--设置内容 end-->

              <i class="cut-btn" :class="right_fold?'el-icon-arrow-left':'el-icon-arrow-right'" @click="rightFold()"></i>
            </div><!--右边菜单 end-->

          </div>
        </div><!---顶部查询板块 end--->
        <!-- <footerPage class="top20"></footerPage> -->
      </el-main>
    </el-container>
  </div>
</template>

<script>
import bus from '@/assets/js/bus';
import http from "@/assets/js/http";
import footerPage from "@/common/footer";
import breadcrumb from "@/components/model/breadcrumb";
import scalingPage from "@/components/model/scaling";
import serviceLMenu_scene from "@/components/model/serviceLMenu_scene";
import leftCheck from "./model/left_check";
export default {
  name: 'index',
  components:{footerPage,serviceLMenu_scene,breadcrumb,scalingPage,leftCheck},
  created(){
    //console.log('参数接收：'+this.$route.query.id);
    this.$root.collapse = true;
    bus.$on('collapse', msg => {
        this.$root.collapse = msg;
    })
  },
  mounted(){
    //   this.initData();
    this.setHeight(document.body.clientHeight-104);
    this.$nextTick(()=>{
        window.addEventListener('resize', () => { //监听浏览器窗口大小改变
          var c_height = document.body.clientHeight-104;
          this.setHeight(c_height);
        });
    })
  },
  data () {
    return {
      drag_height:500,
      ratio_num:1,//缩放比例
      left_fold:false,
      right_fold:false,
      activeCollapse:['1'],//左边折叠的数量
      postForm:{},
      options: [{
        value: '选项1',
        label: '选项1'
      }],
    }
  },

  methods:{
    initData(){
      http.getPlain('AssetNewest','PlateId=109&PageSize=9&PageIndex=1').then(res=>{ //学生专区
          this.list1 = res.result.dtos||[];
      }).catch(err=>{
          console.log(err);
      })
    },
    /****新增一屏 */
    addScreen(){
      console.log('新增一屏');
    },
    /*********高度动态设置 */
    setHeight(val){
      var c_width = this.$refs.dragContainer.clientWidth-60;
      this.$refs.scalingRef.getHeight(c_width);
      if(val<500){
        this.drag_height = 500;
      }else{
        this.drag_height = val;
      }
    },
    getRatio(val){
      console.log('父级获取到的比例为：'+val);
      this.ratio_num = val;
    },
    /****左边-折叠菜单-点击*****/
    collapseClick(val){
      //console.log(val);
    },
    /***左边折叠 */
    leftFold(){
      this.left_fold = !this.left_fold;
    },
    /***右边折叠 */
    rightFold(){
      this.right_fold = !this.right_fold;
    },
    /****两边折叠-中间 */
    isFoldClass(){
      var cls = '';
      if(this.left_fold && this.right_fold){
        cls = 'drag-c-l-tran drag-c-r-tran';
      }else if(this.left_fold){
        cls = 'drag-c-l-tran';
      }else if(this.right_fold){
        cls = 'drag-c-r-tran';
      }
      //console.log(cls);
      return cls;
    },
  },
}
</script>

<style lang="less" scoped>
@import "../../../../assets/css/color.less";/**颜色配置 */
  .content{
    background-color: @fff;
    border-radius: 4px;
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.02);
    height: 100%;
    /*****顶部 */
    .drag-top{
      height:64px;
      background: @fff;
      box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.05);
      z-index: 7;
      position: relative;
      padding: 0 20px;
      .step-num{
        height: 100%;
        line-height: 64px;
      }
      /****顶部设置栏 */
      .search-top{
        margin-left:20px;
        display: inline-block;
        .s-col{
          display: inline-block;
          margin-left: 30px;
          .s-txt{
            color: @34395E;
            font-style: 14px;
          }
          .w-saml{
            width: 136px;
          }
        }
        .default-btn-border{
          height: 36px !important;
          margin-left: 10px
        }
        .s-r-btns{
          position: absolute;
          right: 20px;
          top: 15px;
        }
      }
    }
    
    .drag-content{
      position: relative;
      min-height: 600px;
      background-color: @F1F3F7;
      .drag-l,.drag-c,.drag-r{
        position: absolute;
        bottom: 0;
        top: 0;
        background-color: @fff;
      }
      .drag-l,.drag-r{
        width: 255px;
        padding: 0 20px;
        z-index: 2;
        .cut-btn{
          cursor: pointer;
          display: block;
          top:50%;
          margin-top: -33px;
          position: absolute;
          color: @fff;
          width: 18px;
          height: 65px;
          text-align: center;
          line-height: 65px;
          background: #A5B3CC;
          user-select: none;
          &:hover{
            opacity:.8;
          }
          &:active{
            opacity:1;
          }
        }
      }
      .drag-l{
        left: 0;
        box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.02);
        .cut-btn{
          left: 255px;
          border-radius: 0px 40px 40px 0px;
        }
        .step-num{
          margin-top: 29px;
          margin-bottom: 29px;
        }
        .drag-box{
          cursor: pointer;
          width: 68px;
          height: 60px;
          border-radius: 3px;
          float: left;
          margin-right: 5px;
          margin-top: 5px;
          margin-bottom: 5px;
          background-color: #f9fafc;
          &:nth-child(3n+3){
            margin-right: 0;
          }
          &:hover{
            background-color: @f3f4ff;
            .d-b-txt{
              color: @6777EF;
            }
          }
          i.d-b-img{
            padding: 10px;
            font-size: 20px;
            text-align: center;
            display: block;
            color: @f28102;
          }
          .d-b-txt{
            font-size: 12px;
            color: @34395E;
            text-align: center;
            display: block;
          }
        }
        .step-three{
          height: 70px;
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
          .step-num{
            width: 100%;
          }
        }
      }
      .drag-r{
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
            position: relative;
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
      .drag-c{
        left: 289px;
        right: 289px;
        z-index: 1;
        background-color: @F1F3F7;
        .drag-container{
          width: 100%;
          min-width: 420px;//30%
          background-color: @fff;
          padding: 30px;
          .drag-content{
            width: 1200px;
            transform-origin: 0 0;
            margin-left: auto;
            margin-right: auto;
            border: 1px dashed @BCBCBC;
          }
          img{
            width: 1198px;
            display: block;
          }
        }
        /***************屏幕按钮板块 */
        .screen-btn-drag{
          padding:20px 25px;
          .default-btn-n-border{
            width: 126px;
            background-color: @C5CFE0;
            color: @34395E;
            margin-left:30px;
            position: relative;
            &:first-child{
              margin-left: 0;
            }
            &::after{
              position: absolute;
              content: '';
              display: block;
              left: -5px;
              right: -5px;
              top: -5px;
              bottom: -5px;
              border: 1px dashed @BCBCBC;
            }
            .s-b-d-close{
              position: absolute;
              right: -10px;
              top: -10px;
              display: none;
              z-index: 3;
              font-size: 16px;
              color: @6C757D;
              &:hover{
                opacity: .8;
              }
              &:active{
                opacity: 1;
              }
            }
          }
          /***选中效果 */
          .s-b-active{
            color: @fff;
            background: linear-gradient(353deg, #9985FF 0%, #9985FF 54%, #A18FFF 56%, #A18FFF 100%);
            .s-b-d-close{
              display: block;
            }
          }
          /****新增按钮 */
          .s-b-add{
            background: #E4E6FC;
          }
        }
      }
      .drag-c-l-tran{
        left: 34px;
        transition: left 0.3s ease-in-out;
      }
      .drag-c-r-tran{
        right: 34px;
        transition: right 0.3s ease-in-out;
      }
    }
  }
</style>

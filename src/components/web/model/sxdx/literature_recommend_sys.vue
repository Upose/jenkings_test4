<!--阅读/推荐模板-->
<template>
  <div class="literature_recommend_sys_temp20">
    <div class="literature-r-w-mw">
      <div class="t-title">
        <span class="txt-m tfont-c2">阅读</span>
        <span class="txt-s">推荐</span>
      </div>

      <div class="list-body c-l">
        <div class="colum-w">
          <span class="thover-font-c2 thover-border-c2" v-for="(it,i) in 3" :class="isActive(it,i)">借阅排行</span>
        </div>

        <div class="banner-warp">
          <span class="pre thover-bg-c1"></span>
          <div class="banner-hid">
            <div class="b-w c-l">
             <div class="box thover-font-c5" v-for="i in 7">
              <img src="http://192.168.21.46:6900/public/image/default-cover/default-cover-type1-3.png">
              <div class="txt-w">
                <span class="book-name">《京剧史话》</span>
                <span class="line"></span>
                <span class="dsc">徽剧bai是京剧的前身。清代乾隆五十五年（台清代乾隆五十五年）</span>
              </div>
             </div>
            </div>
          </div>
          <span class="next thover-bg-c1"></span>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  created(){},
  data () {
    return {
      cu_index:0,
    }
  },
  mounted(){
  },
  methods:{
      isActive(it,i){
        var cs = '';
        if(i==0){
          cs = cs+'clear-line ';
        }
        if(i == this.cu_index){
          cs = cs+'active tfont-c2 tborder-c2';
        }
        return cs;
      },
  },
}
</script>

<style lang="less" scoped>
  .literature_recommend_sys_temp20{
    min-width: 1200px;
    padding: 50px 0;
    // 标题
    .literature-r-w-mw{
      max-width: 1200px;
      margin-left: auto;
      margin-right: auto;
      .t-title{
        height: 58px;
        background: url(data:image/png;base64,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) 
        no-repeat bottom;
        font-size: 34px;
        color: #F2321E;
        .txt-m{
          font-weight: bold;
        }
        .txt-s{
          font-family: Arial, sans-serif;
          font-weight: 400;
        }
      }
    }
    //内容
    .list-body{
      padding-top: 40px;
      .colum-w{
        text-align: center;
        span{
          margin: 0 20px;
          cursor: pointer;
          position: relative;
          font-size: 20px;
          line-height: 20px;
          padding-bottom: 10px;
          color: #2C3032;
          transition: all .3s;
          border-bottom: 2px solid rgba(255,255,255,0);
          &:hover{
            color:#02997F;
            border-bottom: 2px solid #02997F;
          }
          &::after{
            content: '';
            position: absolute;
            left:-21px;
            width: 1px;
            height: 12px;
            top:10px;
            border-left: 1px solid #999;
          }
        }
        .active{
          color:#02997F;
          font-weight: bold;
          border-bottom: 2px solid #02997F;
        }
        .clear-line{
          &::after{
            border-left: none;
          }
        }
      }
      //滚动banner图
      .banner-warp{
        margin-top: 30px;
        position: relative;
        .next,.pre{
          cursor: pointer;
          position: absolute;
          top: 100px;
          width:40px;
          height: 40px;
          background: #BEBBBF;
          border-radius: 4px;
          text-align: center;
          transition: all .3s;
        }
        .pre{
          background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAOCAYAAAASVl2WAAAAAXNSR0IArs4c6QAAAMdJREFUKFN10L8qxQEYxvHPO7gCpKTEoAzYZXYPcg2yKMqfkoGBUBSTwUCJwaYYuSBJtkc/nXM6h+Ndn2893/cpfS7JLB5wV7/zJNO4xgCWeoAkU7jEEFbw2gGSTOIUE9jAc1V9/QBJxrGPOezhsao+m6ySjGEHCzjGTVV9tN0aYA3bOMFRVb13izdAI7OFi/+AQaxjEWe47aloSQ5jF/M46JFs9yUZwSFmsImXzptd0CjOW1us4q3f1M3bV2hql/8AXcPd4+kbXVJLaL1WO74AAAAASUVORK5CYII=);
          background-position: center;
          background-repeat: no-repeat;
        }
        .next{
          right: 0;
          background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAOCAYAAAASVl2WAAAAAXNSR0IArs4c6QAAAJ9JREFUKFOV0a9OQgEUB+DvdIPFQjD5NGa1uFkYxfEAFpKZwWawGBjJxEsQeQCiL8HQ9mOX3TlguzhPPd/O30ryhSWeq2rjJCrJPSZY4KWqtoemARd4wAifeD1E1egkl3jCEHOMq+q7ye1Bi64wwCM+8F5VP7+gRb22ym0DMDsCLbrGG27Q/x9I0t0iSfeQZ9f881BJ7jA9d+o1Vl3P2gHpK06BsN694gAAAABJRU5ErkJggg==);
          background-position: center;
          background-repeat: no-repeat;
        }
        .banner-hid{
          width: 1050px;
          margin-left: auto;
          margin-right: auto;
          overflow: hidden;
          .b-w{
            width: auto;
            height: 320px;
            transition: all .3s;
            white-space: nowrap;
            position: relative;
            .box{
              cursor: pointer;
              display: inline-block;
              width: 150px;
              height: 320px;
              margin-right: 30px;
              white-space: pre-wrap;
              word-break: break-all;
              transition: all .3s;
              color: #333;
              &:hover{
                img{
                  box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.15);
                }
                .book-name{
                  font-weight: bold;
                }
                .dsc{
                  color: #000 !important;
                }
              }
              img{
                width: 150px;
                height: 210px;
                transition: all .3s;
              }
              .txt-w{
                margin-top: 10px;
                .book-name{
                  display: block;
                  white-space: nowrap;
                  overflow: hidden;
                  transition: all .3s;
                  text-overflow: ellipsis;
                }
                .line{
                  width: 10px;
                  height: 1px;
                  background:#666;
                  display: block;
                  margin-top: -8px;
                  margin-bottom: -8px;
                }
                .dsc{
                  transition: all .3s;
                  color: #666;
                  overflow: hidden;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;
                }
              }
            }
          }
        }
        
      }
    }
  }
</style>

<!--资源导航，常用数据库模板-->
<template>
  <div class="database_nav_sys_temp3">
    <div class="db-w-mw">
      <div class="t-title">
        <span class="txt-m">资源</span>
        <span class="txt-s">导航</span>
      </div>
      <div class="list-body">
        <div class="list-content c-l">
          <div class="left">
            <div class="list-t">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAfFJREFUSEvFlz1v02AUhc9xYtShAyNj+BcsDPyDtkRFgvKpShSqSmVA6lK3STfmigJCpIKiiI+qjIz5Cf0HvUOHDh0YmOLYt3Ljj+sioRRj28vr17Lv43N93mObqGljTVzUCN72HlaiWvEbK939hEVuewoSUEWpIyC63LmegV97Op5EXY93y5mLPrfgnQhcAEoeqvIFMDJPrHmNCPvZgXMriT4zYOdNonis17ptkjnAgS51buV8srPZchge2esVFF2y4LcZuFyTUcKnFvwuBhfo9kSWcCjhogW/3+iVqzStfhoudl6mrq4I+geGzgfvqAo4gePgSfdmqrjRq8pckOBxNwuQxm5h8C9AD/Nd4xSAGxc6KcEjA25+9KKwTCMkMffEI3Uwur+VX8e9zVazka3jOA8leGDBn9bj5Erub5LYyGJGCSGxixCAA5yP5FWoro4rjutF5wULFrwXtbqQ5rT43+qQFP+eBX9OFJcLJyH+XQNGf61VxXJCEI6w8Oq4/gBxv0StrmKj+HdMq92vVYEh/vxWFiDut2JggidK/Wl7RsW0Au3cMUKGbQO+8r0YWIGB384HyFR/rRW6bv4dEIFvW/B+DP739/EJgJxiANMg2hc+4WQ4Z8EHxRRfwpYynLXgHxWCZwz4Enf8X0+t7RfmDBiF+x9slEyTAAAAAElFTkSuQmCC" alt="" srcset="">
              <span>常用数据库<span class="hit">（校外数据库访问统一登录平台）</span></span>
              <i class="line lef5"></i>
              <a class="more">更多&gt;</a>
            </div>
            <div class="list-ul">
              <a class="row" v-for="i in 16">清华同方CNKI系列数据库</a>
            </div>
          </div><!--常用数据库 end-->
          <div class="center">
            <div class="list-t">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAABAhJREFUSEvFl89rFGcYx7/PO7trkBy9CPXQg/TgRY+Fijm00EKpWxK2SrbJTquSoEI99FIy62wmSo8Fm8bfO7pNY2J09Vaw0EsL9pY/IFChAQsGeilFd+Z9n/Luzrjzc9d48b0sO+/OfN7vZ57nnVnCGxr0hrgYDl60asSimVwgAy7ONMzXXfgrgQFxBKcjkEv2GARPx47tcAWEH+rTmeew+B2n7U0sWjUIcQSzEfCSPQbwdOzYTsG0VGeAHgN4/vJc4oPMfA6zjoslq0agSwBtR649QsDPKrqYnYLF5TorFm9j1n4SnkuXz//KrG6FYEHUZCBREOSqmYiFRXsULA/gjPPHq6yBxJU6K8Xvoai2XoKVcYclX9Fg46pVY6ZUcYHIVR6dBdRRgCYI+BCM57xNe2HbfXs5qyBxtc7dKGGk4FMxmzgVgImayXmW+BuKRgE8ZqhV/Gc8oN18jQW7mJl/OCw1iev6HqcHKTalBt/IScy0wRL/8kzjcPds2y6IveyA8ZaaaXw+HHyjzhmBtQJTftkDA/17HBHTgk8fKeKvBNMYg8sE7AGwrZ4KrdsfBCfjZnZicASsVScHkcs+fDCfSE4pqA9wauGXweBmDlgnNh3XaPYSZ9wMV3q0LEg9StcIXVcnGicHg90BiUNwVmKQK5/QSbFPPQWwJ7oFstb912DdZNzKAevi0uDbVg057SSnGqa4ef4aIa1bat1f5Oumwu1sMGvVUz0wZahmnXiqYRrNuTJItDNuxfey1jibp5sKLUtvmalGZl1cIbirOt7oTOzKqmOiaY8YhnoGhu7p/iBsyan5ffngHzVYjxDe+8YEU046rrGsH4topuYhXFntbZlGy2oRUzUFYXnYn77wW+Y+UVi2GEQAR4MTuolDcHfnSs27ctIJwHNlImqnzeE7v+qcywQXV8LEATsoT6V6iYsrup104vg8ANc73gNr3YVdWjfHdYO2/Mls3VS80wfHVsYwveMBmHrgxHC9YwEYQGHFukvARFdMKFCHkOpdr3pBP3bjJVBczQGrALym2ykDTHC9Sh9c+smqskArCWASC/5nDSsNXssBA6ZXcdyiBgeqU4kjYKzZo0WWzwCMxKPRpleZ358G3x2gOgRnqdaJJ/qJ9YVLa1abCeWM6j7kVS5uRI9TaT0bzFq1Bt8L2yl+Of2WmQKvW7qlUrpBWOiMOzHdVLqXA9aqxwNwjurOeDyx1l0qyH/AKCRSb3bGnZhuKt3PAeuq1uB2dmIQ3M6nCTCAXe25Rwx6vwemDZBap46/+qLy7WZc9QPrz6wGB/jrTnlhvQvOS5wFvj/3sTTwjvHCf5iExcDZ0P7RYvubgyTE0dTvSGx0Phn+bpV3/eH/JIat7DXn/wdkRRQ9HCNu+wAAAABJRU5ErkJggg==" alt="" srcset="">
              <span>最新资源</span>
              <i class="line"></i>
              <a class="more">更多&gt;</a>
            </div>
            <div class="list-ul">
              <a class="row" v-for="i in 7">
                <span class="type">试用</span>
                <span class="title">清华同方CNKI系列数据库</span>
                <span class="date">2022-08-23</span>
              </a>
            </div>
          </div><!--最新资源 end-->
          <div class="right">
            <div class="list-ul">
              <a class="box" v-for="i in 6" :class="true?'bg'+i:''">
                <img class="icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAQxJREFUSEvtl8FKxDAURU8gAe2iC7GgMjDVb9CluvZbBF278xfml/wCV7MRJJuqULuTOiSFSKEjwzAUCkmYRbILhHv67rt5oQLAOXcKnAFZvw+4WuBDCPEpnHM98AIQAYH/0l3XOSnluzDGXCqlDmNA1wxr7W9f8XVM6JqVwNFcH7P6xdNX3OzS8QV+A34GwBEw34AFBT8ArwPsDniKBR7ryuSKF556/Di1xyeewF9TwSnVY84/A8vhwC1wn1K9bddevk4p1WOpTrN6053Js9rTqN4ts5fXKWzFxpgrpdRBUMqWuLV2JZqmmeV5fi6ljMV2VVXp/n9JaK3LoiiOsywLWnnbtqu6rr/LstR/9xeZtGQ91BIAAAAASUVORK5CYII=">
                <span>数据库</span>
                <img class="r-btn" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAHCAYAAAAf6f3xAAAAAXNSR0IArs4c6QAAAKNJREFUOE+90TFqgkEQgNE3UQKJoHgESWdtkzPYBQ9h75nsvEJqCyEHSEobC22iKAg6YQvhJ5BUm0y9fG+HCZUmM+8xwQFL7CLi+lM+Krkys7QKPsIQb/jAPiLyu1MNvoUzs41HjHHBCpuIODXx6nCJN7bvYopXvOMzIs7lzZ/Aje3v8IABXrDAGsfIzE6tO//SKR/o4RlPmBd49g/wjWihj+0X/dwqkuHAylQAAAAASUVORK5CYII=">
              </a>
            </div>
          </div><!--数据库导航 end-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() { },
  data() {
    return {

    }
  },
  mounted() {
  },
  methods: {

  },
}
</script>

<style lang="less" scoped>
.database_nav_sys_temp3 {
  background: rgb(0, 110, 50);
  min-width: 1200px;
  padding: 50px 0;
  // 标题
  .db-w-mw {
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    .t-title {
      height: 58px;
      background: url(data:image/png;base64,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)
        no-repeat bottom;
      font-size: 34px;
      color: #fff;
      .txt-m {
        font-weight: bold;
      }
      .txt-s {
        font-family: Arial, sans-serif;
        font-weight: 400;
      }
    }
  }
  //内容
  .list-body {
    margin-top: 40px;
    background: rgba(255,255,255,0.4);
    padding: 10px;
    .list-content {
      background: #fff;
      .left,
      .center,
      .right {
        float: left;
        min-height: 465px;
        padding: 20px;
        padding-top: 40px;
      }
      .left {
        width: 40%;
      }
      .center {
        width: 40%;
      }
      .right {
        width: 20%;
      }
      .left,.center{
        //标题
        .list-t {
          display: flex;
          align-items: center;
          span {
            font-size: 24px;
            font-weight: bold;
            color: #000;
            margin-left: 10px;
            .hit{
              font-size: 14px;
              font-weight: 400;
              line-height: 24px;
              margin-left: -1px;
            }
          }
          i {
            display: block;
            height: 12px;
            width: 1px;
            background: #999;
            margin-right: 10px;
            margin-left: 40px;
          }
          .lef5{
            margin-left: 5px;
          }
          a {
            font-size: 12px;
            font-weight: 400;
            color: #666;
            transition: all 0.3s;
            &:hover {
              color: #000;
              margin-left: 5px;
            }
          }
        }
      }
      .left{
        .list-ul{
          .row{
            width: calc(50% - 10px);
            float: left;
            display: block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            border-bottom: 1px dashed #ccc;
            position: relative;
            padding-left: 20px;
            line-height: 45px;
            color: #2B3436;
            font-size: 14px;
            transition: all .3s;
            &:hover{
              padding-left: 25px;
            }
            &::after{
              position: absolute;
              content: '';
              width: 5px;
              height: 5px;
              left:3px;
              top:20px;
              border-radius: 1px;
              transform:rotate(45deg);
              background: #707070;
            }
            &:nth-child(even){
              margin-left: 20px;
            }
          }
        }
      }
      .center{
        .list-ul{
          .row{
            padding-left: 60px;
            font-size: 14px;
            line-height: 52px;
            display: block;
            border-bottom: 1px dashed #ccc;
            position: relative;
            &:hover{
              .title{
                margin-left: 5px;
              }
            }
            .type,.date{
              position: absolute;
            }
            .type{
              top: 16px;
              left: 0;
              width: 50px;
              height: 20px;
              line-height: 20px;
              color: #fff;
              text-align: center;
              border-radius: 2px;
              background: #EB5255;
            }
            .date{
              top: 0;
              right: 0;
              font-size: 12px;
              font-weight: 400;
              color: #313B3D;
            }
            .title{
              color: #2B3436;
              display: block;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              max-width: 260px;
              transition: all .3s;
            }
          }
        }
      }
      .center,
      .right {
        padding-left:26px;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAGrCAYAAAD5BQZCAAAAAXNSR0IArs4c6QAAAk5JREFUeF7tnIlygzAMREnb///X3kd6zdJssghfEFLaZJlhcMgbyZLtyAYrm67x2DRyXQsI5isH6n2UP1Mg7+HK8kcOJMTv3yOogJbfUuDVTiWvcEwPxooriDKOlwjiCwWvd+CTgihHaTfwYdd1SZBSIQ0nwEeVGFXiMyTieIggpeEKaQTvcyDVErwrgYBodRKkNF5RxyYQWm9TqqNEg33Dx15DN9k9dk8/RPV0p3CncKfoPeCh4KHgoeChcFgCeCblqYKjgqOCo4KjgqPCz5MFLyC9Vtg/I/UEyRMkT5A8QXJU8ATJEyRPkA7TQ0cFRwVHBUcFRwVHBUcFb2DxvhRvvPA7du4t9HMzPzfzCskrJK+QvELyCun/rpCa97AbLP7YL+cevqJGdK1mFzB9YhmwWXUTqO/ai8b8dTBuGsgaY5D5M9WMnF8E0Vw6WeeYGdXxtKCOmaLqswRH+VxMJUPL6LhZCWSnGOScpep4OaC2CtMGB7l7dA9BXtGEK4BsmarqKqgGwchkp9AnIFX3qMSie1TqSmDWPfx9ZB0ngTBmlCKakpgF1Yd0eFLiJDC2TFZibJkqyDo+xwxaHTeUCqsvB9Q84oHVmv2pbkL5ODA6PZsE3QRGiE08SqueBap7ihIng7D6VfsjbqgUjmncWx5MGhPV7+u4SwPv68eT9ePg6uu4CEgNVYlVUA1C1QbZ+2rMaUDVUFSt/WCb86NKgzHzwdjVqHEkkWDVPQoWjTlrkL1/8G8SdG6MPYCPB9WfRYmzQPxJxOA/NHJ9cxr4DZuvtDXwkeOFAAAAAElFTkSuQmCC)
          no-repeat left center;
      }
      .right{
        .list-ul{
            margin-top: 40px;
            a.box{
              color: #fff;
              display: block;
              font-size: 16px;
              font-weight: 400;
              width: 194px;
              height: 50px;
              margin-bottom: 10px;
              border-radius: 3px 3px 3px 3px;
              padding:10px;
              display: flex;
              align-items: center;
              position: relative;
              &:hover{
                opacity: .9;
                img.r-btn{
                  right: 10px;
                }
              }
              img.icon{
                width: 30px;
                height: 30px;
                border-radius: 4px;
              }
              img.r-btn{
                position: absolute;
                right: 15px;
                transition: all .3s;
              }
              span{
                margin-left: 15px;
                display: inline-block;
                max-width: 80px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
            .bg1{
              background: #6581FF;
            }
            .bg2{
              background: linear-gradient(180deg, #01947F 0%, #07B17D 100%);
            }
            .bg3{
              background: #F75E56;
            }
            .bg4{
              background: #41B3E5;
            }
            .bg5{
              background: #F9981F;
            }
            .bg6{
              background: #6581FF;
            }
          }
      }
    }
  }
}
</style>

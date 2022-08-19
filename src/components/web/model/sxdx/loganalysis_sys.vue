<!--底部统计图模板-->
<template>
  <div class="loganalysis_sys_temp3-warp">
    <div class="c-content c-l">
      <div class="left">
        <div class="row">
          <div class="box">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAArCAYAAADhXXHAAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQ0NjVDQzIyMUVBNjExRUQ4MjM5Q0VBODE5RjEzRjNGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQ0NjVDQzIzMUVBNjExRUQ4MjM5Q0VBODE5RjEzRjNGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDQ2NUNDMjAxRUE2MTFFRDgyMzlDRUE4MTlGMTNGM0YiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDQ2NUNDMjExRUE2MTFFRDgyMzlDRUE4MTlGMTNGM0YiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5GL7YJAAAKrElEQVR42uxZC2wd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" alt="" srcset="">
            <label class="lab1">
              <span class="t1">本周入馆人数</span>
              <i class="num1">{{cqu_list.weeklyVisitUserCount}}<em>人</em></i>
            </label>
            <label>
              <span class="t1">上周入馆人数</span>
              <i class="num2">{{cqu_list.previousWeeklyVisitUserCount}}<em>人</em></i>
            </label>
          </div>
          <div class="box">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAAXNSR0IArs4c6QAABXJJREFUWEftmW+IFHUYx7/f386aipCBwQVCBgoivjAwUDAwMFAquqDIoOAk0btZIiND7M7dmbtTLjJUuJ3b8oUXGPbCMEjQqEjIyCioN9kfgu6F0Em+8IXZnbczT/xmZ+9u15md3+yd9CJ/sNwy+/z5/J55nt+f54h5Hk6XLJXFcg7ASiG395f5xXy64Hwa07YOdFe3q5w6Fdk965bVU/PpY/6B7WqXojoRQV5wy+qxu8DzGYED/2WE9+2Sexf9hr+dC6yaTmquwLponVFeT/KXmMNFW54n5SSAcT/glsER/moC3S6wY8sSgZwBsQUiJ10v91Kcv0TgUkFOANIVKgnGfeFmE+h2gCPYcyA2RZBVt6zymYB7e25tsJT1GYAlEfS1QLFzYJhft4p0VuAYWEA45HrcnwlYC/faU5ss5vQmUIe+EShubQXd1119MpdTn9QmyZOux9hXq3+OhQWPumW+ljmH6wpZoZ3NYgVr0Eti9aQ/sX+osmgsznk7sNqO0cYRC01uGSjzW5NCbJZpF9YYOCE9Lrme2tgOcNGWV0k5OqPbOg1m+zCKcGx6CEddjzvaAW7I85ScbbafCVgrl3bKct/y11m/5M5n2VCaHetVCKR10MtfzDLpzMBZjN8J2bvAdyKqbRfdnYYxsf//SonegjyogA4CHRB0IPwerBCosWoelUPHeNUkasWCPE2RwwCsVvICDsVGOATxsZwWOhBgWR0EYAgVfhj+TR6C8clgcmPS1jxbsVQIvgOw3mBy4w3ARVteJmQIDCHnPoQV12NPmqGiLb2kDKbJQViZBi72yBNUcjZVabaAYEIf8EGMARwPv4usANEZiRlfQp1dsgwqOhXGQShMOB5nIlwqyHFAdkayN/ShHcQVCK9oENEf8a+KyBVLWeEzx+ONZttFW3aTUgmfCz52PfVMpiCkCE9HuGTLCCjdkaNrAg6qm3jXGaWOovEo2lIixanZMUsJY+Ozj5fREfKrBmXRkWWfuoz3Tc8Ns69WInT6PbpZgNJkG4ou6tociVaCGV3B74LQ+QdpBkt2oO9mW7VcIMGOAc8aTdPJ8vtty5rTJQuDxdhHyh4ASxsjzmHX4yutHJTs4AcQ67SML/62QS9/Pk5eH+L187g6aGU/+dZs+yMgazldy8eLBLalOSjZwZ/1NXpKqg8f8hb82AzQu/vWeitnfRmaVezqH+ZHplGOBS71+EegqCMcDZ6mYEcarBYuFQKZ1hI+oJeiZphiQfaF631tVMMupyH0bcCxsD/hBZOic7plheTkjzqgW1bxAdkpy3GP6N2tvlsaQ08b1LddWRMcB1lrnoSDp9kCtmjL6+oyjtUnE/UyvqmlEMZcTz2U9Kr375pcvSCf12mRCToErsHKKRDPmsLW34QI9/R7PKb1+nqqnTmlzkTAF11PPdoqN9uBZlbYmDcxTuEqnd8Nuxx42i3zubRiygrNUkEGAOkziWz85ID6BtFgixx2h1svgXWfji0dQtHpsTp6dt0tq/viJsuSHfw1czpLztkk2LoDTnGV5PF2vYEowr5+jwfTIpwA/b1bVo8kAf8DYmFYJ8K9/R7faRZMShtAdLcxKhoehcjasF3a5i6ne8PVxdUN1k3rUlKPmCVbToBRW7UGPV1EaQXpr/FfnP5/hj5qEroRHU7AD/zHB0fyn5tG2FSOtT4XzoFhtGoFHkGnFWT0+88gVjY75BTvd97jNVMQU7nashYPvZeQDWlLXV/31OZcLqf7yDP3MeFh1+MbphBZ5GY2jhjoRkPJBflm9+TavLVgNwRLAt//dKBifZgFIotsw9YZF+masdY7XhaHc5W9/XipI00cgUgniAkRVtRlvGVylpgrjIn+v59G0eeCmFFrAAAAAElFTkSuQmCC" alt="" srcset="">
            <label class="lab1">
              <span class="t1">本周访问量</span>
              <i class="num3">{{cqu_list.weeklyVisitCount}}<em>次</em></i>
            </label>
            <label>
              <span class="t1">上周访问量</span>
              <i class="num4">{{cqu_list.previousWeeklyVisitCount}}<em>次</em></i>
            </label>
          </div>
        </div>
        <div class="row two">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAA45JREFUWEe1mE9PE0EYh3/vdmt6gKghRQomHOTgTT4ACVQwcGhiE2vsgUDBxC/h0W/hQZB4wFhjTThUpRYTvOsdDyZiBCRq7IHY7b5mt9112+6fmdm6tzbb2WffmfeZ35QwgGv07fq1BHOBQEVrOAZvt4jKx9cffYw7PKkO0AM1FTDOQVxYKUBBqKB3VoKNBJSAOmOgatERsAQgFTI7wrC+gNJQzM+NRKNykn3WsKDS9dtDemsoD6JbcWFdwLhQQdWKC0uZ2tqDTvcFLXTr2e3p66mUbIOpwNJ4bZ3DHsSEqkHm2kl285ssUNj96XppTGdtg9her4GXVcH7xCiAaDr4Nj5jUBWMspH4/dJZa7LA7QoO3wShQOAlgIIbifkDE8ruGkxXl6f0ZPLOoGFVoIxm8+nJ0pODjhH66xAXNi6UlyjSgw4sgGUCXQ1fBtgBSBedPm+lgsaNBPT+MP26NK0nLLfZe25Y1/c/r7OmRKCkKhjoNxFYRaguwEzt7qTzxZmZ+PnjxsNf0t3phWVuWN0nWynnmRff3Duf0loXnM9dHmTAIOY9E1RpklE5nd86lIVVuX+ktjJxjjUrruWYaI4A3QXM1NZfBO2XzLwPcPkPmeVBwzpQABWIaMbnxezdy24SoS2os55aMLeP5x9/UqnUaG31SgJaMcS1fVtqXxdLwRLtRKXmTgjJyUAJd7EQLNCX7QSSkXD4EPagKGzn7f0cKQwlXMFAB4oHUiWo2IBdu0s/LAaRHb0e3HA+mOAGt8zKUZLeI7t5Jtup1jKwfqMUx+qlVMagWdaQ00D2ONblG1gZaABcIRPlrzq/UoEVerl6KTVu0CJrKACUJ8AFcwGjopUDC6ZqnLDqPPBfFLMDqy8UPHt4VxdHwQJqyVooHwYEi0DNiMCCsQ/QNsGoHC5snXqndWJ3ZYSh5wEugjDjG+8F0o6QB6NgnZBhwbYhudi76bvwAlCxNBMF69scklCxALscGHbQigHVBTi2u7bqfMGm+eUo+fkdsnuGkCY8N3nOLlANq6jP6Zeak7OkaZcDPcjAd4Cr/92BDoHHhQTkAHLTtC3qsIO7V9hNvVFT2iF8psLWjjG8CI3zUS6UOLirObBf0CH/KvisW1/NRHdqG5YYO34OdKA8LsyDsKDiwkgPRh3cvQ60YG0LdgQ9CBdGAnZpReQsHNT+itqRApSGVYQamKjdBhjgwb13Av4Cs+IWTL3ygpMAAAAASUVORK5CYII=" alt="" srcset="">
          <div class="box1">
            <span class="t2">本周新增资源</span>
            <i class="num5">{{cqu_list.weeklyResourceIncreaseCount}}<em>条</em></i>
          </div>
          <div class="box2">
            <span class="t2">总量</span>
            <i class="num6">{{cqu_list.totalResourceCount}}</i>
          </div>
        </div>
      </div>

      <div class="center">
        <span class="echars-title">总资源学科分布</span>
        <div id="cquIndexCollgeRank" style="width:100%;height:100%"></div>
      </div>

      <div class="right">
        <span class="echars-title">学院访问排行</span>
        <div id="pie_echars" style="width:100%;height:100%"></div>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  created() { },
  data() {
    return {
      post_url_vip: window.apiDomainAndPort,
      request_of: true,//请求中
      cqu_list: [],
    }
  },
  mounted() {
    this.cqu_initData();
  },
  methods: {
    cqu_setNumber(val) {
      //数字千分位逗号分割
      let number = (val.toString().indexOf('.') !== -1) ? val.toLocaleString() : val.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
      return number;
    },
    cqu_initData() {
      var post_url = this.post_url_vip + '/loganalysis/api/log-analysis/index-statistics';
      axios({
        url: post_url,
        method: 'GET',
        headers: {
          'Content-Type': 'text/plain',
          'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
        },
      }).then(res => {
        if (res.data && res.data.statusCode == 200) {
          let data = res.data.data;
          let datalist = [
            'weeklyVisitUserCount',
            'previousWeeklyVisitUserCount',
            'weeklyVisitCount',
            'previousWeeklyVisitCount',
            'weeklyResourceIncreaseCount',
            'totalResourceCount'
          ]
          datalist.forEach(item => {
            data[item] = this.cqu_setNumber(data[item]);
          })

          this.cqu_list = data || {};
          this.cqu_drawColumnChart();
          this.cqu_pie();
        }
        this.request_of = false;
      }).catch(err => {
        this.request_of = false;
        console.log(err);
      });
    },
    // 学院访问排行echars
    cqu_drawColumnChart() {
      let chartDom = document.getElementById('cquIndexCollgeRank');
      let myChart = echarts.init(chartDom);
      let list = []

      for (let index = this.cqu_list.resourceDomainRank.length - 1; index >= 0; index--) {
        const element = this.cqu_list.resourceDomainRank[index];
        let curlist = [];
        curlist.push(element.name);
        curlist.push(element.value);
        list.push(curlist);
      }
      // console.log(list);
      let option = {
        // color:['#fd7f55','#fac858','#91cc75','#738edc'],
        dataset: [{
          source: [
            ['name', 'value'],
            ...list
          ]
        },
        {
          transform: {
            type: 'sort',
            config: { dimension: 'value', order: 'asc' }
          }
        }],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: { type: 'value' },
        yAxis: { type: 'category' },
        grid: {
          x: '140px',
          y: 0,
          x2: '50px',
          y2: '60px'
        },
        series: [
          {
            type: 'bar',
            encode: {
              // Map the "amount" column to X axis.
              x: 'value',
              // Map the "product" column to Y axis
              y: 'name'
            },
            itemStyle: {
              normal: {
                //这里是重点
                color: function (params) {
                  //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                  var colorList = ['#738edc', '#738edc', '#91cc75', '#fac858', '#fd7f55','#738edc', '#738edc', '#91cc75', '#fac858', '#fd7f55','#738edc', '#738edc', '#91cc75', '#fac858', '#fd7f55',];
                  return colorList[params.dataIndex]
                }
              }
            }
          }
        ],
        axisLabel: {
          // color: '#fff',
          // fontSize: 16,
          formatter: function (value, index) {
            var value;
            if (value >= 10000) {
              value = value / 10000 + 'w';
            } else if (value < 10000) {
              value = value;
            }
            return value
          }
        },
      };

      option && myChart.setOption(option);
    },
    //学院访问排行饼图
    cqu_pie(data){
      let chartDom = document.getElementById('pie_echars');
      let myChart = echarts.init(chartDom);
      let option = {
        legend: {
            top: 'bottom',
            show:false,
          },
          tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          series: [
            {
              name: '当前数据：',
              type: 'pie',
              radius: [10, 70],
              center: ['50%', '50%'],
              roseType: 'area',
              itemStyle: {
                borderRadius: 8,
                normal: {
                  // color: 各异,
                  borderWidth: 1,
                  label: {
                      show: true,//数据标签显示
                      position: 'outer',
                      textStyle://数据标签的字体配置，与其他组件相同
                      {
                          fontSize: 8,//字号
                          fontWeight: 'normal',//粗细【normal\bold\bolder\lighter】
                          fontFamily: 'Microsoft YaHei',//字体【 'serif'\'monospace'\'Arial'\'Courier New'\'Microsoft YaHei'】
                          color: ''//颜色各异
                      },
                      formatter: '{b}'//a:系列名，就是你上面写的name半径模型，b：数据名，就是rose1，c：数据值，d百分比
                  },
                  labelLine: {
                      show: true,//数据标签引导线
                      length: 1,
                      lineStyle: {
                          width: 1,
                          type: 'solid'
                      }
                  }
                },
              },
              data:this.cqu_list.departmentRankList||[],
            }
          ]
      }
      option && myChart.setOption(option);
    },
  },
}
</script>

<style lang="less" scoped>
.loganalysis_sys_temp3-warp {
  width: 100%;
  min-height: 256px;
  padding: 38px 0;
  .c-content {
    width: 1200px;
    height: 256px;
    margin-left: auto;
    margin-right: auto;
    background: #ffffff;
    box-shadow: 0px 2px 10px 1px rgba(0, 0, 0, 0.1);
    border-radius: 3px 3px 3px 3px;
    border: 1px solid #ffffff;
    padding: 18px 20px;
  }
  .left,
  .center,
  .right {
    float: left;
    height: 100%;
  }
  .left {
    width: 44%;
    padding-right: 15px;
    .row {
      height: 50%;
      display: flex;
      align-items: center;
      .box {
        width: 50%;
        float: left;
        display: flex;
        flex-direction: row;
        label {
          display: inline-block;
          span,
          i {
            display: block;
          }
        }
        .lab1 {
          margin-right: 15px;
        }
      }
      img {
        flex-shrink: 0;
        margin-right: 12px;
      }
      &:first-child {
        border-bottom: 1px solid #d2d2d2;
      }
      .num1,
      .num2 {
        color: #fd7f55;
      }
      .num3,
      .num4 {
        color: #7f6bfe;
      }
      .num5,
      .num6 {
        color: #1abd62;
      }
      .num1,
      .num2,
      .num3,
      .num4 {
        font-size: 21px;
        font-weight: bold;
      }
      .num5 {
        font-size: 21px;
        font-weight: bold;
      }
      .num6 {
        font-size: 16px;
        font-weight: 500;
      }
      .t1 {
        font-size: 12px;
        font-weight: 400;
        color: #3c4b5d;
        line-height: 17px;
      }
      .t2 {
        font-size: 16px;
        font-weight: 500;
        color: #3c4b5d;
        line-height: 20px;
        padding-right: 10px;
      }
      em {
        font-size: 12px;
        font-style: inherit;
      }
    }
    .two {
      div {
        display: flex;
        align-items: center;
      }
      div.box1 {
        width: 250px;
      }
      div.box2 {
        width: 200px;
      }
    }
  }
  .center,.right{
    .echars-title{
      font-size: 14px;
      font-weight: 400;
      color: #3C4B5D;
      line-height: 20px;
    }
  }
  .center {
    width: 34%;
    border-left: 1px solid #d2d2d2;
    border-right: 1px solid #d2d2d2;
    .echars-title{
      padding-left: 17px;
    }
  }
  .right {
    width: 22%;
    .echars-title{
      padding-left: 35px;
    }
  }
}
</style>

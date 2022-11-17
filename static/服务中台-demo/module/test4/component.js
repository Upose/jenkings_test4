function test4() {
  var template_html = `<div class="test4-warp height-Pull">
  <img class="bg-test4-warp" src="data:image/png;base64,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" alt="">
  <div class="dlib3-box-warp-clear pd-lr tbg-rad-c4">
    <div class="dlib3-box-title dlib3-cloum-center">
      <label class="title dlib3-color1 dlib3-l-font dlib3-cloum-center">
        <img class="icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAAXNSR0IArs4c6QAAAbVJREFUOE/FlDFIllEUhp8XGhwahWzTraEg0SGpwUapoajFycEhIwe3EARrcxOHhoiorTGhoMRBRSFHByE3HYKCaGsU3jg/98rt4/p/3xId+Kd77vO9/3vec0WHsn0BeAK8lvS77YraGuLc9jBwDNyWtN12599DbT8CxoHHkk6zon5KbS8DA5IWc/9fSm3fBd4D68B0Bp8Htb0KLADzkl5Uocm/h8C7Cvge8LH4UAYuSForfa56ajvAb4AJSYfNwdgeAH4CS01g9HYaVNu0m+f/B2r7EjAEfJP0q1Rl+yLwoKF0o6c0bcxsilMA4jcIROhzxSZdk3RSRC3S8qEBncvQGeBtB++6b5TtSWATiB3vV6OSDto+fjYo29eBV8mC8+5dlvQjWXYH2Kk9MCX0JvAZCPOrJSnbFT3fgVA91QTnplYgcCJppBjSLeBTDSzbV4Ev/RQm0L6kiUakMjjWd/ps920/BVYq/zcidFR4vC7pfmVl41UblBTW9SqURh53gSuNTE4BMZSvKRXPJD1vm3wPmiYZYd9K4FAY5u+lsxvAGPCyfGP7wcvph+JYgo3ay9RFYe75A/FgsI+c47w6AAAAAElFTkSuQmCC">
        <span>热门应用</span>
      </label>
      <a class="dlib3-more"><span>更多</span></a>
    </div>
    <!--标题 end-->
    <div class="dlib3-list-warp c-l">
        <div class="row" v-for="(item,index) in 4" :key="index">
          <div class="app-warp dlib3-flex-center dlib3-color1 dlib3-hover-top">
            <div class="logo-bg"><img class="icon" src="http://192.168.21.46:6900/app_icons/icon-scorecenter.svg"></div>
            <span class="title toverflow-row1-hide dlib3-s-font">應用名稱</span>
            <span class="type" :class="btnTypeColor(item.showType)">收藏</span>
          </div>
        </div>
    </div>
  </div>
</div>`;


  var list = document.getElementsByClassName('test4');
  for (var i = 0; i < list.length; i++) {
    if (list[i].getAttribute('class').indexOf('jl_vip_zt_vray') < 0) {
      list[i].setAttribute('class', 'test4 jl_vip_zt_vray jl_vip_zt_warp');
      var template_temp_set_list = null;
      if (list[i].dataset && list[i].dataset.set) {
        template_temp_set_list = JSON.parse(list[i].dataset.set.replace(/'/g, '"'));
      }

      new Vue({
        el: '#' + list[i].lastChild.id,
        template: template_html,
        data() {
          return {
            fileUrl: window.localStorage.getItem('fileUrl'),//图片地址前缀
            post_url_vip: window.apiDomainAndPort,
            request_of: true,//请求中
            cqu_appList: [],
            cqu_appMoreUrl: ''
          }
        },
        mounted() {
          var template_temp_data_list = [];
          if (template_temp_set_list) {
            for (var i = 0; i < template_temp_set_list.length; i++) {
              var topCount = template_temp_set_list[i].topCount;
              var columnid = template_temp_set_list[i].id;
              var OrderRule = template_temp_set_list[i].sortType;
              template_temp_data_list.push({ count: topCount, columnId: columnid, sortField: OrderRule });
            }
          }
          this.initData(template_temp_data_list);
        },
        methods: {
          btnTypeColor(val){
            var color = 'type-color1';
            if(val == '已收藏'){
              color = 'type-color1';
            }
            if(val == '热门'){
              color = 'type-color2';
            }
            if(val == '常用'){
              color = 'type-color3';
            }
            return color;
          },
          linkTo(url) {
            if (url != '' && url != '#') {
              if (this.isThirdpartyApp(true, url)) {
                location.href = url;
              } else {
                window.open(url);
              }
            }
          },
          apps_linkTo(url) {
            if (url.isAuth) {
              if (this.isThirdpartyApp(true, url.frontUrl)) {
                location.href = url.frontUrl;
              } else {
                window.open(url.frontUrl);
              }
            }
          },
          isThirdpartyApp(is_web, url) {
            var port_url = {};
            var is_open = false;//true 打开新窗口，false不打开新窗口
            var orgInfo = localStorage.getItem('orgInfo');
            if (orgInfo && orgInfo != '' && orgInfo != undefined && orgInfo != 'null' && orgInfo != 'undefined') {
              port_url = JSON.parse(localStorage.getItem('orgInfo')) || {};
              if (is_web) {
                (url.indexOf(port_url.onlinePortalUrl) > -1 || url.indexOf(port_url.portalUrl) > -1) ? is_open = true : is_open = false;
              } else {
                (url.indexOf(port_url.onlineManageUrl) > -1 || url.indexOf(port_url.manageUrl) > -1) ? is_open = true : is_open = false;
              }
            }
            return is_open;
          },
          initData(list) {
            axios({
              url: this.post_url_vip + '/appcenter/api/userapplication/getrecommendappmore',
              method: 'GET',
              headers: {
                'Content-Type': 'text/plain',
                'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
              },
            }).then(res => {
              if (res.data && res.data.statusCode == 200) {
                this.cqu_appMoreUrl = res.data.data.moreUrl;
                this.cqu_appList = res.data.data.recommendApps || [];
              }
              this.request_of = false;
            }).catch(err => {
              this.request_of = false;
              console.log(err);
            });
          },
        },
      });
    }
  }
}
test4()
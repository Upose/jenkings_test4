function test2() {
  var test2_html = `<div class="test2-warp height-Pull">
  <div class="dlib3-box-warp">
    <div class="dlib3-box-title pd dlib3-cloum-center">
      <label class="title dlib3-color2 dlib3-l-font dlib3-cloum-center">
      <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
      <path class="tfill-c2" d="M0,13.843a3.077,3.077,0,0,1,3.074-3.074H6.157a3.077,3.077,0,0,1,3.074,3.074v3.083A3.077,3.077,0,0,1,6.157,20H3.074A3.077,3.077,0,0,1,0,16.926ZM0,3.074A3.077,3.077,0,0,1,3.074,0H6.157A3.077,3.077,0,0,1,9.231,3.074V6.157A3.077,3.077,0,0,1,6.157,9.231H3.074A3.077,3.077,0,0,1,0,6.157ZM13.475.79a2.7,2.7,0,0,1,3.82,0L19.21,2.706a2.7,2.7,0,0,1,0,3.82L17.294,8.441a2.7,2.7,0,0,1-3.82,0L11.559,6.525a2.7,2.7,0,0,1,0-3.82ZM10.769,13.843a3.077,3.077,0,0,1,3.074-3.074h3.083A3.077,3.077,0,0,1,20,13.843v3.083A3.077,3.077,0,0,1,16.926,20H13.843a3.077,3.077,0,0,1-3.074-3.074Z" transform="translate(0 0)" />
    </svg>
        <span>应用导航</span>
      </label>
      <div class="column dlib3-color2 dlib3-s-font dlib3-cloum-center">
        <span class="dlib3-hover-opacity" :class="index==curIndex?'tfont-c2':''"  v-for="(item,index) in (data_list.items||[])" :key="index" @click="curIndex=index">{{item.name||''}}</span>
      </div>
      <a class="dlib3-more"><span>更多</span></a>
    </div>
    <!--标题 end-->
    <div class="pd dlib3-list-warp c-l">
      <div class="row" v-for="(item1,index1) in 12" :key="index1">
        <div class="app-warp dlib3-flex-center dlib3-hover-top" :class="bgvray()">
          <div class="logo-bg"><img class="icon" src="http://192.168.21.46:6900/app_icons/icon-articlesearch.svg"></div>
          <span class="title toverflow-row1-hide dlib3-color1 dlib3-s-font">統一檢索</span>
        </div>
      </div>
    </div>
  </div>
</div>`;


  var list = document.getElementsByClassName('test2');
  for (var i = 0; i < list.length; i++) {
    if (list[i].getAttribute('class').indexOf('jl_vip_zt_vray') < 0) {
      list[i].setAttribute('class', 'test2 jl_vip_zt_vray jl_vip_zt_warp');
      var template_temp_set_list = null;
      if (list[i].dataset && list[i].dataset.set) {
        template_temp_set_list = JSON.parse(list[i].dataset.set.replace(/'/g, '"'));
      }
      new Vue({
        el: '#' + list[i].lastChild.id,
        template: test2_html,
        data() {
          return {
            imgPath: window.localStorage.getItem('fileUrl') + '/public/image/',//公共图片路径
            fileUrl: window.localStorage.getItem('fileUrl'),//图片地址前缀
            post_url_vip: window.apiDomainAndPort,
            request_of: true,//请求中
            data_list: {},
            curIndex: 0
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
            this.initData(template_temp_data_list);
          }

        },
        methods: {
          bgvray() {
            return 'bg' + Math.floor(Math.random() * 5 + 1);
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
            var post_url = this.post_url_vip + '/appcenter/api/sceneuse/getsceneusebyidbatch';
            axios({
              url: post_url,
              method: 'POST',
              data: list,
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
              },
            }).then(res => {
              if (res.data && res.data.statusCode == 200) {
                this.data_list = res.data.data || {};
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
test2()
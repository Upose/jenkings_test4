function test1() {
  var test1_html = `<div class="test1-warp height-Pull">
  <div class="dlib3-box-warp">
    <div class="dlib3-box-title pd dlib3-cloum-center">
      <label class="title dlib3-color2 dlib3-l-font dlib3-cloum-center">
      <svg class="icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="21.333" height="20" viewBox="0 0 21.333 20">
          <defs>
            <clipPath id="test1_warp">
              <rect class="a tfill-c2" width="21.333" height="20" transform="translate(1233 236.007)" />
            </clipPath>
          </defs>
          <g transform="translate(-108.8 -76.8)">
            <g class="b" transform="translate(-1124.2 -159.207)">
              <g transform="translate(1233.43 236.002)">
                <ellipse class="a tfill-c2" cx="10.236" cy="3.071" rx="10.236" ry="3.071" transform="translate(0 0)" />
                <path class="a tfill-c2" d="M94.707,24.211c-.171,0-.337.01-.51.01a22.485,22.485,0,0,1-8.551-1.385c-1.06.483-1.685,1.059-1.685,1.681,0,1.7,4.583,3.071,10.236,3.071a31.965,31.965,0,0,0,3.825-.224A5.26,5.26,0,0,1,94.707,24.211Z" transform="translate(-83.961 -7.618)" />
                <path class="a tfill-c2" d="M103.84,23.673l2.4-1.409,2.4,1.409-2.4-6.2Z" transform="translate(-90.587 -5.83)" />
                <path class="a tfill-c2" d="M102.748,9A22.483,22.483,0,0,1,94.2,10.388,22.485,22.485,0,0,1,85.646,9c-1.06.483-1.685,1.059-1.685,1.681,0,1.7,4.583,3.071,10.236,3.071.713,0,1.409-.022,2.082-.064a5.229,5.229,0,0,1,5.194-.848c1.829-.555,2.961-1.317,2.961-2.159C104.434,10.062,103.808,9.486,102.748,9Z" transform="translate(-83.961 -3.007)" />
                <path class="a tfill-c2" d="M94.2,17.3a22.472,22.472,0,0,1-8.551-1.385c-1.06.483-1.685,1.059-1.685,1.681,0,1.7,4.583,3.071,10.236,3.071l.2,0a5.336,5.336,0,0,1-.039-.614,5.217,5.217,0,0,1,.8-2.769C94.838,17.294,94.522,17.3,94.2,17.3Z" transform="translate(-83.961 -5.312)" />
              </g>
            </g>
          </g>
        </svg>
        <span>数据库</span>
      </label>
      <div class="column dlib3-color2 dlib3-s-font dlib3-cloum-center">
        <span class="dlib3-hover-opacity" :class="i==cuIndex?'tfont-c2':''"  v-for="(item,i) in (data_list||[])" :key="item" @click="menuClick(i)">{{item.columnName||''}}</span>
      </div>
      <a class="dlib3-more"><span>更多</span></a>
    </div>
    <!--标题 end-->
      <div class="pd dlib3-list-warp c-l">
        <div class="row dlib3-cloum-center dlib3-radius dlib3-row-xl dlib3-s-font dlib3-bgcolor1 dlib3-hover-right" v-for="it in 6" :key="it">
          <img class="icon" src="http://192.168.21.46:6900/app_icons/icon-articlecollection.svg">
          <span class="title toverflow-row1-hide dlib3-color">張三</span>
          <span class="r-btn dlib3-color6">></span>
        </div>
      </div>
  </div>
</div>`;


  var list = document.getElementsByClassName('test1');
  for (var i = 0; i < list.length; i++) {
    if (list[i].getAttribute('class').indexOf('jl_vip_zt_vray') < 0) {
      list[i].setAttribute('class', 'test1 jl_vip_zt_vray jl_vip_zt_warp');
      var test1_set_list = JSON.parse(list[i].dataset.set.replace(/'/g, '"'));
      new Vue({
        el: '#' + list[i].lastChild.id,
        template: test1_html,
        data() {
          return {
            request_of: true,//请求中
            data_list: [],
            cu_list: [],
            cuIndex: 0,
            moreUrl: '',
            post_url_vip: window.apiDomainAndPort,
            fileUrl: window.localStorage.getItem('fileUrl'),//图片地址前缀
          }
        },
        mounted() {
          if (test1_set_list) {
            var list = [];
            for (var i = 0; i < test1_set_list.length; i++) {
              var topCount = test1_set_list[i].topCount;
              var columnid = test1_set_list[i].id;
              list.push({ count: topCount, columnid: columnid });
            }
            this.initData(list);
          }
        },
        methods: {
          menuClick(val) {
            this.cuIndex = val;
            this.cu_list = this.data_list[val].list || [];
          },
          openUrl(url) {
            location.href = url;
          },
          initData(list) {
            var post_url = this.post_url_vip + '/databaseguide/api/database-terrace/database-in-portal';
            axios({
              url: post_url,
              method: 'post',
              data: list,
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
              },
            }).then(res => {
              this.request_of = false;
              if (res.data && res.data.statusCode == 200) {
                if (res.data.data && res.data.data.portalColumns.length > 0) {
                  this.moreUrl = res.data.data.moreUrl || '';
                  this.data_list = res.data.data.portalColumns || [];
                  if (this.data_list.length > 0) this.cu_list = this.data_list[0].list || [];
                }
              }
            }).catch(err => {
              this.request_of = false;
              console.log(err);
            });
          },
          openDetails(val) {
            if (val.directUrls && val.directUrls[0]) {
              let url = val.directUrls[0].url;
              url = url.indexOf('http') != -1 ? url : 'https://' + url;
              axios({
                url: this.post_url_vip + '/databaseguide/api/database-terrace/visit-databases?databaseid=' + val.id,
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
                },
              }).then(res => {

              }).catch(err => {
                console.log(err);
              });
              if (this.isThirdpartyApp(true, url)) {
                location.href = url;
              } else {
                window.open(url);
              }
            } else {
              // window.open(val.portalUrl);
            }
          },
          //类型转换
          purchaseTypeTxt(val) {
            switch (val) {
              case 1: return '订购';
              case 2: return '试用';
              case 3: return 'OA免费';
              case 4: return '自建';
              default: return '其他';
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
        },
      });
    }
  }
}
test1()
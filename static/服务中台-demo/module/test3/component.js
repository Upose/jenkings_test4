function test3() {
  var college_library_html = `<div class="test3-warp height-Pull">
  <div class="dlib3-box-warp dlib3-color1">
      <div class="dlib3-box-title pd-tb dlib3-cloum-center">
      <label class="title dlib3-l-font dlib3-cloum-center">
        <img class="icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAYAAAAxrNxjAAAAAXNSR0IArs4c6QAAAHRJREFUKFOFzVENwlAMRuFzHCABFMAUDAk4ABwgBQdsDpDAFCwowAIOSi7p5WFhWZ+a/l9bASLiAGxL/6ee6t2I2AHjDKrjpsA18FqAG/P1CbjN4LPafWHiDjhOcK+WI/xg4gfQJh7UfV2cwhVwzfCiviv8ADELIVJv6jzsAAAAAElFTkSuQmCC" alt="">
        <span>学院图书馆</span>
        <div class="dlib3-bt-line"></div>
      </label>
      </div>

      <div class="dlib3-list-warp">
        <div class="row" v-for="(item, index) in 6" :key="index">
          <div class="border"></div>
          <div class="box" v-for="it in 9" :key="it.categoryId">新聞發佈</div>
        </div>
      </div>
  </div>
</div>`;


  var list = document.getElementsByClassName('test3');
  for (var i = 0; i < list.length; i++) {
    if (list[i].getAttribute('class').indexOf('jl_vip_zt_vray') < 0) {
      list[i].setAttribute('class', 'test3 jl_vip_zt_vray jl_vip_zt_warp');
      new Vue({
        el: '#' + list[i].lastChild.id,
        template: college_library_html,
        data() {
          return {
            request_of:true,//请求中
            data_list: [],
            fileUrl: window.localStorage.getItem('fileUrl'),//图片地址前缀
            post_url_vip: window.apiDomainAndPort,
          }
        },
        mounted() {
          this.initData();
        },
        methods: {
          openurl(url) {
            if(this.isThirdpartyApp(true,url)){
                location.href = url;
            }else{
                window.open(url);
            }
          },
          isThirdpartyApp(is_web,url){
            var port_url = {};
            var is_open = false;//true 打开新窗口，false不打开新窗口
            var orgInfo = localStorage.getItem('orgInfo');
            if(orgInfo && orgInfo!='' && orgInfo!=undefined && orgInfo!='null' && orgInfo !='undefined'){
              port_url = JSON.parse(localStorage.getItem('orgInfo'))||{};
              if(is_web){
                (url.indexOf(port_url.onlinePortalUrl)>-1|| url.indexOf(port_url.portalUrl)>-1) ? is_open = true : is_open = false;
              }else{
                (url.indexOf(port_url.onlineManageUrl)>-1|| url.indexOf(port_url.manageUrl)>-1) ? is_open = true : is_open = false;
              }
            }
            return is_open;
          },
          initData() {
            var post_url = this.post_url_vip + '/departmentlib/api/department-liba/all-department-lib';
            axios({
              url: post_url,
              method: 'GET',
              headers: {
                'Content-Type': 'text/plain',
                'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
              },
            }).then(res => {
              this.request_of = false;
              if (res.data && res.data.statusCode == 200) {
                this.data_list = res.data.data;
              }
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
test3()
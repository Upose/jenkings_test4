<!--检索加信息导航-->
<template>
  <div class="service_sys_temp5-warp">
    <div class="u-r-body-w" @click="menu_show = false">
        <div class="top-menu">
        <div class="menu">
            <div class="box" @click="openSearch()">
            <img class="l-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABHNCSVQICAgIfAhkiAAAAVtJREFUOE+dk41RwzAMRvEEwAZ0gzIB7QTABLQTUCagbMAGpBPABqQTECYgG9BO4H7PJ/XUEEoO3+niH/n5kyKlk87IOd9o6042kZ3JWrMqpbTq+rNOvqnLXHi1y2x/yjZ2fmVfgLeCNRFWIAb4spd5bSlHLpRh5wtNsSybRpBDah3w2lyHVZ9kg431xfdbdinfojRZDghjpc3Zb4CgCp8X2ZP8lw550+RaNoohHIPp4Zaw5D9yCJJabSB10BDkWY73snNCIhwStdZiMoiAhJwJ41FGgmsgKGn+CSG5DRDPSZE2RI3uUCcX8qe2yt/5ke0/kkrY77L93wQCDfKpxXhQjRFovh+okO3/phebFxFJXvT1iAAooD4A1PKZ+gOxdxyEolZGrjxHNKWXwFpzqpuGnJec9Mj1HgHmY2vQ0lNSVWlNpxfQASQCmVsIm9hs7hNAD0chXWjPI6iud6xeoqyrfRH8AAAAAElFTkSuQmCC">
            <span>搜索图书馆资源</span>
            <img v-if="isOpen" class="r-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAALCAYAAAByF90EAAAAAXNSR0IArs4c6QAAAStJREFUOE+N0rFLFnAQxvHPoZkGgU7RP+Hs3GxrIjWlQw2KUEFDRlBDgZLoYCE6GtGYe6NLS2uz0ODgZmXaxclPebX3FW+9e77cPc+FCyozh/AeO3gREQe9xqNXIzMH8QYPkZjH24j4003TFZSZV5vwEX404Q08wVo32H+gzBzAHJ5jD/cbaAPXMYMPEXHYudkZUINM4TV+4QE+N8FtvEMfprHVCTsFZeYV3MFKE87i48kZrT+BZZTp9/AlIo5q/hiUmf0YbwmVyU+xfj6lcxvX2XexHRF/IzNr1VsoD0bwEksR8btbOi2I8rBSrLeYxLcCjWETN7GIVxFR/vSs9hrPUKl+x0SBvmIUq3VSRPy8CHLSa89aodSfbRfoE3bxOCL2LwPpgF3DAob/AdPAapHOMEbpAAAAAElFTkSuQmCC">
            <img v-if="!isOpen" class="r-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAALCAYAAAByF90EAAAABHNCSVQICAgIfAhkiAAAAJJJREFUKFOV0o0RQDAMBeBmA5uwAUYwqRGwAZOwQb1H6+g/dzmKfJKUaK1XpdSOGETkwLn4QG6Fl0dEJVjMuGgRBPtSzCATchrEQogqsboUc5ANeZ2wjz9YEMFILqgUiyHMf6AclkI8KIaZou1g75k4O/ypKNEmH3F3gkiwogjG21EkCTltcum1Yz+ahV6Yyv2oJ3d5YaJffOUHAAAAAElFTkSuQmCC">
            </div>
            <div class="box-menu thover-font-c1" @click.stop="menuClick(i)" v-for="i in 4">
            <span>文献资源</span>
            </div>
        </div>
        <div class="s-menu" v-if="menu_show">
            <a v-for="i in smenu_list" class="thover-font-c5"><span>{{i.title}}</span></a>
        </div>
        </div>
        <div class="content-w c-l" v-if="isOpen">
        <div class="coumn-w">
            <div class="c-box" @click="tabClick(it)" v-for="(it,i) in details.searchBoxTitleItems" :class="cu_colum.id==it.id?'box-active':''">{{it.title}}</div>
        </div>
        <div class="undefind-w">
            <div class="title">{{cu_colum.title||''}}</div>
            <div class="search-input-w">
                <div class="s-input-w">
                <select class="select" v-model="search" v-if="cu_colum.searchBoxFields&&cu_colum.searchBoxFields.length>0">
                    <option v-for="(it,i) in cu_colum.searchBoxFields" :value="it">{{it.displayTitle}}</option>
                </select>
                <input class="input" ref="mainInput" @keyup.enter="searchClick" @blur="inputBlur" @focus="emptySearch" v-model="basicInputKeyWord" type="text"
                :placeholder="details.placeHolderEnabled?(cu_colum.placeholder||details.defaultPlaceHolder):''" 
                :class="(cu_colum.searchBoxFields&&cu_colum.searchBoxFields.length>0)?'pd-l-h':'pd-l-s'"/>
                <div class="s-r-btns">
                    <button class="subject-btn" @click="subjectAlertOpen" v-if="search && search.symbol && (search.symbol == 'CC'||search.symbol == 'LC' || search.symbol == 'C'||search.symbol == 'L')">查看分类表</button>
                    <button class="search-btn" @click="searchClick">弘深检索</button>
                    <!-- <button class="high-btn" @click="highSearch">高级检索</button> -->
                </div>
                </div>
            </div><!--检索输入框-->
            <div class="serve-link">
            <ul class="c-l">
                <li v-for="i in 5">读者手册</li>
            </ul>
            </div>
        </div>
        </div>
    </div>
    <div class="subject-alert-fixed" v-if="subjectAlert">
      <div class="subject-alert">
        
        <div class="top-title">
        <span class="l-title">{{(search && (search.symbol == 'CC'||search.symbol == 'C'))?'学科分类号':'中图分类号'}}</span>
          <span class="r-close" @click="subjectAlertClose"></span>
        </div><!--头部 标题-->

        <div class="content-w c-l">
          <div class="left">
            <div class="s-title">分类表</div>
            <div class="check-box-w">
              <ul class="domtree">
                <li v-for="(ite,i) in LsubjectCheckList">
                  <span :class="ite.isOpen?'clicktale-on':'clicktale-off'" @click="openRowItem(ite)"></span><label :title="ite.domainName||''"><input type="checkbox" @change="boxChange(ite)" v-model="ite.checked"/>[{{ite.domainIdCode||''}}]{{ite.domainName||''}}</label>
                  <ul v-if="ite.isOpen">
                    <li v-for="(it,x) in ite.children"><span class="clicktale-on"></span><label :title="it.domainName||''"><input type="checkbox" v-model="it.checked" @change="sboxChange(ite,it)"/>[{{it.domainIdCode||''}}]{{it.domainName||''}}</label></li>
                  </ul>
                </li>
            </ul>
            </div>
          </div><!--分类表end-->
          <div class="center">
            <button @click="subjectRowAdd">&gt;&gt;</button>
            <button @click="subjectRowDel">&lt;&lt;</button>
          </div>
          <div class="right">
            <div class="s-title">所选分类</div>
            <div class="check-box-w">
              <span class="title">----=双击删除一行=----</span>
              <p v-for="(it,i) in RsubjectCheckList" @dblclick="subjectRowDblclick(i)" @click="subjectRowClick(i)" :class="subjectCheckRow==i?'p-active':''">{{it.domainName||''}}</p>
            </div>
          </div><!--所选分类end-->
        </div><!--中间-内容板块-->
        <div class="foot-btns">
          <button @click="subjectAlertClose">取消</button>
          <button @click="subjectSubmit">确定</button>
        </div>
      </div>
    </div><!--学科分类-弹窗-->
  </div>
</template>

<script>
var rxjs = window.rxjs;
var columnid = '15164479-81e6-40d1-9cc5-17fefa3905ae';
export default {
  created() {
    let urlInfo = JSON.parse(localStorage.getItem('urlInfo'));
    let info = urlInfo.find(item => item.code == 'articlesearch');
    this.webBase = info.path + '/articlesearch/';
  },
  data() {
    return {
      request_of: true,//请求中
      service_sys_temp5_list1: {},
      post_url_vip: window.apiDomainAndPort,
      menu_show: false,//二级菜单显示
      isOpen: true,//检索框显示
      smenu_list: [{ title: '菜单' }],//二级菜单列表
      request_of: true,//默认true，请求完成fasle
      bgImg: '/public/image/top-bg2.png',
      baseUrl: "/articlesearch",
      fileUrl: window.localStorage.getItem('fileUrl'),//图片地址前缀
      webBase: location.origin + '/articlesearch/',
      searchExpressionResolver: new searchExpressionCore(),//拼接表达式
      search: null,//下拉选中条件
      basicInputKeyWord: '',//input输入框
      cu_colum: { //当前栏目列表
        searchBoxFields: [],//栏目下拉选项
      },
      details: { //页面-总详情
        searchBoxTitleItems: [],//栏目列表
      },
      /**检索条件为空的时候出来的提示面板 */
      emptySearchModel: {
        show: false, //是否显示下拉弹窗
        hotComponent: null, //智能推荐-功能推荐
        hotKeyword: null,//智能推荐-检索发现
      },
      /**当输入关键词的时候提示的项 */
      onKeywordInputSuggestModel: {
        show: false,
        autoComplete: null,//自动补全
        regexInfo: null,//智能匹配
        matchComponent: null,//智能识别 - 顶部服务和新闻
      },
      subjectAllList: [],//分类表格所有数据
      subjectAlert: false,//学科分类-弹窗显示
      subjectCheckRow: null,//右侧选中的行-下标
      LsubjectCheckList: [],//左侧选中的数据
      RsubjectCheckList: [],//添加到右侧的数据
    }
  },
  mounted() {
    if (service_sys_temp5_set_list && service_sys_temp5_set_list.length > 0) {
      var list = [];
      for (var i = 0; i < service_sys_temp5_set_list.length; i++) {
        var topCount = service_sys_temp5_set_list[i].topCount;
        var columnid = service_sys_temp5_set_list[i].id;
        var OrderRule = service_sys_temp5_set_list[i].sortType;
        list.push({ count: topCount, columnId: columnid, sortField: OrderRule });
      }
      this.service_sys_temp5_initData(list);
    }
    if (!rxjs)
      throw new Error(
        "rxjs未正确加载，请确保有对应script标签，src地址https://cdn.bootcdn.net/ajax/libs/rxjs/6.0.0/rxjs.umd.js"
      );
    this.initComponentAsync().then(() => {
      this.emptySearch().then(() => {
        this.emptySearchModel.show = false;//空检索-无内容显示的弹窗
      }); //获取热门检索
      if (this.$refs.mainInput)
        rxjs.fromEvent(this.$refs.mainInput, "keyup").pipe(
          rxjs.operators.map(() => this.basicInputKeyWord),
          rxjs.operators.debounceTime(200), //防抖
          rxjs.operators.throttleTime(200), //节流
          rxjs.operators.distinctUntilChanged()
        ).subscribe((x) => {
          this.rxAutoComplete(x);
        });
    });
    this.getJsonAsync("/api/search-const/all-available-domain-info-friendly-show", {}).then((x) => { //学科分类是0 中途分类是1
      this.subjectAllList = x.data;
    })
  },
  methods: {
    //顶部导航菜单-点击事件
    menuClick(i) {
      this.menu_show = true;
    },
    //打开检索查询
    openSearch() {
      this.isOpen = !this.isOpen;
    },
    service_sys_temp5_openurl(val) {
      var url = '#';
      if (val.navigationType == 2) {
        url = val.externalLinks;
      } else {
        url = val.jumpLink;
      }
      if (val.isOpenNewWindow) {
        window.open(url);
      } else {
        window.location.href = url;
      }
    },
    service_sys_temp5_openurl(val) {
      var url = '#';
      if (val.navigationType == 2) {
        url = val.externalLinks;
      } else {
        url = val.jumpLink;
      }
      if (val.isOpenNewWindow) {
        window.open(url);
      } else {
        window.location.href = url;
      }
    },
    service_sys_temp5_openurl_details(url) {
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
    //获取栏目数据
    service_sys_temp5_initData(list) {
      var post_url = this.post_url_vip + '/navigation/api/navigation/getprontscenescatalogue';
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
          this.service_sys_temp5_list1 = res.data.data[0] || {};
        }
      }).catch(err => {
        this.request_of = false;
        console.log(err);
      });
    },
    /**获取页面数据 */
    initComponentAsync() {
      return Promise.all([
        this.getJsonAsync("/api/search-box-configure/web-search-configure-by-id?id=" + columnid).then((x) => {
          this.details = x.data || {};
          if (this.details.searchBoxTitleItems && this.details.searchBoxTitleItems.length > 0) {
            this.tabClick(this.details.searchBoxTitleItems[0])
          }
          this.request_of = false;
        }),
      ]);
    },
    //高级检索
    highSearch() {
      if (this.isSearchPage) {
        this.$emit('showHighSearch');
      } else {
        let href = `${this.webBase}#/web_searchingResult?high=h`;
        console.log(href);
        window.location.href = href;
      }
    },
    /***订阅此检索 */
    takeSearch() {
      alert('产品：此功能先不处理');
    },
    //栏目点击
    tabClick(val) {
      this.cu_colum = val;
      if (this.cu_colum.searchBoxFields && this.cu_colum.searchBoxFields.length > 0) {
        this.search = this.cu_colum.searchBoxFields[0];
      } else {
        this.search = null;
      }
      if (this.cu_colum.actionType == 4) {
        window.location.href = this.cu_colum.link;
      }
    },
    //检索-按钮
    searchClick() {
      // console.log(this.search);
      if (!this.basicInputKeyWord) { alert('请输入检索内容'); return; } else {
        this.basicInputKeyWord = this.basicInputKeyWord.replace(/(^\s*)|(\s*$)/g, "");
        let reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
        if (reg.test(this.basicInputKeyWord)) {
          if (this.basicInputKeyWord.length > 100) {
            alert('输入字符长度不得大于100');
            return;
          }
        } else {
          if (this.basicInputKeyWord.length > 200) {
            alert('输入字符长度不得大于200');
            return;
          }
        }
      }
      if (this.cu_colum.actionType == 1) {//普通检索
        if (this.cu_colum.tableType == 2) {
          //站内检索，跳转地址,带参到站内检索页面 
          // this.$router.push({path:'/web_siteSearch',query:{}}) //web_siteSearch?keyword=数据库&type=8
          let href = `${this.webBase}#/web_siteSearch?keyword=${encodeURIComponent(this.basicInputKeyWord)}&type=${encodeURIComponent(this.cu_colum.articleType)}&symbol=${encodeURIComponent((this.search ? (this.search.symbol || 'U') : 'U'))}&searchMatchType=${encodeURIComponent(this.search ? (this.search.searchMatchType || searchMatchType.Fuzzy) : searchMatchType.Fuzzy)}`;
          // console.log(href);return;
          window.location.href = href;
        } else {//普通搜索
          this.searchExpressionResolver.clearConditions();//情况条件
          if (this.search && this.search.symbol != "U") {
            if (this.search.symbol == 'CC' || this.search.symbol == 'LC' || this.search.symbol == 'C' || this.search.symbol == 'L') {//表示学科分类号和中途分类
              if (this.basicInputKeyWord) {
                let rsubject_list = this.basicInputKeyWord.split('+') || [];
                if (rsubject_list.length > 0) {
                  rsubject_list.forEach(x => {
                    this.searchExpressionResolver.addSimpleSearchCondition({
                      searchType: this.search.symbol,
                      value: x.replace(/(^\s*)|(\s*$)/g, ""),//传输入项
                      matchType: this.search.searchMatchType,
                    });
                  })
                }
              }
            } else {
              this.searchExpressionResolver.addSimpleSearchCondition({
                searchType: this.search.symbol,
                value: this.basicInputKeyWord,//传输入项
                matchType: this.search.searchMatchType,
              });
            }

          } else {
            this.searchExpressionResolver.addSimpleSearchCondition({
              searchType: "U",
              value: this.basicInputKeyWord,
              matchType: searchMatchType.Fuzzy,
            });
          }
          if (this.cu_colum.predefinedSearchConditions) {
            this.cu_colum.predefinedSearchConditions.forEach(item => {
              this.searchExpressionResolver.addSimpleSearchCondition(item);
            });
          }
          this.goToSearch();
        }
      } else if (this.cu_colum.actionType == 2) {
        window.location.href = this.cu_colum.link.replace(/\{0\}/, this.basicInputKeyWord);
      }
    },
    /**进入到检索结果页面 */
    goToSearch() {
      var list = this.searchExpressionResolver.buildApiRules();
      if (list && list.filterRule && list.filterRule.ruleBody) {
        var result = list.filterRule.ruleBody;
        while (result.startsWith("(") && result.endsWith(")")) {
          result = result.substring(1, result.length - 1);
        }
        list.filterRule.ruleBody = result;
      }
      this.postJsonAsync("/api/search-const/encrypt-search-parameter", list).then((x) => {
        let keyword = this.basicInputKeyWord || "";
        // if (keyword.length >= 100) keyword = keyword.substring(0, 100);
        let href = `${this.webBase}#/web_searchingResult?key=${x.data}&keyword=${encodeURIComponent(keyword)}&id=${encodeURIComponent(columnid)}&c=${this.cu_colum ? this.cu_colum.id : ''}&p=${this.search ? this.search.symbol : ''}`;
        window.location.href = href;
        // location.reload();
      });
    },
    //当输入框获取焦点的时候
    emptySearch() {
      if (this.emptySearchModel.hotComponent) {
        this.emptySearchModel.show = true;
        return Promise.resolve(null); //将热门组件和检索词缓存起来
      }
      return Promise.all([
        this.getJsonAsync("/api/search/hot-component", { limit: 4, sid: this.details.id }),
        this.getJsonAsync("/api/search/hot-words", { limit: 8 }),
      ]).then((resultArray) => {
        this.emptySearchModel.hotComponent = resultArray[0].data && resultArray[0].data.length > 0 ? resultArray[0].data : null;
        if (resultArray[1].data && resultArray[1].data.hits && resultArray[1].data.hits.source) {
          this.emptySearchModel.hotKeyword = resultArray[1].data.hits.source;
        } else {
          this.emptySearchModel.hotKeyword = null;
        }
        this.emptySearchModel.show = this.emptySearchModel.hotKeyword || this.emptySearchModel.hotComponent;
        /////////// 这里是假数据---弹窗调试完后删除 //////////////////
        // this.emptySearchModel.hotComponent = [{title:'链接'}];
        // this.emptySearchModel.hotKeyword = [{word:'最热新闻'}];
      });
    },
    /**检索框失去焦点 */
    inputBlur() {
      setTimeout(() => {
        this.emptySearchModel.show = false;
        this.onKeywordInputSuggestModel.show = false;
      }, 200);
    },
    /**适用于rxjs防抖节流策略的下拉框 */
    rxAutoComplete(x) {
      let _this = this;
      if (x == null) return;
      Promise.all([
        Promise.resolve(searchOption.autoMapRegexInfo.find((y) => y.regex.test(x))),
        this.postJsonAsync("/api/search/match-component", { pageIndex: 1, pageSize: 5, keyword: x, }),
        this.getJsonAsync("/api/search/auto-complete", { limit: 10, keyword: x, }),
      ]).then((resultArray) => {
        _this.onKeywordInputSuggestModel.regexInfo = resultArray[0];
        _this.onKeywordInputSuggestModel.matchComponent = resultArray[1].data && resultArray[1].data.hits && resultArray[1].data.hits.source && resultArray[1].data.hits.source.length > 0 ? resultArray[1].data.hits.source : null;
        _this.onKeywordInputSuggestModel.autoComplete = resultArray[2].data && resultArray[2].data.length > 0 ? resultArray[2].data : null;
        if (!_this.onKeywordInputSuggestModel.regexInfo && !_this.onKeywordInputSuggestModel.matchComponent && !_this.onKeywordInputSuggestModel.autoComplete) {
          _this.onKeywordInputSuggestModel.show = false;
        } else {
          _this.onKeywordInputSuggestModel.show = true;
        }
      }).catch(() => {
        _this.onKeywordInputSuggestModel.show = false;
      });
    },
    /**自动补全或者热门关键词的检索 */
    searchKeyword(keyword) {
      if (!keyword) return;
      this.searchExpressionResolver.clearConditions();
      this.searchExpressionResolver.addSimpleSearchCondition({
        searchType: "U",
        value: keyword,
        matchType: searchMatchType.Fuzzy,
      });
      this.basicInputKeyWord = keyword;
      this.goToSearch();
    },
    /**正则匹配上后调用 */
    regexMatchSearch(regexInfo) {
      this.searchExpressionResolver.addSimpleSearchCondition({
        searchType: regexInfo.searchType,
        value: this.basicInputKeyWord,
        matchType: searchMatchType.Fuzzy,
      });
      this.goToSearch();
    },
    mapServiceComponentName(type) {
      switch (parseInt(type)) {
        case 1 << 1: return "服务";//2
        case 1 << 2: return "功能";//4
        case 1 << 3: return "数据库";//8
        case 1 << 4: return "专题";//16
        case 1 << 5: return "新闻";//32
        case 1 << 6: return "回答";//64
        case 1 << 7: return "应用";//128
        case 1 << 8: return "活动";//256
        default: break;
      }
    },
    //获取学科分类弹窗
    initSubject() {
      if (this.search.symbol == 'CC' || this.search.symbol == 'C') {
        this.LsubjectCheckList = this.subjectAllList.filter(x => x.type == 0);//学科分类
      } else {
        this.LsubjectCheckList = this.subjectAllList.filter(x => x.type == 1);//中图分类
      }
    },
    /**父级选中 */
    boxChange(item) {
      if (item.children && item.children.length > 0) {
        if (item.checked) {
          item.children.forEach(item => {
            item.checked = true;
          })
        } else {
          item.children.forEach(item => {
            item.checked = false;
          })
        }
      }
    },
    /**子级选中 */
    sboxChange(parent, item) {
      if (item.checked) {//选中的时候，判断父级是否全部选中，全部选中则将父级设置为选中，取消选中时则相反操作。
        var is_check = parent.children.filter(x => !x.checked);
        if (is_check && is_check.length == 0) {
          parent['checked'] = true;
        }
      } else {//只要是false，直接将父级设置为false
        parent['checked'] = false;
      }
    },
    /***折叠展开操作 */
    openRowItem(item) {
      item['isOpen'] = !item['isOpen'];
      console.log(item);
      this.$forceUpdate();
    },
    /****学科分类弹窗 -打开 */
    subjectAlertOpen() {
      this.subjectAlert = true;
      this.initSubject();
    },
    /****学科分类弹窗 -关闭 */
    subjectAlertClose() {
      this.RsubjectCheckList = [];
      this.subjectCheckRow = null;
      this.subjectAlert = false;
    },
    /***确定 */
    subjectSubmit() {
      if (this.RsubjectCheckList.length > 0) {
        this.basicInputKeyWord = '';
        this.RsubjectCheckList.forEach(it => {
          this.basicInputKeyWord = this.basicInputKeyWord + it.domainIdCode + ' + ';
        })
        this.basicInputKeyWord = this.basicInputKeyWord.slice(0, -3);
      }
      this.subjectAlertClose();
    },
    /***双击行 */
    subjectRowDblclick(num) {
      this.subjectCheckRow = num;
      this.subjectRowDel();
    },
    /***单击行 */
    subjectRowClick(num) {
      this.subjectCheckRow = num;
    },
    /***添加到右侧的数据 */
    subjectRowAdd() {
      if (this.LsubjectCheckList.length == 0) return;
      this.RsubjectCheckList = [];
      this.subjectCheckRow = null;
      this.LsubjectCheckList.forEach(item => {
        if (item.checked) {
          this.RsubjectCheckList.push(item);
        } else {
          var check_list = item.children.filter(x => x.checked);
          if (check_list && check_list.length > 0) {
            check_list.forEach(x => {
              this.RsubjectCheckList.push(x);
            });
          }
        }
      });
    },
    /***删除行 */
    subjectRowDel() {
      if (this.subjectCheckRow || this.subjectCheckRow == 0) {
        this.RsubjectCheckList.splice(this.subjectCheckRow, 1);
        this.subjectCheckRow = null;
      }
    },
    /**显示关键字高亮 */
    hightLightShow(message) {
      if (this.basicInputKeyWord == null) return "";
      if (!message) return message;
      let highlightToken = this.basicInputKeyWord;
      return message.toLowerCase().split(highlightToken).join(`<i class='reds'>${highlightToken}</i>`);
    },
    /*******************************封装方法******************************************************************/
    //向指定的连接发起get请求
    async getJsonAsync(url, querys) {
      if (!url.startsWith("/")) url = "/" + url;
      let requestUrl = this.baseUrl + url;
      if (querys != null) {
        let queryString = Object.keys(querys).map((x) => `${x}=${querys[x]}`).join("&");
        if (queryString) requestUrl += `?${queryString}`;
      }
      return axios({ url: requestUrl, method: "GET", }).then((response) => response.data);
    },
    /**向指定的连接发起Post请求 */
    async postJsonAsync(url, data) {
      if (!url.startsWith("/")) url = "/" + url;
      let requestUrl = this.baseUrl + url;
      if (data == null) data = {};
      return axios({ url: requestUrl, method: "POST", data: data, }).then((response) => response.data);
    },
  },
}
</script>

<style lang="less" scoped>
@import "./unified_retrieval_sys.less";
</style>

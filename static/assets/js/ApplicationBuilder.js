const axios = window.axios;
const basicTokenKey = 'BasicToken';
class ApplicationBuilder {
    constructor() {
        this._casBase = '';
    }
    ensureToken() {
        let token = localStorage.getItem('token');
        if (token)
            return token;
        return '';
    }
    /**确保token */
    ensureTokenAsync() {
        if (this.ensureToken())
            return Promise.resolve(true);
        return this.fetchBasicTokenFromServerAsync().then(() => true);
    }
    /**从localstarge中获取token，如果还未配置在localstage，则让其在后续请求中带上 */
    ensureBasicToken() {
        let token = localStorage.getItem(basicTokenKey);
        if (token)
            return token;
        return token;
    }
    fetchBasicTokenFromServerAsync() {
        let instance = axios.create();
        return instance.post(this._tokenRequestConfigure.OrgTokenLink, this._tokenRequestConfigure, {
            headers: {
                "Content-Type": 'application/json',
                "Access-Control-Allow-Origin": '*',
                'Access-Control-Allow-Method': '*'
            }
        }).then(x => x.data.data)
            .then(x => localStorage.setItem(basicTokenKey, x.token));
    }
    /**给axios添加跨域请求头 */
    withCors() {
        if (axios) {
            axios.interceptors.request.use(configure => {
                configure.headers["Access-Control-Allow-Origin"] = "*";
                configure.headers["Access-Control-Allow-Method"] = "*";
                return configure;
            });
        }
        return this;
    }
    /**携带机构信息 */
    withBasicToken() {
        if (axios) {
            axios.interceptors.request.use(config => {
                let basicToken = this.ensureBasicToken();
                if (basicToken && !config['Authorization'])
                    config.headers["Authorization"] = 'Bearer ' + basicToken;
                return config;
            });
        }
        return this;
    }
    /**给api自动加上请求域名部分 */
    withDomainAndToken() {
        if (axios) {
            axios.interceptors.request.use(config => {
                var _a, _b;
                if (((_a = config.url) === null || _a === void 0 ? void 0 : _a.startsWith('http://')) || ((_b = config.url) === null || _b === void 0 ? void 0 : _b.startsWith('https://')))
                    return config;
                config.baseURL = this._apiDomainAndPort;
                return config;
            });
        }
        return this;
    }
    /**携带token */
    withToken() {
        if (axios) {
            axios.interceptors.request.use(config => {
                let token = this.ensureToken();
                if (token)
                    config.headers["Authorization"] = 'Bearer ' + token;
                return config;
            });
        }
        return this;
    }
    /**401重新拿token并重试 */
    handle401RetypResponse() {
        if (axios) {
            axios.defaults.retry = 1; //重试次数
            axios.defaults.retryDelay = 1000; //重试延时
            axios.defaults.shouldRetry = (error) => error && error.response && error.response.status == 401; //401重试
            axios.interceptors.response.use(response => {
                return response;
            }, error => {
                {
                    let config = error.config;
                    if (!config || !config.retry)
                        return Promise.reject(error);
                    if (!config.shouldRetry || typeof config.shouldRetry != 'function') {
                        return Promise.reject(error);
                    }
                    //判断是否满足重试条件
                    if (!config.shouldRetry(error)) {
                        return Promise.reject(error);
                    }
                    // 设置重置次数，默认为0
                    config.__retryCount = config.__retryCount || 0;
                    // 判断是否超过了重试次数
                    if (config.__retryCount >= config.retry) {
                        return Promise.reject(error);
                    }
                    //重试次数自增
                    config.__retryCount += 1;
                    let backoff = new Promise(function (resolve) {
                        setTimeout(function () {
                            resolve(1);
                        }, config.retryDelay || 1);
                    });
                    localStorage.removeItem('token');
                    return Promise.all([backoff, this.ensureTokenAsync()]).then(() => axios(config));
                }
            });
        }
        return this;
    }
    /**403跳转登录 */
    handle403Go2LoginResponse() {
        if (axios) {
            axios.interceptors.response.use(undefined, error => {
                // unauth 存在则需要登录
                if (error.response.status == 403 && error.response.headers.unauth) {
                    localStorage.removeItem('token');
                    let current = window.location.href;
                    localStorage.setItem('COM+', current);

                    //   window.open(this._casBase + '/cas/login?service=' + encodeURIComponent(window.location.origin),'_blank');
                    window.location.href = this._casBase + '/cas/login?service=' + encodeURIComponent(`${window.location.origin}${window.location.pathname}`)
                    // window.close();
                }
                return Promise.reject(error);
            });
        }
        return this;
    }
    /**配置cas基础地址 */
    configureCasBase(casBaseUrl) {
        if (casBaseUrl == null)
            throw new Error('请正确配置cas地址');
        this._casBase = casBaseUrl;
        return this;
    }
    /**配置默认的token请求服务 */
    configureOrgInfo(orgTokenConfigure) {
        this._tokenRequestConfigure = orgTokenConfigure;
        return this;
    }
    /**配置api接口的域名和端口部分 */
    configureApiBase(apiDomainAndPort) {
        this._apiDomainAndPort = apiDomainAndPort;
        return this;
    }
    /**添加默认的axios请求中间件
     * 包括 1 cors跨域中间件
     * 2.携带token中间件
     * 3.用户未登录的时候，携带机构token中间件
     * 4. 401错误，用机构token再次请求
     * 5. 403 错误，跳转登录页
     */
    buildDefaultApplication() {
        this.ensureTokenAsync()
            .then(() => {
                if (this._tokenRequestConfigure == null)
                    throw new Error('在调用此方法前，必须先调用configureOrgInfo以配置机构信息');
                if (axios == null)
                    throw new Error("请确保该调用该方法是,axios已被初始化");

                axios.defaults.loaded = true;
                this
                    .withDomainAndToken() //给api请求加上域名部分
                    .withCors() //跨域请求
                    .withToken() //带上token
                    .withBasicToken() //如果没有token，带上含有基本信息的token
                    .handle401RetypResponse() //后端返回401的时候，表示token失效或过期，需要先带上基本token请求
                    .handle403Go2LoginResponse(); //当后端返回403的时候，跳转登录页面;
            });
    }
}
new ApplicationBuilder()
    .configureCasBase("http://192.168.21.43:10011")
    .configureApiBase('http://192.168.21.46:8000')
    .configureOrgInfo({
        orgId: "string",
        orgSecret: 'string',
        orgCode: "cqu",
        OrgTokenLink: 'http://192.168.21.46:5002/api/Auth/AccessToken'
    })
    .buildDefaultApplication();


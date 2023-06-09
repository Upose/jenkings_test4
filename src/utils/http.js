import axios from 'axios';
// import qs from 'qs'
var token = 'Bearer ' + window.localStorage['token'];
axios.defaults.timeout = 20000;

import api from '@/assets/public/js/api';
// console.log(api.postUrl)
export default {
  postUrl: api.postUrl,
  error: function (msg) {
    // console.error(msg);
  },
  responseOk: function (response, resolve, reject) {
    const result = response.data;
    if (result.statusCode == 200) {
      resolve(result);
    } else if (result.statusCode == 499) {
      Vue.prototype.$message({ type: 'error', message: result.errors });
    } else {
      this.error(result.errors);
      reject(result);
    }
  },
  responseError: function (err, resolve, reject) {
    reject(err);
  },
  //不带token的get方法  --- json
  noGet: function (url, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: this.postUrl[url],
        data: data,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(response => {
        this.responseOk(response, resolve, reject);
      }).catch(err => {
        this.responseError(err, resolve, reject);
      });
    });
  },
  //不带token的post方法  --- json
  noPost: function (url, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: this.postUrl[url],
        data: data,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(response => {
        this.responseOk(response, resolve, reject);
      }).catch(err => {
        this.responseError(err, resolve, reject);
      });
    });
  },
  //带token的get方法  --- json
  getJson: function (url, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: this.postUrl[url],
        params: data,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
      }).then(response => {
        this.responseOk(response, resolve, reject);
      }).catch(err => {
        this.responseError(err, resolve, reject);
      });
    });
  },
  //带token的delete方法  --- json
  deleteJson: function (url, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: this.postUrl[url],
        data: data,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
      }).then(response => {
        this.responseOk(response, resolve, reject);
      }).catch(err => {
        this.responseError(err, resolve, reject);
      });
    });
  },
  
  //带token的post方法  --- json
  postJson: function (url, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: this.postUrl[url],
        data: data,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
      }).then(response => {
        this.responseOk(response, resolve, reject);
      }).catch(err => {
        this.responseError(err, resolve, reject);
      });
    });
  },
  //带token的put方法  --- json
  putJson: function (url, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: this.postUrl[url],
        data: data,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
      }).then(response => {
        this.responseOk(response, resolve, reject);
      }).catch(err => {
        this.responseError(err, resolve, reject);
      });
    });
  },
  //带token的put方法  --- json
  putPlain: function (url, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: this.postUrl[url]+data,
        data: data,
        method: 'PUT',
        headers: {
          'Content-Type': 'text/plain',
          'Authorization': token
        },
      }).then(response => {
        this.responseOk(response, resolve, reject);
      }).catch(err => {
        this.responseError(err, resolve, reject);
      });
    });
  },
  //带token的get方法  --- plain ；data参数是在调用时拼接好的（如：id=1&name=张三）
  getPlain: function (url, data) {
    var get_url ='';
    if(data){
      get_url = this.postUrl[url] + '?' + data;
    }else{
      get_url = this.postUrl[url];
    }
    return new Promise((resolve, reject) => {
      axios({
        url: get_url,
        method: 'GET',
        headers: {
          'Content-Type': 'text/plain',
          'Authorization': token
        },
      }).then(response => {
        this.responseOk(response, resolve, reject);
      }).catch(err => {
        this.responseError(err, resolve, reject);
      });
    });
  },
  getPlain_url: function (url, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: this.postUrl[url] + data,
        method: 'GET',
        headers: {
          'Content-Type': 'text/plain',
          'Authorization': token
        },
      }).then(response => {
        this.responseOk(response, resolve, reject);
      }).catch(err => {
        this.responseError(err, resolve, reject);
      });
    });
  },
  //带token的post方法  --- plain
  postPlain: function (url, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: this.postUrl[url],
        data: data,
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
          'Authorization': token
        },
      }).then(response => {
        this.responseOk(response, resolve, reject);
      }).catch(err => {
        this.responseError(err, resolve, reject);
      });
    });
  },
  postPlain_url: function (url, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: this.postUrl[url]+data,
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
          'Authorization': token
        },
      }).then(response => {
        this.responseOk(response, resolve, reject);
      }).catch(err => {
        this.responseError(err, resolve, reject);
      });
    });
  },
  // get方法 自拼参数  带token
  getJsonSelf: function (url, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: this.postUrl[url] + data,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
      }).then(response => {
        this.responseOk(response, resolve, reject);
      }).catch(err => {
        this.responseError(err, resolve, reject);
      });
    });
  },
  // post方法 自拼参数  带token
  postJsonSelf: function (url, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: this.postUrl[url]  + data,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
      }).then(response => {
        this.responseOk(response, resolve, reject);
      }).catch(err => {
        this.responseError(err, resolve, reject);
      });
    });
  },
  //带token的delete方法自己拼接  --- json
  deleteJsonSelf: function (url, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: this.postUrl[url] + data,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
      }).then(response => {
        this.responseOk(response, resolve, reject);
      }).catch(err => {
        this.responseError(err, resolve, reject);
      });
    });
  },
  //带token的delete方法自己拼接  --- json
  deletePlain: function (url, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: this.postUrl[url] + data,
        method: 'DELETE',
        headers: {
          'Content-Type': 'text/plain',
          'Authorization': token
        },
      }).then(response => {
        this.responseOk(response, resolve, reject);
      }).catch(err => {
        this.responseError(err, resolve, reject);
      });
    });
  },
  //带token的文件上传方法  --- form-data
  postFile: function (url, formData) {
    return new Promise((resolve, reject) => {
      axios({
        url: window.localStorage.getItem('fileUrl') + '/api/file/upload-file',
        data: formData,
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': token,
          'X-VipSmart-AppCode': 'scenemanage',
        },
      }).then(response => {
        this.responseOk(response, resolve, reject);
      }).catch(err => {
        this.responseError(err, resolve, reject);
      });
    });
  },
}

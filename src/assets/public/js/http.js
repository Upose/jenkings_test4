import axios from 'axios';
// import qs from 'qs'
var lo_token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJPcmdJZCI6InN0cmluZyIsIk9yZ1NlY3JldCI6InN0cmluZyIsIk9yZ0NvZGUiOiJ0ZXN0IiwiVXNlcktleSI6IjhFNTdCMUM4LTA5OUEtNDdBRS04NTEwLTQ2MjQzQTFFQzQ1QSIsIm5iZiI6MTYzNDg3MTgzMSwiZXhwIjoxNjQwMDcxODMxLCJpc3MiOiJTbWFydExpYnJhcnkuSWRlbnRpdHlDZW50ZXIiLCJhdWQiOiJXZWJBcGkifQ.QzBAABNN6uOZncWS8gVMnIGC8qREPVeDweb2GcRIDCgVdRom3QTdroWEEWmisXT0GMjWyT_R5s2SRgWFcU_ZLDwj0GWJJH69DquT03cJepmaAzJxFLLrVgX33ryDzej_d2k38vxVc0sIwNui8RDq7KmyD3mlXap63quMirq2Ioj1PXYdsMFNjRyiptDFY33hTXPM2HIKbmzZyN0BPMYyPYke1oT5BCKkOsCO0vORLKzMMD0tmzIYxOTLJmRAaIuTzvJ9DC4qahzP2Mf49OEegPpojdovge5YjMG7KEUHVmIzkfFL1PfpsIA19guTnDQEApCZl7VPW37eizAzsFrDtQ'
var token = 'Bearer ' + lo_token;
axios.defaults.timeout = 20000;

import api from '@/assets/public/js/api';
// console.log(api.postUrl)
export default {
  postUrl: api.postUrl,

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
        const result = response.data;
        if (result.statusCode == 200) {
          resolve(result);
        } else {
          error(result.message);
          reject(result);
        }
      }).catch(err => {
        reject(err);
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
        const result = response.data;

        if (result.statusCode == 200) {
          resolve(result);
        } else {
          error(result.message);
          reject(result);
        }
      }).catch(err => {
        reject(err);
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
        const result = response.data;
        if (result.statusCode == 200) {
          resolve(result);
        } else {
          error(result.message);
          reject(result);
        }
      }).catch(err => {
        reject(err);
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
        const result = response.data;
        if (result.statusCode == 200) {
          resolve(result);
        } else {
          error(result.message);
          reject(result);
        }
      }).catch(err => {
        reject(err);
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
        const result = response.data;

        if (result.statusCode == 200) {
          resolve(result);
        } else {
          error(result.message);
          reject(result);
        }
      }).catch(err => {
        reject(err);
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
        const result = response.data;

        if (result.statusCode == 200) {
          resolve(result);
        } else {
          error(result.message);
          reject(result);
        }
      }).catch(err => {
        reject(err);
      });
    });
  },
  //带token的get方法  --- plain ；data参数是在调用时拼接好的（如：id=1&name=张三）
  getPlain: function (url, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: this.postUrl[url] + '?' + data,
        method: 'GET',
        headers: {
          'Content-Type': 'text/plain',
          'Authorization': token
        },
      }).then(response => {
        const result = response.data;
        if (result.statusCode == 200) {
          resolve(result);
        } else {
          error(result.message);
          reject(result);
        }
      }).catch(err => {
        reject(err);
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
        const result = response.data;
        if (result.statusCode == 200) {
          resolve(result);
        } else {
          error(result.message);
          reject(result);
        }
      }).catch(err => {
        reject(err);
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
        const result = response.data;
        if (result.statusCode == 200) {
          resolve(result);
        } else {
          error(result.message);
          reject(result);
        }
      }).catch(err => {
        reject(err);
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
        const result = response.data;
        if (result.statusCode == 200) {
          resolve(result);
        } else {
          error(result.message);
          reject(result);
        }
      }).catch(err => {
        reject(err);
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
        const result = response.data;
        if (result.statusCode == 200) {
          resolve(result);
        } else {
          error(result.message);
          reject(result);
        }
      }).catch(err => {
        reject(err);
      });
    });
  },
  //带token的文件上传方法  --- form-data
  postFile: function (url, formData) {
    return new Promise((resolve, reject) => {
      axios({
        url: process.env.VUE_APP_IMG_URL + 'api/file/upload-file',
        // url: this.postUrl[url],
        data: formData,
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': token
        },
      }).then(response => {
        const result = response.data;
        if (result.statusCode == 200) {
          resolve(result);
        } else {
          error(result.message);
          reject(result);
        }
      }).catch(err => {
        reject(err);
      });
    });
  },
}

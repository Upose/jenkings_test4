/*
 * @Author: 904678748@qq.com 904678748@qq.com
 * @Date: 2023-04-03 10:18:32
 * @LastEditors: 904678748@qq.com 904678748@qq.com
 * @LastEditTime: 2023-04-03 16:35:08
 * @FilePath: \home_sys\src\utils\fileUP.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import bus from './bus';
/**
 * 
 * @param {*} e file选择的文件
 * @param {*} filetype 文件上传类型
 * @param {*} field 标识
 * @returns 
 */
function fileUpload(e, filetype, field) {
    let $target = e.target || e.srcElement
    let file = $target.files[0]
    if (!file) {
      return
    }
    let formData = new FormData()
    formData.append('files', file)
    console.log(file.type);
    if (filetype == 'img') {
      if (file.type !== 'image/png' && file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/JPG' && file.type !== 'image/JPEG' && file.type !== 'image/gif') {
        this.$message({ type: 'error', message: '请上传图片文件!' });
        return;
      }
    } else if (filetype == 'ico') {
      if (file.type !== 'image/x-icon' && file.type !== 'ico') {
        this.$message({ type: 'error', message: '请上传ICO图片文件!' });
        return;
      }
    } else if (filetype == 'js') {
      if (file.type !== 'text/javascript' && file.type !== 'application/javascript' && file.type !== 'JavaScript') {
        this.$message({ type: 'error', message: '请上传js文件!' });
        return;
      }
    } else if (filetype == 'video') {
      if (file.type !== 'video/mp4' && file.type !== 'avi' && file.type !== 'wmv' && file.type !== 'mpg' && file.type !== 'mpeg' && file.type !== 'rm' && file.type !== 'mp4' && file.type !== 'swf' && file.type !== 'flv') {
        this.$message({ type: 'error', message: '请上传视频文件!' });
        return;
      }
    } else if (filetype == 'videoimg') {
      if (file.type !== 'image/png' && file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/JPG' && file.type !== 'image/JPEG' && file.type !== 'image/gif' && file.type !== 'video/mp4' && file.type !== 'avi' && file.type !== 'wmv' && file.type !== 'mpg' && file.type !== 'mpeg' && file.type !== 'rm' && file.type !== 'mp4' && file.type !== 'swf' && file.type !== 'flv') {
        this.$message({ type: 'error', message: '请上传视频或图片文件!' });
        return;
      }
    } else {
      return;
    }
  
    this.http.postFile("UploadFile", formData).then((res) => {
      bus.$emit('getUpladFile', { key: field, url: res.data[0] });
    }).catch((err) => {
      this.$message({ type: 'error', message: err.message || '上传失败!' });
    });
    e.target.value = null;
  }
  Vue.prototype.bus = bus;
  Vue.prototype.$fileUpload = fileUpload;//文件上传
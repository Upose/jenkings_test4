var fileUrl = window.localStorage.getItem('fileUrl');
var grid = null;

//背景设置
Vue.prototype.sceenBgImg = function (val) {
    if (val && val.bgImg) {
        return fileUrl + val.bgImg;
    } else {
        return '';
    }
}
//全屏拖拽
Vue.prototype.fullScreen = function () {
    document.getElementsByClassName('drag-c')[0].setAttribute('class', 'drag-c fullScreen');//drag-c
    document.getElementsByClassName('drag-container')[0].style.padding = 0;//15px
    document.getElementsByClassName('CloseFullScreen')[0].style.display = 'block';
    document.getElementsByClassName('drag-container')[0].style.height = '100%'; //calc(100% - 80px)
},
//取消全屏-拖拽
Vue.prototype.CloseFullScreen = function () {
    document.getElementsByClassName('drag-c')[0].setAttribute('class', 'drag-c');
    document.getElementsByClassName('CloseFullScreen')[0].style.display = 'none';
    document.getElementsByClassName('drag-container')[0].style.padding = '15px';
    document.getElementsByClassName('drag-container')[0].style.height = 'calc(100% - 80px)';
}
//普通文件上传-目前还未考虑好怎么通用
Vue.prototype.UPFile = function(e) {
    let $target = e.target || e.srcElement
    let file = $target.files[0]
    if (!file) {
      return
    }
    let formData = new FormData()
    formData.append('files', file)
    if (file.type !== 'image/png' && file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/JPG' && file.type !== 'image/JPEG'&& file.type !== 'image/gif') {
      this.$message({ type: 'error', message: '请上传图片文件!' });
      return;
    }
    this.http.postFile("UploadFile", formData).then((res) => {
        return res.data[0];
    }).catch((err) => {
      this.$message({ type: 'error', message: '上传失败!' });
    });
}


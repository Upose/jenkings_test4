<template>
<div class="warp">
    <iframe src="http://192.168.21.8:8080" id="myiframe1"></iframe>
</div>
</template>
<style scoped>
.warp{
    width: 100%;
    height: 100%;
}
iframe{
    width: 100%;
    height: 100%;
    border: none;
}
</style>
<script>
export default {
  name: 'iframe_view',
  created(){
    
  },
  mounted(){
    console.log(window.localStorage.getItem('template'));
    setInterval(() => {
      document.getElementById("myiframe1").contentWindow.postMessage({
        cmd: 'location_list',
        params: {
            template: window.localStorage.getItem('template'),
        }
      }, '*');
    }, 1000);
  },
  data () {
    return {}
  },
  methods:{
    
  }
}
</script>



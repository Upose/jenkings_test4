<template>
  <div class="fullPage" ref="fullPage">
    <div class="fullPageContainer" ref="fullPageContainer" @mousewheel="mouseWheelHandle" @DOMMouseScroll="mouseWheelHandle">
      <div class="section section1">1</div>
      <div class="section section2">2</div>
      <div class="section section3">3</div>
      <div class="section section4">4</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fullpage: {
        current: 1,
        isScrolling: false,
        deltaY: 0,
      },
    };
  },
  methods: {
    next() {
      let len = 4;
      if (this.fullpage.current + 1 <= len) {
        this.fullpage.current += 1;
        this.move(this.fullpage.current);
      }
    },
    pre() {
      if (this.fullpage.current - 1 > 0) {
        this.fullpage.current -= 1;
        this.move(this.fullpage.current);
      }
    },
    move(index) {
      this.fullpage.isScrolling = true;
      this.directToMove(index);
      setTimeout(() => {
        this.fullpage.isScrolling = false;
      }, 1010);
    },
    directToMove(index) {
      let height = this.$refs["fullPage"].clientHeight;
      let scrollPage = this.$refs["fullPageContainer"];
      let scrollHeight;
      scrollHeight = -(index - 1) * height + "px";
      scrollPage.style.transform = `translateY(${scrollHeight})`;
      this.fullpage.current = index;
    },
    mouseWheelHandle(event) {
      let evt = event || window.event;
      if (evt.stopPropagation) {
        evt.stopPropagation();
      } else {
        evt.returnValue = false;
      }
      if (this.fullpage.isScrolling) {
        return false;
      }
      let e = event.originalEvent || event;
      this.fullpage.deltaY = e.deltaY || e.detail;
      if (this.fullpage.deltaY > 0) {
        this.next();
      } else if (this.fullpage.deltaY < 0) {
        this.pre();
      }
    },
  },
};
</script>
<style scoped>
.fullPage {
  padding: 0;
  margin: 0;
  height: calc(100vh);
  overflow: hidden;
  background-color: rgb(189, 211, 186);
}
.fullPageContainer {
  width: 100%;
  height: calc(100vh);
  transition: all linear 0.5s;
}
.section {
  width: 100%;
  height: calc(100vh);
  background-position: center center;
  background-repeat: no-repeat;
}
.section1 {
  background-color: rgb(189, 211, 186);
}
.section1 .secction1-content {
  color: #fff;
  text-align: center;
  position: absolute;
  top: 40%;
  right: 0;
  left: 0;
}
.secction1-content h1 {
  font-size: 40px;
  padding-bottom: 30px;
}
.secction1-content p {
  font-size: 20px;
}
.section2 {
  background-color: rgb(44, 48, 43);
}
.section3 {
  background-color: rgb(116, 104, 109);
}
.section4 {
  background-color: rgb(201, 202, 157);
}
</style>


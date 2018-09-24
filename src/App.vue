<template>
  <div id="app">
    <div class="main">
      <router-view/>
    </div>
    <right-nav/>
    <!--可自定义按钮的样式、show/hide临界点、返回的位置  -->
    <!--如需文字提示，可在外部添加element的<el-tooltip></el-tooltip>元素  -->
    <back-to-top transitionName="fade" :visibilityHeight="50" :backPosition="0"></back-to-top>
  </div>
</template>

<script>
import BackToTop from '@/components/BackToTop'
import RightNav from '@/components/RightNav'
export default {
  name: 'App',
  components: { BackToTop, RightNav },
  data () {
    return {

    }
  }
}
</script>

<style>
#app{
  width: 100%;
  min-height: 100%;
  min-width: 320px;
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
}
.main{
  width: 100%;
}
</style>

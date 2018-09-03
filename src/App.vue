<template>
  <div id="app">
    <div>
      <router-view/>
    </div>
    <!--可自定义按钮的样式、show/hide临界点、返回的位置  -->
    <!--如需文字提示，可在外部添加element的<el-tooltip></el-tooltip>元素  -->
     <el-tooltip placement="top" content="tooltip">
      <back-to-top transitionName="fade" :visibilityHeight="300" :backPosition="0"></back-to-top>
    </el-tooltip>
  </div>
</template>

<script>
import BackToTop from '@/components/BackToTop'
export default {
  name: 'App',
  components: { BackToTop },
  data () {
    return {

    }
  }
}
</script>

<style>

</style>

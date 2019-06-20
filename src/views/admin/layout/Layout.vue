<!-- 管理页面布局 -->
<template>
 <div class="admin-wrapper" :class="classObj">
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <navbar></navbar>
      <tags-view></tags-view>
      <app-main></app-main>
    </div>

 </div>
</template>

<script>
// import { Sidebar } from './components'
import { Navbar, AppMain, Sidebar, TagsView } from './components'
export default {
  data () {
    return {
    }
  },

  components: {
    Sidebar,
    Navbar,
    AppMain,
    TagsView
  },

  computed: {
    sidebar () {
      return this.$store.state.app.sidebar
    },
    classObj () {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation
        // mobile: this.device === 'mobile'
      }
    }
  },

  created () {},

  mounted () {},

  methods: {}
}

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
//@import 'src/styles/sidebar.scss';
.admin-wrapper {
  @include clearfix;
  width: 100%;
  position: relative;
  height: 100%;
  // display: flex;
  // flex-direction: row;
  // overflow: auto;
  }
</style>

<template>
  <div id="app">
    <!-- 博客页面 -->
    <div class="blog-content" v-if="!Common.isAdminWrap">
      <router-view/>
    </div>
    <!-- 管理页面 -->
    <div class="admin-content" v-if="Common.isAdminWrap">
      <router-view/>
    </div>
    <right-nav v-if="!Common.isAdminWrap && !Common.isErrorWrap"/>
    <!--可自定义按钮的样式、show/hide临界点、返回的位置  -->
    <!--如需文字提示，可在外部添加element的<el-tooltip></el-tooltip>元素  -->
    <back-to-top transitionName="fade" :visibilityHeight="50" :backPosition="0"></back-to-top>

    <!-- 登录开始 -->
    <!-- <transition name="login">
      <login v-if="Common.isAdminWrap"/>
    </transition> -->
    <!-- 登录结束 -->
  </div>
</template>

<script>
import BackToTop from '@/components/BackToTop'
import RightNav from '@/components/RightNav'
import { mapGetters } from 'vuex'
import {scroll} from '@/utils/scroll'
export default {
  name: 'App',
  components: { BackToTop, RightNav },
  mixins: [scroll],
  data () {
    return {

    }
  },
  watch: {
    showRightNav (value) {
      this.setViewWrapWidth()
    }
  },
  computed: {
    ...mapGetters([
      'Common',
      'articleMenuSource',
      'articleMenu'
    ])
  },
  mounted () {
    window.addEventListener('scroll', this.scrollListener)
  },
  methods: {
    scrollListener () {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop >= 60) {
        this.showScrollToTop = true
      } else {
        this.showScrollToTop = false
      }
      if (this.articleMenu) {
        for (let i = 0, len = this.articleMenuSource.length; i < len; ++i) {
          let item = this.articleMenuSource[i]
          let top = document.getElementById(item.id).getBoundingClientRect().top
          top += document.body.scrollTop || document.documentElement.scrollTop
          if (scrollTop <= top + 20) {
            this.$store.dispatch('setArticleMenuTag', item.tag)
            break
          }
        }
      }
    },
    setViewWrapWidth () {
      let temp = 20
      if (this.screen.width > 990 && this.showRightNav) {
        temp = 340
      }
      this.viewWrapWidth = this.screen.width - temp + 'px'
    }
  }
}
</script>

<style>
#app{
  width: 100%;
  height: 100%;
  min-width: 320px;
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
}
.blog-content{
  width: 100%;
}
.admin-content{
  width: 100%;
  height: 100%;
}
/* .login-enter-active, .login-leave-active{
  transition: opacity .3s;
  }
.login-enter, .login-leave-to{
  opacity: 0;
} */
</style>

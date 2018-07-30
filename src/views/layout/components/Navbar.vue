<template>
    <el-menu class="navbar"
      mode="horizontal"
      background-color="#f5f5f5"
      text-color="#000000">
        <el-menu-item class="site-title">LumiaQian的踩坑日记</el-menu-item>
        <el-menu-item class="index">首页
            <svg-icon icon-class="index"></svg-icon>
        </el-menu-item>
        <el-menu-item class="label">标签
            <svg-icon icon-class="label"></svg-icon>
        </el-menu-item>
        <el-menu-item class="classify">分类
            <svg-icon icon-class="classify"></svg-icon>
        </el-menu-item>
        <el-menu-item class="archive">归档
            <svg-icon icon-class="archive"></svg-icon>
        </el-menu-item>
        <el-menu-item class="about">关于
            <svg-icon icon-class="about"></svg-icon>
        </el-menu-item>
        <el-menu-item class="search">搜索
            <svg-icon icon-class="search"></svg-icon>
        </el-menu-item>
    </el-menu>
</template>

<script>
export default {
  props: {

  },
  data () {
    return {

    }
  },
  computed: {

  },
  created () {

  },
  mounted () {

  },
  watch: {

  },
  methods: {

  },
  components: {

  }
}
</script>

<style rel="stylesheet/scss"  scoped>
  .navbar {
      display: flex;
      /* background: #f5f5f5; */
      height: 10%;
      text-align: center;
      align-items: center;
      justify-content:center;
  }
  el-el-menu-item {
      align-content: center;
  }
  .site-title {
      font-size: 22px;
      font-weight: bolder;
  }
  /* .site-title {
    display: block;
   font-size: 22px;
   font-weight: bolder;
   position: relative;
   left: 20%;
  }
  .index {
      display: block;
      position: relative;
      left: 35%;
      top: -50%;
  } */
</style>

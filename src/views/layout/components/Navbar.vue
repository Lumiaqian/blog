<template>
    <div class="top">
        <div class="site-title">
            <a>LumiaQian的踩坑日记</a>
        </div>
        <el-menu class="navbar"
          mode="horizontal"
          background-color="#f5f5f5"
          text-color="#000000"
          :default-active="$router.path"
          router>
          <el-menu-item class="index" index="/">首页
            <svg-icon icon-class="index"></svg-icon>
          </el-menu-item>
          <el-menu-item class="label" index="/tag">标签
            <svg-icon icon-class="label"></svg-icon>
          </el-menu-item>
          <el-menu-item class="classify" index="/category">分类
            <svg-icon icon-class="classify"></svg-icon>
          </el-menu-item>
          <el-menu-item class="archive">归档
            <svg-icon icon-class="archive"></svg-icon>
          </el-menu-item>
          <el-menu-item class="about" index="/about">关于
            <svg-icon icon-class="about"></svg-icon>
          </el-menu-item>
          <el-menu-item class="search">搜索
            <svg-icon icon-class="search"></svg-icon>
          </el-menu-item>
       </el-menu>
       <div class="weather">
           <div class="title">
               <p>{{city}} {{weatherInfo.temp}}℃ {{weatherInfo.weather}} <svg-icon :icon-class="weatherInfo.weather"></svg-icon></p>
           </div>
       </div>
    </div>

</template>

<script>
import {getIp} from '@/utils/net'
import {getWeather} from '@/api/utils'
export default {
  props: {

  },
  data () {
    return {
      weatherInfo: {
        temp: '',
        weather: ''
      },
      temp: '',
      city: ''
    }
  },
  computed: {
  },
  created () {
    this.getWeather()
  },
  mounted () {
  },
  watch: {

  },
  methods: {
    getWeather () {
      getIp().then(res => {
        let length = res.data.length - 1
        let ip = JSON.parse(res.data.substring(19, length)).cip
        // console.log(res.data.length)
        getWeather(ip).then(res => {
          this.weatherInfo.temp = res.data.result[0].realtime.temp
          this.weatherInfo.weather = res.data.result[0].realtime.weather
          this.city = res.data.result[0].city
          // console.log(this.weatherInfo)
        })
      })
    }
  },
  components: {

  }
}
</script>

<style rel="stylesheet/scss"  scoped>
  .top {
      display: flex;
      justify-content:center;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      background-color: #f5f5f5;
      padding:0px; margin:0px;
  }
   .site-title {
      font-size: 22px;
      font-weight: bolder;
      flex: 0 0 20%;
  }
  .navbar {
      display: flex;
      top: 0px;
      padding:0px;
      /* background: #f5f5f5; */

      text-align: center;
      align-items: center;
      justify-content:center;
  }
  .weather {
       flex: 0 0 25%;
       justify-content: flex-end;
       display: flex;
  }
  .title {
      margin: 3%;
  }
  el-el-menu-item {
      align-content: center;
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

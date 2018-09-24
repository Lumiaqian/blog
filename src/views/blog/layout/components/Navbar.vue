<template>
    <div class="top">
      <div class="head">
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
          <el-menu-item class="label" index="/tags">标签
            <svg-icon icon-class="label"></svg-icon>
          </el-menu-item>
          <el-menu-item class="classify" index="/categories">分类
            <svg-icon icon-class="classify"></svg-icon>
          </el-menu-item>
          <el-menu-item class="archive" index="/archives">归档
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
          this.weatherInfo.temp = res.data.data[0].realtime.temp
          this.weatherInfo.weather = res.data.data[0].realtime.weather
          this.city = res.data.data[0].city
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
      position: relative;
      width: 100%;
      /* justify-content:center;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center; */
      background-color: #f5f5f5;
      padding:0px; margin:0px;
      /* cursor: default;
      animation: show .5s */
  }
  .head{
    position: relative;
    max-width: 1000px;
    padding: 0 10px;
    margin: 0 auto;
    height: 90px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    transition: height .3s;
  }
  .site-title {
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      font-size: 20px;
      font-weight: bold;
      padding: 25px 0;
      /* flex: 0 0 20%; */
  }
  .navbar {
      position: relative;
      cursor: default;
      animation: show .5s;
  }
  .weather {
       position: relative;
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

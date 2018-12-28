<!--  -->
<template>
  <div class="header">
      <div class="header-wrap">
        <div class="toggle" v-if="!isPc" @click="toggle">
         <span
          class="toggle-line"
          v-for="(line, index) in toggleLineData"
          :key="index"
          :style="{
            width: line.width,
            top: line.top,
            transform: line.transform,
            opacity: line.opacity,
            transition: 'all .3s'
          }">
         </span>
        </div>
        <div class="logo" @click="toHome" :style="{
        'justify-content': isPc ? 'space-between' : 'center',
        'padding': isPc ? '25px' : '0px',
        'width': isPc ? '50%' : '80%',
        'font-size': isPc ? '20px' : '15px',
        }">
          <p class="line"></p>
          <p class="blog-name">LumiaQian的踩坑日记</p>
          <p class="line" ></p>
        </div>
        <div class="tabs" v-if="isPc">
          <div class="tab" v-for="(tab, index) in tabs" :key="index" @click="toTab(tab)">
            <svg-icon :icon-class="tab.icon"></svg-icon>
            <span class="name">{{tab.name}}</span>
          </div>
        </div>
        <div class="weather"  >
          <p><span v-text="weather.city"></span>
            <span v-text="weather.temp"></span>
            <span v-text="weather.weather"></span>
            <svg-icon :icon-class="weather.weather"></svg-icon>
          </p>
       </div>
      </div>
      <el-collapse-transition>
      <div class="mobile-tab-wrap" v-show="!isPc&&showMobileTabs">
        <div class="tab" v-for="(tab, index) in tabs" :key="index" @click="toTab(tab)">
          <svg-icon :icon-class="tab.icon"></svg-icon>
          <span>{{ tab.name }}</span>
        </div>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      tabs: [
        {
          name: '首页',
          icon: 'index',
          index: '/'
        },
        {
          name: '标签',
          icon: 'label',
          index: '/tags'
        },
        {
          name: '分类',
          icon: 'classify',
          index: '/categories'
        },
        {
          name: '归档',
          icon: 'archive',
          index: '/archives'
        },
        {
          name: '关于',
          icon: 'about',
          index: '/about'
        },
        {
          name: '搜索',
          icon: 'search',
          index: '/search'
        }
      ],
      isPc: true,
      lineStyle: {
        normalLineData: [
          {
            width: '100%',
            top: '0px',
            transform: 'rotateZ(0deg)',
            opacity: '1'
          },
          {
            width: '100%',
            top: '0px',
            transform: 'rotateZ(0deg)',
            opacity: '1'
          },
          {
            width: '100%',
            top: '0px',
            transform: 'rotateZ(0deg)',
            opacity: '1'
          }
        ],
        closeLineData: [
          {
            width: '100%',
            top: '6px',
            transform: 'rotateZ(-45deg)',
            opacity: '1'
          },
          {
            width: '100%',
            top: '0px',
            transform: 'rotateZ(0deg)',
            opacity: '0'
          },
          {
            width: '100%',
            top: '-6px',
            transform: 'rotateZ(45deg)',
            opacity: '1'
          }
        ]
      },
      toggleLineData: [],
      showMobileTabs: false
    }
  },
  watch: {
    screen (value) {
      this.isPc = true
      if (value.width <= 800) {
        this.isPc = false
      }
    }
  },
  components: {},

  computed: {
    ...mapGetters([
      'weather',
      'screen'
    ])
  },

  // mounted: {},
  created () {
    this.getWeather()
    this.toggleLineData = this.lineStyle.normalLineData
  },
  methods: {
    getWeather () {
      this.$store.dispatch('getWeather')
    },
    toTab (tab) {
      this.$router.push(tab.index)
    },
    toHome () {
      window.location.href = `${window.location.origin}`
    },
    toggle () {
      this.showMobileTabs = !this.showMobileTabs
      this.toggleLineData = this.showMobileTabs ? this.lineStyle.closeLineData : this.lineStyle.normalLineData
    }
  }
}

</script>
<style lang='scss' scoped>
.header{
  width: 100%;
  position: relative;
  background: #f5f5f5
}
.header-wrap{
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
  .logo{
    height: 100%;
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    color: #262a30;
    font-size: 20px;
    font-weight: bold;
    padding: 25px 0;
    &:hover{
      cursor: pointer;
      .line {
        width: 0px;
      }
    }
    .line{
      width: 150px;
      height: 2px;
      background-color: #262a30;
      animation: logo-line .5s;
      transition: width .3s;
    }
    .blog-name{
      animation: logo-name .5s
    }
  }
}
.tabs{
  position: relative;
  cursor:  default;
  animation: show .5s;
  width: 100%;
  font-size: 14px;
  .tab {
    padding: 1%;
    display: inline-block;
    cursor: pointer;
    color: #262a30;
    background-color: #f5f5f5;
    transition: all .5s;
    &:last-child {
      margin-right: 0px;
    }
    &:hover{
      color: #fff;
      background-color: #262a30
    }
    .name{
      margin-left: 8px;
    }
  }
}
.weather {
  width: 50%;
  font-size: 14px;
}
.toggle{
      width: 20px;
      height: 20px;
      background-color: #f5f5f5;

      cursor: pointer;
      line-height: 0;
      .toggle-line{
        position: relative;
        display: inline-block;
        vertical-align: top;
        width: 100%;
        height: 2px;
        margin-top: 4px;
        background-color:  #262a30;
        &:first-child{
          margin-top: 0px;
        }
      }
}
  .mobile-tab-wrap{
    width: 100%;
    transition: all .3s;
    // overflow: hidden
    border-top: 1px solid #eeeeee;
    .tab{
      position: relative;
      width: 100%;
      padding: 8px 15px;
      font-size: 12px;
      line-height: 1;
      // .iconfont
      //   font-size: 12px
      //   margin-right: 5px
    }
  }
@keyframes logo-name {
  from {
    margin-left: -60px;
    opacity: 0
  }
  to {
    margin-left: 0px;
    opacity: 1
  }
}
@keyframes logo-line {
  from {
    width: 0px;
  }
  to {
    width: 200px;
  }
}
@keyframes show {
  from {
    margin-top: -30px;
    opacity: 0;
  }
  to {
    margin-top: 0px;
    opacity: 1;
  }
}
</style>

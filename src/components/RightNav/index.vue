<!-- 侧边栏 -->
<template>
 <div>
     <div v-show="show" id="right-nav" :style="{
      'width': Common.showRightNav ? '320px' : '0px',
      'transition': 'all .3s ease'}">
      <transition >
        <div class="user-info" v-show="showMenu">
          <div class="avatar">
            <pan-thumb :image=avatar width='100px' height='100px' v-if="avatar!=''" class="image"></pan-thumb>
          </div>
          <div class="name">
            <p>{{name}}</p>
          </div>
          <div class="motto">
            <p>{{motto}}</p>
          </div>
          <div class="social">
            <a target='_blank' class="social-item" :href="weibo" v-if="weibo"><svg-icon icon-class="weibo" /></a>
            <el-tooltip effect="dark" :content="QQ" placement="bottom" v-if="QQ">
              <svg-icon class="social-item" icon-class="qq"/>
            </el-tooltip>
            <a target='_blank' class="social-item" :href="github" v-if="github"><svg-icon icon-class="github"/></a>
            <el-tooltip effect="dark" :content="email" placement="bottom" v-if="email">
               <svg-icon class="social-item" icon-class="email" />
            </el-tooltip>
          </div>
        </div>
      </transition>
     </div>
     <div class="toggle" @click="toggle" @mouseover="setLineData" @mouseout="setLineData">
         <span
         class="toggle-line"
         v-for="(line, i) in toggleLineData"
         :key="i"
         :style="{
          width: line.width,
          top: line.top,
          transform: line.transform,
          opacity: line.opacity,
          transition: 'all .3s'
          }">
         </span>
     </div>
 </div>
</template>

<script>
import PanThumb from '@/components/PanThumb'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      show: true,
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
        ],
        arrowLineData: [
          {
            width: '50%',
            top: '1px',
            transform: 'rotateZ(-45deg)',
            opacity: '1'
          },
          {
            width: '100%',
            top: '0px',
            transform: 'rotateZ(0deg)',
            opacity: '1'
          },
          {
            width: '50%',
            top: '-1px',
            transform: 'rotateZ(45deg)',
            opacity: '1'
          }
        ]
      },
      toggleLineData: [],
      img: '',
      data: null,
      showMenu: false
    }
  },

  watch: {
    // screen (value) {
    //   this.show = true
    //   if (value.width <= 990) {
    //     this.show = false
    //   }
    // }
  },
  components: {
    PanThumb
  },

  computed: {
    ...mapGetters([
      'Common',
      'avatar',
      'motto',
      'name',
      'weibo',
      'QQ',
      'github',
      'email'
    ])
  },

  created () {
    this.toggleLineData = this.lineStyle.normalLineData
    // console.log('是否显示' + this.show)
  },

  mounted () {},

  methods: {
    toggle () {
      this.$store.dispatch('setShow', !this.Common.showRightNav)
      this.toggleLineData = this.Common.showRightNav ? this.lineStyle.closeLineData : this.lineStyle.normalLineData
      this.showMenu = !this.showMenu
    },
    setLineData (e) {
      if (this.Common.showRightNav) {
        return
      }
      if (e.type === 'mouseover') {
        this.toggleLineData = this.lineStyle.arrowLineData
      } else {
        this.toggleLineData = this.lineStyle.normalLineData
      }
    }
  }
}

</script>
<style scoped>
.toggle{
   position: fixed;
    width: 35px;
    height: 35px;
    right: 50px;
    bottom: 95px;
    padding: 5px;
    z-index: 1050;
    cursor: pointer;
    line-height: 0;
    background: #262a30;
}

.toggle-line{
  position: relative;
  display: inline-block;
  vertical-align: top;
  width: 100%;
  height: 2px;
  margin-top: 4px;
  background: #fff;
}
#right-nav{
  position: relative;
  width: 320px;
}
.user-info{
  position: fixed;
  background-color: #262a30;
  color: #fff;
  right: 0;
  top: 0;
  bottom: 0;
  width: 320px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
  overflow: hidden;
}
/* .avatar{
  border: 4px;
  border-radius: 50%;
} */
/* .social-item {
  margin-left: 0.5%;
} */
</style>

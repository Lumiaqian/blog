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
          <div class="count">
            <a class="count-item" v-if="lpostCount">
              <p class="count-item-num">{{lpostCount}}</p>
              <p >文章</p>
            </a>
            <a class="count-item" v-if="lcateCount">
              <p class="count-item-num">{{lcateCount}}</p>
              <p>分类</p>
            </a>
            <a class="count-item" v-if="ltagCount">
              <p class="count-item-num">{{ltagCount}}</p>
              <p>标签</p>
            </a>
          </div>
          <div class="social">
            <a target='_blank' class="social-item" :href="weibo" v-if="weibo"><svg-icon icon-class="weibo" /></a>
            <div class="social-item">
              <el-tooltip effect="dark" :content="QQ" placement="bottom" v-if="QQ" class="social-item">
                 <svg-icon icon-class="qq"/>
              </el-tooltip>
            </div>
            <a target='_blank' class="social-item" :href="github" v-if="github"><svg-icon icon-class="github"/></a>
            <div class="social-item">
              <el-tooltip effect="dark" :content="email" placement="bottom" v-if="email" >
               <svg-icon icon-class="email" />
              </el-tooltip>
            </div>
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
            top: '3px',
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
            top: '-3px',
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
      'email',
      'lpostCount',
      'ltagCount',
      'lcateCount'
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
    width: 25px;
    height: 25px;
    right: 10px;
    bottom: 45px;
    padding: 5px;
    z-index: 1050;
    cursor: pointer;
    background: #262a30;
    line-height: 0;
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
.toggle-line:first-child{
  margin-top: 0px;
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
  padding-top: 1%;
  overflow: hidden;
}
.count{
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 80%;
}
.social{
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  align-content: space-around;
  width: 50%;
}
.count-item {
  display: inline-flex;;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  width: 100%;
}
.social-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.count-item-num {
  bottom: 0;
  padding: 0;
  margin: 0;
}
/* .avatar{
  border: 4px;
  border-radius: 50%;
} */
</style>

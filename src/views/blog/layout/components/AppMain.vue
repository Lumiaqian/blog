<template>
    <div class="app-main" :style="{width: viewWrapWidth}">
      <router-view/>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
  },
  data () {
    return {
      viewWrapWidth: '1000px'
    }
  },
  computed: {
    ...mapGetters([
      'screen',
      'showRightNav'
    ])
  },
  created () {
  },
  mounted () {
  },
  watch: {
    showRightNav (value) {
      this.setViewWrapWidth()
    },
    screen (value) {
      this.setViewWrapWidth()
    }
  },
  methods: {
    setViewWrapWidth () {
      let temp = 20
      if (this.screen.width > 990 && this.showRightNav) {
        temp = 340
      }
      this.viewWrapWidth = this.screen.width - temp + 'px'
      // console.log(this.screen.width)
      // console.log(this.viewWrapWidth)
    }
  },
  components: {

  }
}
</script>

<style scoped>
.app-main{
  max-width: 1000px;
  min-width: 320px;
  margin: 0 auto;
  padding: 0 10px;
  min-height: calc(100vh - 120px);
  transition: width .3s;
  overflow: hidden;
}
</style>

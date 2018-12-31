<template>
    <div class="foo">
      <div class="main">
        <p>
        本博客已萌萌哒运行<span>{{ runningTime }}</span><span class="time-jump">(●'◡'●)ﾉ♥</span>
        </p>
        <p><span>©<span v-text="startYear"/> — <span v-text="endYear"/>&ensp;</span>
          <span><svg-icon icon-class="user"/>&ensp;<span v-text="name"/></span>
        </p>
        <p>
          <span>赣ICP备17009582号-1</span>
        </p>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {

  },
  data () {
    return {
      runningTime: 0
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'startYear',
      'endYear'
    ])
  },
  created () {
    this.running()
  },
  mounted () {

  },
  watch: {

  },
  methods: {
    running () {
      let startTime = new Date('2018/10/01 00:00:00')
      // eslint-disable-next-line no-unused-vars
      let timer = setInterval(() => {
        let time = new Date() - startTime
        let day = parseInt(time / 1000 / 60 / 60 / 24, 10)
        let hour = parseInt(time / 1000 / 60 / 60 % 24, 10)
        let minute = parseInt(time / 1000 / 60 % 60, 10)
        let second = parseInt(time / 1000 % 60, 10)
        this.runningTime = `${day}天${hour}小时${minute}分${second}秒`
      }, 1000)
    }
  },
  components: {

  }
}
</script>

<style scoped>
.foo{
  /* position: relative; */
  width: 100%;
  min-height: 90px;
  background-color: #f5f5f5;
  padding:0px; margin:0px;
}
.main{
  position: relative;
  width: 100%;
  max-width: 1000px;
  padding: 0 20px;
  margin: 0 auto;
  display: flex;
  font-size: 15px;
  flex-direction: column;
  justify-content: space-between;
  /* align-items: center; */
  /* transition: height .3s; */
}
p {
  margin: 1.5% 0;
}
</style>

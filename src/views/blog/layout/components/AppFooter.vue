<template>
    <div class="foo">
      <div class="main">
        <p><span>©{{startYear}} — {{endYear}}&ensp;</span>
          <span><svg-icon icon-class="user"/>&ensp;{{name}}</span>
        </p>
        <p>
          <span>赣ICP备17009582号-1</span>
        </p>
        <!-- <p>
        本博客已萌萌哒运行<span>{{ runningTime }}</span><span class="time-jump">(●'◡'●)ﾉ♥</span>
        </p> -->
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

<style scoped>
.foo{
  position: relative;
  width: 100%;
  background-color: #f5f5f5;
  padding:0px; margin:0px;
}
.main{
  width: 100%;
  max-width: 1000px;
  padding: 0;
  margin: 0 auto;
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
 transition: height .3s;
}
</style>

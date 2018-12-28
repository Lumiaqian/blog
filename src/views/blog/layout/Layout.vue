<template>
    <div class="layout">
      <navbar></navbar>
      <!-- <b-header></b-header> -->
      <app-main></app-main>
      <app-footer></app-footer>
    </div>
</template>

<script>
import { Navbar, AppMain, AppFooter } from './components'
export default {
  name: 'layout',
  components: {
    Navbar,
    AppMain,
    AppFooter
  },
  props: {

  },
  data () {
    return {

    }
  },
  computed: {

  },
  created () {
    this.$store.dispatch('GetInfo')
    this.$store.dispatch('setLcount')
  },
  mounted () {

  },
  watch: {

  },
  methods: {

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.layout {
     width: 100%;
     position: relative;
     height: 100%;
}
</style>

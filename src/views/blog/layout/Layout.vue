<template>
    <div class="layout">
      <navbar></navbar>
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
  },
  mounted () {

  },
  watch: {

  },
  methods: {

  }
}
</script>

<style rel="stylesheet/scss" scoped>
  .layout {
    width: 100%;
}
</style>

<template>
    <div class="layout">
        <div>
            <navbar></navbar>
            <app-main></app-main>
            <footer></footer>
        </div>
    </div>
</template>

<script>
import { Navbar, AppMain, Footer } from './components'
export default {
  name: 'layout',
  components: {
    Navbar,
    AppMain,
    Footer
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
  }
</style>

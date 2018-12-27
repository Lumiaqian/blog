<!--  -->
<template>
  <ul class="article-menu">
      <li v-for="item in menu" :key="item.tag">
      <span @click="toMenu(item)" :class="{'active': is(item) || isParent(item)}">{{ item.tag }} {{ item.title }}</span>
      <article-menu :menu="item.children"  v-show="isParent(item)" />
    </li>
  </ul>
</template>

<script>
import articleMenu from '@/components/articleMenu'
import {
  mapGetters
} from 'vuex'
import {scroll} from '@/utils/scroll'
export default {
  props: ['menu'],
  data () {
    return {
    }
  },

  components: {
    articleMenu
  },
  mixins: [scroll],
  computed: {
    ...mapGetters([
      'articleMenuTag'
    ])
  },

  methods: {
    toMenu (item) {
      let top = document.getElementById(item.id).getBoundingClientRect().top
      top += document.body.scrollTop || document.documentElement.scrollTop
      this.scrollToTarget(top)
    },
    is (item) {
      return item.tag === this.articleMenuTag
    },
    isParent (item) {
      return this.articleMenuTag.indexOf(item.tag) === 0
    }
  }

}

</script>
<style lang='scss' scoped>
.article-menu {
  width: 100%;
  line-height: 1.8;
  font-weight: bold;
  font-size: 14px;
  color: #999;
}
li{
    margin-left: 10px;
    span {
      cursor: pointer;
      transition: all .3s;
      border-bottom: 1px solid #555555;
      :active,:hover {
          color: #ffffff
      }
    }
}
</style>

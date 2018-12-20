<!--  -->
<template>
 <div>
     <div class="title">
         <p style="font-size:24px">分类</p>
         <p>目前共计{{categories.length}}个分类</p>
     </div>
     <timeline class="categories" v-loading.fullscreen.lock="loading" element-loading-background="rgba(0, 0, 0, 0.8)">
         <div v-for="cate in parentCate" :key="cate.categoryId">
             <timeline-title class="item" bg-color="#C1FFC1" @click.native="toCateDetail(cate)">
                {{cate.categoryName}}({{cate.count}})
             </timeline-title>
             <timeline-item class="item" bg-color="#9dd8e0" v-if="cate.categoryId===child.fatherId" v-for="child in childrenCate" :key="child.categoryId" @click.native="toCateDetail(child)">
                 {{child.categoryName}}({{child.count}})
             </timeline-item>
         </div>
     </timeline>
 </div>
</template>

<script>
import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline'
import {getCategories} from '@/api/categories'
export default {
  data () {
    return {
      categories: [],
      parentCate: [],
      childrenCate: [],
      loading: true
    }
  },

  components: {
    Timeline,
    TimelineItem,
    TimelineTitle
  },

  computed: {},

  created () {
    this.getCayegoryList()
  },

  mounted () {},

  methods: {
    getCayegoryList () {
      getCategories().then(res => {
        this.categories = res.data.data
        for (let i = 0; i < this.categories.length; i++) {
          if (this.categories[i].fatherId === '-1') {
            // console.log('parent' + this.categories[i])
            this.parentCate[i] = this.categories[i]
          } else {
            this.childrenCate[i] = this.categories[i]
          }
        }
        this.parentCate = this.bouncer(this.parentCate)
        this.childrenCate = this.bouncer(this.childrenCate)
        // console.log('categories: ' + this.categories)
        // console.log('parent: ' + this.parentCate.length)
        // console.log('chaild: ' + this.childrenCate.length)
        this.loading = false
      })
    },
    bouncer (arr) {
      // Don't show a false ID to this bouncer.
      return arr.filter(function (val) {
        return !(!val || val === '')
      })
    },
    toCateDetail (cate) {
      this.$store.dispatch('setCategory', cate).then(() => {
        this.$router.push({
          path: '/categories/category',
          query: {
            id: cate.categoryId
          }
        })
      })
    }
  }
}

</script>
<style scoped>
.title {
    position: relative;
    text-align: center
}
.categories {
    position: relative;
    top: 30%;
    left: 45%;
}
.item:hover{
  text-decoration:underline;
  cursor:pointer
}
</style>

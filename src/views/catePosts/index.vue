<!--  -->
<template>
 <div>
    <timeline class="category">
      <timeline-title bg-color="#C1FFC1">{{category.categoryName}}({{category.count}})</timeline-title>
      <timeline-item class="item" bg-color="#9dd8e0" v-for="(post,index) in posts" :key="index" @click.native="toPostDetail(post.postId)">
        {{post.publicDate | formatDate}} {{post.title}}
      </timeline-item>
    </timeline>
 </div>
</template>

<script>
import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline'
import {formatDate} from '@/utils/date.js'
import {getPosts} from '@/api/categories'
import Cookies from 'js-cookie'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      category: {
        categoryId: '',
        categoryName: '',
        fatherId: '',
        count: 0
      },
      posts: []
    }
  },

  components: {
    Timeline,
    TimelineItem,
    TimelineTitle
  },

  filters: {
    formatDate (time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd')
    }
  },
  computed: {
    ...mapGetters([
      'Category'
    ])
  },

  created () {
    this.getPosts()
  },

  mounted () {},

  methods: {
    getPosts () {
      if (this.Category.categoryId === '' || this.Category.categoryName === '') {
        console.log('进入Cate为空')
        let category = Cookies.getJSON('category')
        // console.log('Cookies: ' + JSON.stringify(tag))
        this.category.categoryId = category.categoryId
        this.category.categoryName = category.categoryName
        this.category.fatherId = category.fatherId
        this.category.count = category.count
      } else {
        this.category.categoryId = this.Category.categoryId
        this.category.categoryName = this.Category.categoryName
        this.category.fatherId = this.Category.fatherId
        this.category.count = this.Category.count
      }
      // console.log(JSON.stringify(this.Tag))
      getPosts(this.category.categoryId).then(res => {
        this.posts = res.data.result
      })
    },
    toPostDetail (id) {
      this.$router.push({
        path: '/post',
        query: {
          id: id
        }
      })
    }
  }
}

</script>
<style scoped>
.category {
 position: absolute;
 top: 25%;
 left: 40%;
}
.item:hover{
  text-decoration:underline;
  cursor:pointer
}
</style>

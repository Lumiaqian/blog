<!--  -->
<template>
 <div>
      <timeline class="posts" v-loading="loading">
          <timeline-title bg-color="#C1FFC1">不错! 目前共计 {{total}} 篇日志。 继续努力。</timeline-title>
         <div v-for="(year,index) in years" :key="index">
             <timeline-title bg-color="#C1FFC1">
                 {{year}}
             </timeline-title>
             <timeline-item class="item" bg-color="#9dd8e0" v-if="(formatDateYear(post.publicDate)) === year" v-for="(post,index) in posts" :key="index"  @click.native="toDetail(post.postId)">
                 {{post.publicDate | formatDate}} {{post.title}}
             </timeline-item>
         </div>
     </timeline>
 </div>
</template>

<script>
import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline'
import {posts} from '@/api/posts'
import {formatDate} from '@/utils/date.js'
export default {
  data () {
    return {
      posts: [],
      total: 0,
      pageNo: 1,
      pageSize: 10,
      years: [],
      loading: true
    }
  },

  components: {
    Timeline,
    TimelineItem,
    TimelineTitle
  },
  filters: {
    formatDate (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    },
    formatDateYear (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy')
    }
  },
  computed: {},

  created () {
    this.getPosts()
  },

  mounted () {},

  methods: {
    getPosts () {
      posts(this.pageNo, this.pageSize).then(res => {
        // console.log(res.date.data.total)
        this.posts = res.data.data.list
        this.total = res.data.data.total
        let year = this.formatDateYear(this.posts[0].publicDate)
        this.years[0] = year
        for (let i = 0; i < posts.length; i++) {
          if (year !== this.formatDateYear(this.posts[i].publicDate)) {
            this.years[i] = this.formatDateYear(this.posts[i].publicDate)
          }
        }
        this.years = this.bouncer(this.years)
        console.log(this.years)
        this.loading = false
        // console.log(res.date.data.total)
        // formatDate()
      })
    },
    toDetail (id) {
      this.$router.push({
        path: '/posts',
        query: {
          id: id
        }
      })
    },
    formatDateYear (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy')
    },
    bouncer (arr) {
      // Don't show a false ID to this bouncer.
      return arr.filter(function (val) {
        return !(!val || val === '')
      })
    }
  }
}

</script>
<style scoped>
.posts {
    position: relative;
    top: 25%;
    left: 35%;
}
.item:hover{
  text-decoration:underline;
  cursor:pointer
}
</style>

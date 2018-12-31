<!-- 归档页面 -->
<template>
 <div class="posts" v-loading.lock="loading"
      element-loading-text="正在施工"
      element-loading-spinner="el-icon-loading">
      <timeline >
          <timeline-title bg-color="#C1FFC1">不错! 目前共计 {{pageTotal}} 篇日志。 继续努力。</timeline-title>
         <div v-for="(year,index) in years" :key="index">
             <timeline-title bg-color="#C1FFC1">
                 {{year}}
             </timeline-title>
             <timeline-item class="item" bg-color="#9dd8e0" v-if="(formatDateYear(post.publicDate)) === year" v-for="(post,index) in posts" :key="index"  @click.native="toDetail(post.postId)">
                 {{post.publicDate | formatDate}} {{post.title}}
             </timeline-item>
         </div>
     </timeline>
     <el-pagination
          background
          @current-change="handleCurrentChange"
          layout="total, prev, pager, next"
          :page-size=pageSize
          :total=pageTotal>
    </el-pagination>
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
      pageNo: 1,
      pageSize: 10,
      pageTotal: 0,
      years: [],
      loading: true,
      total: 0
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
    this.getPosts(this.pageNo, this.pageSize)
  },

  mounted () {},

  methods: {
    getPosts (pageNo, pageSize) {
      posts(pageNo, pageSize).then(res => {
        // console.log(res.date.data.total)
        this.posts = res.data.data.list
        this.pageNo = res.data.data.pageNum
        this.pageSize = res.data.data.pageSize
        this.pageTotal = res.data.data.total
        // this.total = this.pageTotal
        let year = this.formatDateYear(this.posts[0].publicDate)
        this.years[0] = year
        for (let i = 0; i < posts.length; i++) {
          if (year !== this.formatDateYear(this.posts[i].publicDate)) {
            this.years[i] = this.formatDateYear(this.posts[i].publicDate)
          }
        }
        this.years = this.bouncer(this.years)
        // console.log(this.years)
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
    },
    handleCurrentChange (val) {
      console.log(val)
      this.getPosts(val, this.pageSize)
    }
  }
}

</script>
<style scoped>
.posts {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10% 10px;
}
.item:hover{
  text-decoration:underline;
  cursor:pointer
}
.el-pagination{
  width: 100%;
  padding: 10px 0;
  display: flex;
  /* display: -webkit-flex */
  flex-direction: row;
  justify-content: center;
}
</style>

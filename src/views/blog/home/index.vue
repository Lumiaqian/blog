<template >
    <div v-loading.body="loading" element-loading-background="rgba(0, 0, 0, 0.8)">
      <div  v-for="index in posts.length" :key="index" class="post">
        <div class="post-card">
          <el-card shadow="hover" class="card">
           <div class="detail">
              <p class="title" @click="toDetail(posts[index-1].postId)">{{posts[index-1].title}}</p>
              <p>{{posts[index-1].publicDate | formatDate}}</p>
           </div>
            <div v-for="i in posts[index-1].tags.length" :key="i">
              <el-tag>{{posts[index-1].tags[i-1].tagName}}</el-tag>
            </div>
            <el-button type="text" @click="toDetail(posts[index-1].postId)">阅读全文</el-button>
          </el-card>
        </div>
      </div>
      <el-row >
        <el-col :xs="{span:24}" :sm="{span:12,offset:6}" :lg="{span:8,offset:8}" :xl="{span:9,offset:8}">
          <el-pagination
          background
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :page-size=pageSize
          :total=pageTotal>
          </el-pagination>
        </el-col>
      </el-row>
    </div>
</template>

<script>
import {posts} from '@/api/posts'
import PostCard from '@/components/PostCard'
import {formatDate} from '@/utils/date.js'
export default {
  props: {
  },
  data () {
    return {
      posts: null,
      tags: null,
      categories: null,
      pageNo: 1,
      pageSize: 5,
      pageTotal: 20,
      loading: true

    }
  },
  filters: {
    formatDate (time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  computed: {

  },
  created () {
    this.getPosts()
  },
  mounted () {
  },
  watch: {

  },
  methods: {
    getPosts () {
      posts(this.pageNo, this.pageSize).then(res => {
        this.posts = res.data.data.list
        this.pageNo = res.data.data.pageNum
        this.pageSize = res.data.data.pageSize
        this.pageTotal = res.data.data.total
        this.loading = false
        // console.log(this.content)
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
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      posts(val, this.pageSize).then(res => {
        this.posts = res.data.data.list
        this.pageNo = res.data.data.pageNum
        this.pageSize = res.data.data.pageSize
        this.pageTotal = res.data.data.total
        // console.log(this.content)
        // formatDate()
      })
    }
  },
  components: {
    PostCard
  }
}
</script>

<style scoped>
.post {
  padding: 20px;
  position: relative;
  display: flex;
}
.post-card{
  position: relative;
  left: 30%;
}
.card{
  width: 555px;
}
.title {
  font-size:24px
}
.title:hover{
  text-decoration:underline;
  cursor:pointer
}
</style>

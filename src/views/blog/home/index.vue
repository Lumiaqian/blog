<template >
    <div v-loading.fullscreen.lock="loading" element-loading-background="rgba(0, 0, 0, 0.8)">
      <div  class="post" v-for=" post in posts" :key="post.postId">
        <div class="post-card" >
          <el-card  shadow="hover" class="card">
           <div class="detail">
              <p class="title" @click="toDetail(post.postId)">{{post.title}}</p>
              <p>{{post.publicDate | formatDate}}</p>
           </div>
            <div v-for="tag of post.tags" :key="tag.tagId" v-if="tag">
              <!-- <el-tag size="medium">{{tag.tagName}}</el-tag> -->
              <el-button size="mini" type="success" round @click="toTag(tag)">#{{tag.tagName}}</el-button>
            </div>
            <el-button type="text" @click="toDetail(post.postId)">阅读全文</el-button>
          </el-card>
        </div>
      </div>
      <el-row >
        <el-col :xs="{span:24}" :sm="{span:12,offset:6}" :lg="{span:8,offset:8}" :xl="{span:9,offset:8}">
          <el-pagination
          background
          @current-change="handleCurrentChange"
          layout="total, prev, pager, next"
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
      posts: [],
      tags: [],
      // categories: [],
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
        // console.log(JSON.stringify(this.posts[0].tags))
        // localStorage.setItem('posts', JSON.stringify(this.posts))
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
    toTag (tag) {
      this.$store.dispatch('setTag', tag).then(() => {
        this.$router.push({
          path: '/tags/tag',
          query: {
            id: tag.tagId
          }
        })
      })
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
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

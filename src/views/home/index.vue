<template>
    <div>
      <div  v-for="index in posts.length" :key="index" class="post">
        <el-row >
        <el-col :xs="{span:24}" :sm="{span:12,offset:6}" :lg="{span:8,offset:8}" :xl="{span:9,offset:8}">
          <el-card shadow="hover" >
           <div class="detail">
              <p class="title" @click="toDetail(posts[index-1].postId)">{{posts[index-1].title}}</p>
              <p>{{posts[index-1].publicDate | formatDate}}</p>
           </div>
            <div v-for="i in posts[index-1].tags.length" :key="i">
              <el-tag>{{posts[index-1].tags[i-1].tagName}}</el-tag>
            </div>
            <el-button type="text" @click="toDetail(posts[index-1].postId)">阅读全文</el-button>
          </el-card>
        </el-col>
       </el-row>
      </div>
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
      pageSize: 5

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
        this.posts = res.data.result.list
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
    }
  },
  components: {
    PostCard
  }
}
</script>

<style scoped>
.post {
  padding: 20px
}
.title {
  font-size:24px
}
.title:hover{
  text-decoration:underline;
  cursor:pointer
}
</style>

<template >
  <transition name="el-zoom-in-center">
    <div v-loading.lock="loading"
         element-loading-text="正在施工"
         element-loading-spinner="el-icon-loading" class="home">
      <div  class="post" v-for=" post in posts" :key="post.postId">
        <div class="post-card">
          <el-card  shadow="hover" class="card">
           <div class="detail">
              <p class="title" @click="toDetail(post.postId)" v-cloak
              :style="{
              'font-size' : isPc ? '20px' : '18px'
          }">{{post.title}}</p>
              <div class="detail-item">
                <p v-cloak>发布{{post.publicDate | formatDate}} |</p>
                <p v-cloak>&nbsp;更新{{post.editDate | formatDate}} |</p>
                <p v-cloak>分类</p>
                <p v-for="cate in post.categories" :key="cate.categoryId">{{cate.categoryName}}&nbsp;</p>
              </div>
              <p v-text="getSummary(post)"></p>
           </div>
           <div class="tags">
             <div v-for="tag of post.tags" :key="tag.tagId" v-show="tag" class="tag" @click="toTag(tag)">
               <svg-icon icon-class="tag1" style="color:#FF0000;"></svg-icon>
               <font style="color:#FF0000;">{{tag.tagName}}</font>
              <!-- <el-tag size="medium">{{tag.tagName}}</el-tag> -->
              <!-- <el-button size="mini" type="success" round @click="toTag(tag)" v-cloak>#{{tag.tagName}}</el-button> -->
             </div>
           </div>
            <el-button type="text" @click="toDetail(post.postId)">~~阅读全文~~</el-button>
          </el-card>
        </div>
      </div>
      <el-row >
        <el-col :xs="{span:24}" :sm="{span:12,offset:4}" :lg="{span:8,offset:6}" :xl="{span:9,offset:4}">
          <el-pagination
          background
          @current-change="handleCurrentChange"
          layout="total, prev, pager, next"
          :page-size=pageSize
          :total=pageTotal
          v-show="posts.length!==0">
          </el-pagination>
        </el-col>
      </el-row>
    </div>
  </transition>
</template>

<script>
import {posts} from '@/api/posts'
// import PostCard from '@/components/PostCard'
import {formatDate} from '@/utils/date.js'
import {cutString} from '@/utils/string.js'
import { mapGetters } from 'vuex'
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
      pageTotal: 0,
      loading: true,
      isPc: true
    }
  },
  filters: {
    formatDate (time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd')
    }
  },
  computed: {
    ...mapGetters([
      'screen'
    ])
  },
  created () {
    this.getPosts()
  },
  mounted () {
  },
  watch: {
    screen (value) {
      this.isPc = true
      if (value.width <= 768) {
        this.isPc = false
      }
    }
  },
  methods: {
    getPosts () {
      posts(this.pageNo, this.pageSize).then(res => {
        this.posts = res.data.data.list
        this.pageNo = res.data.data.pageNum
        this.pageSize = res.data.data.pageSize
        this.pageTotal = res.data.data.total
        this.loading = false
        // formatDate()
      })
    },
    getSummary (post) {
      // eslint-disable-next-line no-unused-vars
      let summary = post.content.toString()
      summary = cutString(summary)
      // console.log(summary.slice(0, 150) + '...')
      return summary.slice(0, 100) + '...'
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
  }
}
</script>

<style scoped>
.home {
  position: relative;
  padding: 30px 10px;
  min-height: 100px;
}
.post {
  padding: 30px 10px;
  /* position: relative; */
  display: flex;
}
.post-card{
  position: relative;
  left: 15%;
  width: 60%;
  height: 100%;
}
.card{
  /* width: 60%; */
  min-height: 200px;
  min-width: 250px;
  /* background-color: #8EE5EE; */
}
.title {
  font-size:20px
}
.title:hover{
  text-decoration:underline;
  cursor:pointer
}
.detail-item{
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size:13px;
  width: 100%;
}
[v-cloak] {
display:none;
}
.tags{
  position: relative;
  display: flex;
  flex-direction: row;
}
.tag{
  margin: 0.5%;
  cursor: pointer;
}
p {
  margin: 1.5% 0;
}
</style>

<!-- 搜索界面 -->
<template>
  <div class="search" >
    <!-- v-loading.lock="loading"
         element-loading-text="正在施工"
         element-loading-spinner="el-icon-loading" -->
    <div class="input">
      <el-input
        v-model="keyword"
        placeholder="请输入关键字"
        clearable
        @keyup.enter.native="search(pageNo, pageSize)"
      ></el-input>
      <el-button class="button-search" type="success" icon="el-icon-search" circle @click="search(pageNo, pageSize)"></el-button>
    </div>
    <div>
       <transition name="el-zoom-in-center">
          <div v-show="showResult" class="showResult">共搜索到{{pageTotal}}篇与"{{keyword}}"有关的文章</div>
       </transition>
      <el-collapse-transition>
        <img v-show="posts.length===0" src="http://image.caoyuqian.cn/血小板施工.jpg" class="img">
      </el-collapse-transition>
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
             <div v-for="tag of post.tags" :key="tag.tagId" v-show="tag" class="tag">
              <!-- <el-tag size="medium">{{tag.tagName}}</el-tag> -->
              <el-button size="mini" type="success" round @click="toTag(tag)" v-cloak>#{{tag.tagName}}</el-button>
             </div>
           </div>
            <el-button type="text" @click="toDetail(post.postId)">阅读全文</el-button>
          </el-card>
        </div>
      </div>
      <el-pagination
          background
          @current-change="handleCurrentChange"
          layout="total, prev, pager, next"
          :page-size=pageSize
          :total=pageTotal
          v-show="posts.length!==0">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {search} from '@/api/posts'
import { mapGetters } from 'vuex'
import {cutString} from '@/utils/string.js'
export default {
  data () {
    return {
      keyword: '',
      pageNo: 1,
      pageSize: 5,
      pageTotal: 0,
      loading: false,
      posts: [],
      isPc: true,
      showResult: false
    }
  },

  components: {},
  watch: {
    screen (value) {
      this.isPc = true
      if (value.width <= 768) {
        this.isPc = false
      }
    },
    keyword (value) {
      if (value === '') {
        this.showResult = false
      }
    }
  },
  created () {
    // var lett = this
    // document.onkeydown = function (e) {
    //   var key = window.event.keyCode
    //   if (key === 13) {
    //     lett.search(this.pageNo, this.pageSize)
    //   }
    // }
  },
  computed: {
    ...mapGetters([
      'screen'
    ])
  },

  methods: {
    querySearch () {

    },
    search (pageNo, pageSize) {
      let data = {
        'keyWord': this.keyword,
        'pageNum': pageNo - 1,
        'pageSize': pageSize
      }
      if (this.keyword === '') {
        this.$message.error('请输入需要搜索的关键字')
        return
      }
      this.loading = true
      search(data).then(res => {
        if (res.data.code === '200') {
          this.posts = res.data.data.posts
          this.pageTotal = res.data.data.total
          this.loading = false
          this.showResult = true
        } else {
          this.$message.error('服务器异常')
        }
      })
    },
    handleCurrentChange (val) {
      this.search(val, this.pageSize)
    },
    getSummary (post) {
      // eslint-disable-next-line no-unused-vars
      let summary = post.content.toString()
      summary = cutString(summary)
      // console.log(summary.slice(0, 150) + '...')
      return summary.slice(0, 50) + '...'
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
    }
  }
}

</script>
<style lang='scss' scoped>
.search{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px 10px;
}
.img{
    height: 200px;
    margin: 3%;
    margin-top: 25%;
}
.input{
  display: flex;
  flex-direction: row;
}
.button-search{
  margin-left: 5%;
}
.showResult{
  padding: 30px 10px;
  text-align: center;
}
.post {
  padding: 30px 10px;
  display: flex;
  transition: all .5s;
}
.post-card{
  position: relative;
  width: 80%;
  height: 100%;
}
.card{
  min-height: 200px;
  min-width: 250px;
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
}
p {
  margin: 1.5% 0;
}
</style>

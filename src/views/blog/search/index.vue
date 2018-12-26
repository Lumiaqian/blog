<!-- 搜索界面 -->
<template>
  <div class="search" >
    <!-- v-loading.lock="loading"
         element-loading-text="正在施工"
         element-loading-spinner="el-icon-loading" -->
    <div class="input">
      <el-input
        v-model="keyword"
        placeholder="请输入内容"
        clearable
      ></el-input>
      <el-button class="button-search" type="success" icon="el-icon-search" circle @click="search"></el-button>
    </div>
    <div>
      <el-collapse-transition>
        <img v-show="posts.length===0" src="http://pj9aecdab.bkt.clouddn.com/血小板施工.jpg" class="img">
      </el-collapse-transition>
      <div class="post" >
        <div v-for="post in posts" :key="post.postId">
           <p v-text="post.title"></p>
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
export default {
  data () {
    return {
      keyword: '',
      pageNo: 1,
      pageSize: 5,
      pageTotal: 0,
      loading: false,
      posts: []
    }
  },

  components: {},

  computed: {},

  methods: {
    querySearch () {

    },
    search () {
      let data = {
        'keyWord': this.keyword,
        'pageNum': this.pageNo - 1,
        'pageSize': this.pageSize
      }
      this.loading = true
      search(data).then(res => {
        if (res.data.code === '200') {
          this.posts = res.data.data.posts
          this.pageTotal = res.data.data.total

          this.loading = false
        }
      })
    },
    handleCurrentChange (val) {

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
}
.img{
    height: 200px;
    margin: 3%;
    margin-top: 25%;
}
.post{
  margin: 3%;
  margin-top: 30%;
}
.input{
  display: flex;
  flex-direction: row;
}
.button-search{
  margin-left: 5%;
}
</style>

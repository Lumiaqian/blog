<!--  -->
<template>
 <div class="category" v-loading.lock="loading"
      element-loading-text="正在施工"
      element-loading-spinner="el-icon-loading">
    <timeline >
      <timeline-title bg-color="#C1FFC1">{{category.categoryName}}({{category.count}})</timeline-title>
      <timeline-item class="item" bg-color="#9dd8e0" v-for="(post,index) in posts" :key="index" @click.native="toPostDetail(post.postId)">
        {{post.publicDate | formatDate}} {{post.title}}
      </timeline-item>
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
      posts: [],
      loading: true,
      pageNo: 1,
      pageSize: 10,
      pageTotal: 0
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
    this.getPosts(this.pageNo, this.pageSize)
  },

  mounted () {},

  methods: {
    getPosts (pageNo, pageSize) {
      if (this.Category.categoryId === '' || this.Category.categoryName === '') {
        // console.log('进入Cate为空')
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
      getPosts(this.category.categoryId, pageNo, pageSize).then(res => {
        this.posts = res.data.data.list
        this.pageNo = res.data.data.pageNum
        this.pageSize = res.data.data.pageSize
        this.pageTotal = res.data.data.total
        this.loading = false
      })
    },
    toPostDetail (id) {
      this.$router.push({
        path: '/posts',
        query: {
          id: id
        }
      })
    },
    handleCurrentChange (val) {
      this.getPosts(val, this.pageSize)
    }
  }
}

</script>
<style scoped>
.category {
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
  margin: 5%;
  margin-left: -1%;
}
</style>

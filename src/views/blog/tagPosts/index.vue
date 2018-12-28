<!--  -->
<template>
 <div class="tag" v-loading.lock="loading"
      element-loading-text="正在施工"
      element-loading-spinner="el-icon-loading">
    <timeline>
      <timeline-title bg-color="#C1FFC1">{{tag.tagName}}</timeline-title>
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
import {getPosts} from '@/api/tags'
import Cookies from 'js-cookie'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      tag: {
        tagId: '',
        tagName: ''
      },
      posts: [],
      loading: true,
      pageNo: 1,
      pageSize: 10,
      pageTotal: 20
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
      'Tag'
    ])
  },

  created () {
    this.getPosts(this.pageNo, this.pageSize)
  },

  mounted () {},

  methods: {
    getPosts (pageNo, pageSize) {
      if (this.Tag.tagId === '' || this.Tag.tagName === '') {
        // console.log('进入Tag为空')
        let tag = Cookies.getJSON('tag')
        // console.log('Cookies: ' + JSON.stringify(tag))
        this.tag.tagId = tag.tagId
        this.tag.tagName = tag.tagName
      } else {
        this.tag.tagId = this.Tag.tagId
        this.tag.tagName = this.Tag.tagName
      }
      // console.log(JSON.stringify(this.Tag))
      getPosts(this.tag.tagId, pageNo, pageSize).then(res => {
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
      this.posts(val, this.pageSize)
    }
  }
}

</script>
<style scoped>
.tag {
  display: flex;
  flex-direction: column;
  align-items: center;
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

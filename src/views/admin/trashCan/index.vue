<!-- 垃圾箱 -->
<template>
 <div>
     <el-table
     class="table"
     v-loading="loading"
     ref="multipleTable"
     :data="posts"
     tooltip-effect="dark"
     style="width: 100%"
     @selection-change="handleSelectionChange">
     <el-table-column
       type="selection"
       width="55">
     </el-table-column>
     <el-table-column
       prop="postId"
       label="文章ID"
       width="130">
       <!-- <template slot-scope="scope">{{ scope.row.postID }}</template> -->
     </el-table-column>
     <el-table-column
       prop="title"
       label="标题"
       width="150">
     </el-table-column>
     <el-table-column
       label="分类"
       width="150">
        <template slot-scope="post">
          <span v-for="(cate,index) in post.row.categories" :key="index">
            {{cate.categoryName}}
          </span>
        </template>
     </el-table-column>
     <el-table-column
       label="标签"
       width="150">
        <template slot-scope="post">
          <el-tag size="mini" v-for="(tag,index) in post.row.tags" :key="index">
            {{tag.tagName}}
          </el-tag>
        </template>
     </el-table-column>
     <el-table-column
       label="保存时间"
       width="155">
       <template slot-scope="post">
         <span v-if="post.row.saveDate === null">
           无
         </span>
         <span v-else>
         {{post.row.saveDate | formatDate}}
         </span>
       </template>
     </el-table-column>
     <el-table-column
       label="发表时间"
       width="155">
       <template slot-scope="post">
         <span v-if="post.row.publicDate === null">
           无
         </span>
         <span v-else>
         {{post.row.publicDate | formatDate}}
         </span>
       </template>
     </el-table-column>
     <el-table-column
       label="编辑时间"
       width="155">
       <template slot-scope="post">
         <span v-if="post.row.editDate === null">
           无
         </span>
         <span v-else>
         {{post.row.editDate | formatDate}}
         </span>
       </template>
     </el-table-column>
     <el-table-column
       label="状态"
       width="80">
       <template slot-scope="post">
         <span v-if="post.row.status === 0 ">未发布</span>
         <span v-else-if="post.row.status === 1">已发布</span>
         <span v-else-if="post.row.status === -1">已删除</span>
       </template>
     </el-table-column>
     <el-table-column label="操作">
      <template slot-scope="post">
        <el-button
          size="mini"
          type="primary"
          @click="editPost(post.row.postId)"
          >编辑</el-button>
        <el-button
          size="mini"
          type="warning"
          @click="draft(post.$index,post.row)"
          >恢复</el-button>
      </template>
    </el-table-column>
  </el-table>
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
import {deletedPosts, draftPost} from '@/api/admin/posts'
import {formatDate} from '@/utils/date.js'
export default {
  data () {
    return {
      pageNo: 1,
      pageSize: 10,
      pageTotal: 20,
      posts: [],
      loading: true
    }
  },

  components: {},
  filters: {
    formatDate (time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  computed: {},

  created () {
    this.getPosts()
  },

  mounted () {},

  methods: {
    getPosts () {
      deletedPosts(this.pageNo, this.pageSize).then(res => {
        let posts = res.data.data.list
        this.posts = posts
        this.pageTotal = res.data.data.total
        this.loading = false
      })
    },
    handleSelectionChange () {
      console.log('多选！')
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.loading = true
      deletedPosts(val, this.pageSize).then(res => {
        this.posts = res.data.data.list
        this.pageNo = res.data.data.pageNum
        this.pageSize = res.data.data.pageSize
        this.pageTotal = res.data.data.total
        this.loading = false
        // console.log(this.content)
        // formatDate()
      })
    },
    editPost (postId) {
      this.$router.push({
        path: '/admin/post/editPost',
        query: {
          postId: postId
        }
      })
    },
    draft (index, row) {
      draftPost(row.postId).then(res => {
        if (res.data.code === '200') {
          this.$message({
            message: res.data.message,
            type: 'success'
          })
          row.status = 0
          row.editDate = res.data.data.editDate
          this.posts.splice(index, 1)
        } else {
          this.$message({
            message: res.data.message,
            type: 'error'
          })
        }
      }).catch(() => {
        this.$message({
          message: '服务器异常！',
          type: 'error'
        })
      })
    }
  }
}

</script>
<style scoped>
.el-table {
  margin: 1%;
}
.el-pagination {
  margin: 1%;
  margin-left: 3%;
}
.table {
  margin-left: 3%;
}
</style>

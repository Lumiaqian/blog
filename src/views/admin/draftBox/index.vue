<!-- 草稿箱 -->
<template>
 <div>
     <el-table
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
       width="200">
     </el-table-column>
     <el-table-column
       label="分类"
       width="200">
        <template slot-scope="post">
          <span v-for="(cate,index) in post.row.categories" :key="index">
            {{cate.categoryName}}
          </span>
        </template>
     </el-table-column>
     <el-table-column
       label="标签"
       width="200">
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
       width="100">
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
          @click="edit(post.row.postId)"
          >编辑</el-button>
         <el-button v-if="post.row.status != 1"
          size="mini"
          type="success"
          @click="pub(post.row)"
          >发布</el-button>
          <el-button v-if="post.row.status != -1 "
          size="mini"
          type="danger"
          @click="discard(post.$index,post.row)"
          >删除</el-button>
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
import {draftPosts, discardPost, pubPost} from '@/api/admin/posts'
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
      draftPosts(this.pageNo, this.pageSize).then(res => {
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
      draftPosts(val, this.pageSize).then(res => {
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
    edit (postId) {
      this.$router.push({
        path: '/admin/post/editPost',
        query: {
          postId: postId
        }
      })
    },
    discard (index, row) {
      if (row.status === -1) {
        this.$message({
          message: '已在垃圾箱中无需重复删除！',
          type: 'error'
        })
      }
      this.$confirm('确认删除标题为：' + row.title + '的文章？')
        .then(_ => {
          discardPost(row.postId).then(res => {
            if (res.data.code === '200') {
              this.$message({
                message: res.data.message,
                type: 'success'
              })
              row.status = -1
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
        })
        .catch(_ => {})
    },
    pub (row) {
      if (row.status === 1) {
        this.$message({
          message: '已发布，无需重新发布！',
          type: 'error'
        })
        return
      }
      pubPost(row.postId).then(res => {
        if (res.data.code === '200') {
          this.$message({
            message: res.data.message,
            type: 'success'
          })
          row.status = 1
          row.publicDate = res.data.data.publicDate
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
  margin: 10px;
}
.el-pagination {
  margin: 10px;
}
</style>

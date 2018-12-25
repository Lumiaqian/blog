<!-- 文章管理页面 -->
<template>
 <div>
    <div class="form">
       <p>标题：</p>
       <div class="title">
        <el-input v-model="title" size="medium" placeholder="请输入文章标题" clearable/>
       </div>
       <p>分类：</p>
        <el-cascader
        expand-trigger="hover"
        :options="cates"
        v-model="selectedCate"
        change-on-select
        @change="handleCateChange"
        clearable>
        </el-cascader>
        <p>标签：</p>
        <el-select
        v-model="selectedTag"
        size="medium"
        multiple
        filterable
        allow-create
        default-first-option
        placeholder="请选择文章标签">
        <el-option
        v-for="item in tags"
        :key=item.tagId
        :label=item.tagName
        :value=item.tagName>
        </el-option>
        </el-select>
        <el-button icon="el-icon-search" type="primary" size="mini" circle @click="search"></el-button>
     </div>
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
          @click="discard(post.row)"
          >删除</el-button>
          <el-button v-if="post.row.status != 0"
          size="mini"
          type="warning"
          @click="draft(post.row)"
          >草稿
          </el-button>
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
import {posts, discardPost, pubPost, draftPost, postList} from '@/api/admin/posts'
import {getCategories} from '@/api/admin/categories'
import {getTags} from '@/api/admin/tags'
import {formatDate} from '@/utils/date.js'
export default {
  data () {
    return {
      pageNo: 1,
      pageSize: 10,
      pageTotal: 20,
      posts: [],
      loading: true,
      title: '',
      cates: [],
      selectedCate: [],
      tags: [],
      selectedTag: []
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
    this.getCayegoryList()
    this.getTagList()
    this.getPosts()
  },

  mounted () {},

  methods: {
    getCayegoryList () {
      getCategories().then(res => {
        this.cates = res.data.data
      })
    },
    handleCateChange () {
      // console.log(this.selectedCate)
    },
    getTagList () {
      getTags().then(res => {
        this.tags = res.data.data
        // console.log(this.tags)
      })
    },
    getPosts () {
      this.loading = true
      posts(this.pageNo, this.pageSize).then(res => {
        let posts = res.data.data.list
        this.posts = posts
        this.pageTotal = res.data.data.total
        this.loading = false
      })
    },
    search () {
      this.loading = true
      let data = this.packData(this.pageNo, this.pageSize)
      postList(data).then(res => {
        let posts = res.data.data.list
        this.posts = posts
        this.pageTotal = res.data.data.total
        this.loading = false
      })
    },
    handleSelectionChange () {
      console.log('多选！')
    },
    packData (pageNo, pageSize) {
      let cate = {
        categoryId: null
      }
      let tag = {
        tagName: null
      }
      let categories = new Array(this.selectedCate.length)
      let tags = new Array(this.selectedTag.length)
      for (let i = 0; i < this.selectedCate.length; i++) {
        cate.categoryId = this.selectedCate[i]
        categories[i] = cate
      }
      for (let i = 0; i < this.selectedTag.length; i++) {
        tag.tagName = this.selectedTag[i]
        console.log(tag.tagName)
        tags[i] = tag
      }
      console.log(this.selectedTag)
      console.log('选择的：' + categories + tags)
      let data = {
        title: this.title,
        tags: tags,
        categories: categories,
        pageNo: pageNo,
        pageSize: pageSize
      }
      return data
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.loading = true
      if (this.title !== '' || this.selectedTag.length !== 0 || this.selectedCate.length !== 0) {
        console.log(this.title + this.selectedTag + this.selectedCate)
        console.log('搜索')
        let data = this.packData(val, this.pageSize)
        postList(data).then(res => {
          let posts = res.data.data.list
          this.posts = posts
          this.pageTotal = res.data.data.total
          this.loading = false
        })
      } else {
        posts(val, this.pageSize).then(res => {
          this.posts = res.data.data.list
          this.pageNo = res.data.data.pageNum
          this.pageSize = res.data.data.pageSize
          this.pageTotal = res.data.data.total
          this.loading = false
        // console.log(this.content)
        // formatDate()
        })
      }
    },
    edit (postId) {
      this.$router.push({
        path: '/admin/post/editPost',
        query: {
          postId: postId
        }
      })
    },
    discard (row) {
      if (row.status === -1) {
        this.$message({
          message: '已在垃圾箱中无需重复删除！',
          type: 'error'
        })
        return
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
    },
    draft (row) {
      draftPost(row.postId).then(res => {
        if (res.data.code === '200') {
          this.$message({
            message: res.data.message,
            type: 'success'
          })
          row.status = 0
          row.editDate = res.data.data.editDate
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
<style scoped rel="stylesheet/scss" lang="scss">
.el-pagination {
  margin: 1%;
  margin-left: 3%;
}
.form {
    //position: fixed;
    display: flex;
    flex-direction: row;
    //justify-content: space-between;
    align-items: center;
    margin: 1%;
    // width: 10%;
    margin-left: 25%;
}
.el-button {
    margin: 1%;
}
.table {
  margin-left: 3%;
}
</style>

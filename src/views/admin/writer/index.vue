<!-- 写文章 -->
<template>
 <div class="main-wrapper">
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
        <el-button type="primary" size="mini" round @click="save">保存</el-button>
        <el-button type="primary" size="mini" round @click="pub">发布</el-button>
    </div>
    <div>
        <mavon-editor class="md" v-model="content" />
    </div>
 </div>
</template>

<script>
import {getCategories} from '@/api/admin/categories'
import {getTags} from '@/api/admin/tags'
import {save, pub} from '@/api/admin/posts'
import {getNow} from '@/utils/date'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      title: '',
      content: '',
      cates: [],
      selectedCate: [],
      tags: [],
      selectedTag: []
    }
  },

  components: {},

  computed: {
    ...mapGetters([
      'post'
    ])
  },

  created () {
    this.getCayegoryList()
    this.getTagList()
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
    save () {
      console.log('save')
      console.log(this.selectedCate)
      console.log(this.selectedTag)
      console.log(getNow())
      console.log(this.content)
      if (this.title === '') {
        this.$message({
          message: '标题为空！',
          type: 'warning'
        })
        return
      }
      if (this.content === '') {
        this.$message({
          message: '文章内容为空！',
          type: 'warning'
        })
        return
      }
      let data = {
        postId: '000',
        title: this.title,
        tagList: this.selectedTag,
        cateList: this.selectedCate,
        saveDate: getNow(),
        content: this.content,
        status: 0
      }
      if (this.post.status === 0) { // 已经保存过了的post
        data.postId = this.post.postId
      }
      save(data).then(res => {
        if (res.data.code === '200') {
          console.log('保存成功！')
          let post = {
            status: 0,
            postId: res.data.data
          }
          this.$store.dispatch('setPost', post)
          this.$message({
            message: '保存成功！',
            type: 'success'
          })
        } else {
          this.$message({
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },
    pub () {
      console.log(getNow())
      console.log(this.postStatus)
      if (this.title === '') {
        this.$message({
          message: '标题为空！',
          type: 'warning'
        })
        return
      }
      if (this.content === '') {
        this.$message({
          message: '文章内容为空！',
          type: 'warning'
        })
        return
      }
      let data = {
        postId: '000',
        title: this.title,
        tagList: this.selectedTag,
        cateList: this.selectedCate,
        publicDate: getNow(),
        content: this.content,
        status: 1
      }
      if (this.post.status === 0) { // 已经保存过了的post
        data.postId = this.post.postId
      }
      pub(data).then(res => {
        if (res.data.code === '200') {
          console.log('发布成功！')
          let post = {
            status: 1,
            postId: this.post.postId
          }
          this.$store.dispatch('setPost', post)
          this.$message({
            message: '发布成功！',
            type: 'success'
          })
        } else {
          this.$message({
            message: res.data.message,
            type: 'error'
          })
        }
      })
    }
  }
}

</script>
<style scoped rel="stylesheet/scss" lang="scss">
.main-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
}
.form {
    //position: fixed;
    display: flex;
    flex-direction: row;
    //justify-content: space-between;
    align-items: center;
    margin: 1%;
    // width: 10%;
}
.md {
    margin: 1%;
}
.title {
    // width: 100px;
}
.el-button {
    margin: 1%;
}
.upload-md {
  margin-left: 15%
}
</style>

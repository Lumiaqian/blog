<!--  -->
<template>
  <div v-loading.lock="loading"
         element-loading-text="正在施工"
         element-loading-spinner="el-icon-loading">
       <div class="head">
        <p class="title">{{title}}</p>
        <p class="detail" v-show="publicDate"><svg-icon icon-class="calendar"></svg-icon> 发表 {{publicDate | formatDate}} |
        </p>
        <p class="detail" v-show="editDate"><svg-icon icon-class="calendar"></svg-icon> 更新 {{editDate | formatDate}} |
         <svg-icon icon-class="folder"></svg-icon> 分类
        </p>
        <p class="detail" v-for="cate in categories" :key="cate.categoryId" v-show="categories">{{cate.categoryName}} |</p>
        <p class="detail" v-show="watchCount"><svg-icon icon-class="eye"></svg-icon> 阅读次数 {{watchCount}}</p>
      </div>
      <m-d-preview :contents="content" class="content"></m-d-preview>
      <div class="tags" >
          <p v-for="tag in tags" :key="tag.tagId" size="medium" class="tag">
            <el-button size="mini" type="success" round @click="toTag(tag)">#{{tag.tagName}}</el-button>
          </p>
      </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import MDPreview from '@/components/MDPreview'
import {post} from '@/api/posts'
import {markdown} from '@/utils/markdown'
export default {
  data () {
    return {
      content: '',
      title: '',
      publicDate: null,
      editDate: null,
      tags: [],
      watchCount: null,
      categories: [],
      loading: true
    }
  },

  components: {
    MDPreview
  },

  created () {
    this.getPost()
  },
  computed: {},

  methods: {
    getPost () {
      var postId = this.$route.query.id
      post(postId).then(res => {
        this.content = res.data.data.content
        this.content = markdown(this.content)
        // console.log(this.content)
        this.title = res.data.data.title
        this.tags = res.data.data.tags
        this.categories = res.data.data.categories
        this.publicDate = res.data.data.publicDate
        this.editDate = res.data.data.editDate
        // // this.watchCount = res.date.data.publicDate
        this.watchCount = res.data.data.watchCount
        this.loading = false
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
.content{
  margin-left: 17%;
  width: 80%;
}
.head{
  text-align: center;
  // margin-left: 17%;
  .title {
  font-size:25px;
  padding: 2%;
  }
.detail {
  display: inline-block;
  padding-bottom: 3%;
  font-size: 14px;
  }
}
.tags {
  display: flex;
  flex-direction: row;
  margin-left: 17%;
  padding: 30px 10px;
  .tag{
  margin: 0.5%;
  }
}
</style>

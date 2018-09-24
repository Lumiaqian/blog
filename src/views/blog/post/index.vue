<!-- 博客文章 -->
<template>
 <div>
     <div class="head">
       <p class="title">{{title}}</p>
       <p class="detail"><svg-icon icon-class="calendar"></svg-icon> 发表于 {{publicDate | formatDate}} |
       <svg-icon icon-class="folder"></svg-icon> 分类于
       </p>
       <p class="detail" v-for="index in categories.length" :key="index">{{categories[index-1].categoryName}} |</p>
       <p class="detail"><svg-icon icon-class="eye"></svg-icon> 阅读次数 {{watchCount}}</p>
     </div>
     <div class="content">
        <mavon-editor class="md"
      :value="content"
      :subfield = "prop.subfield"
      :defaultOpen = "prop.defaultOpen"
      :toolbarsFlag = "prop.toolbarsFlag"
      :editable="prop.editable"
      >
      </mavon-editor>
      <p v-for="index in tags.length" :key="index"><el-tag># {{tags[index-1].tagName}}</el-tag></p>
      </div>
 </div>
</template>

<script>
import {post} from '@/api/posts'
import {formatDate} from '@/utils/date.js'
export default {
  data () {
    return {
      content: '## 这里是要展示的markdown文字，也可以通过props传递',
      title: '',
      publicDate: null,
      tags: null,
      watchCount: 1,
      categories: null
    }
  },
  filters: {
    formatDate (time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },

  components: {},

  computed: {
    prop () {
      let data = {
        subfield: false, // 单双栏模式
        defaultOpen: 'preview', // edit： 默认展示编辑区域 ， preview： 默认展示预览区域
        editable: false,
        toolbarsFlag: false,
        scrollStyle: true
      }
      return data
    }
  },

  created () {
    this.getPost()
  },

  mounted () {},

  methods: {
    getPost () {
      var postId = this.$route.query.id
      post(postId).then(res => {
        this.content = res.data.data.content
        // console.log(this.content)
        this.title = res.data.data.title
        this.tags = res.data.data.tags
        this.categories = res.data.data.categories
        this.publicDate = res.data.data.publicDate
        // this.watchCount = res.date.data.publicDate
        this.watchCount = res.data.data.watchCount
      })
    }
  }
}

</script>
<style scoped>
.content{
  padding-left: 20%;
  padding-right: 20%;
}
.head{
  text-align: center
}
.title {
  font-size:25px
}
.detail {
  display: inline-block
}
</style>

<!-- 博客文章 -->
<template>
 <div>
     <div class="content">
        <mavon-editor class="md"
      :value="content"
      :subfield = "prop.subfield"
      :defaultOpen = "prop.defaultOpen"
      :toolbarsFlag = "prop.toolbarsFlag"
      :editable="prop.editable"
      >
      </mavon-editor>
      </div>
 </div>
</template>

<script>
import {post} from '@/api/posts'
export default {
  data () {
    return {
      content: '## 这里是要展示的markdown文字，也可以通过props传递'
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
      var postId = '20180417232035'
      post(postId).then(res => {
        this.content = res.data.result.content
        // console.log(this.content)
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
</style>

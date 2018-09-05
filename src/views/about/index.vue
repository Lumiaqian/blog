<template>
 <div>
     <div class="head">
         <p style="font-size:25px">关于我</p>
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
     </div>
 </div>
</template>

<script>
import {about} from '@/api/about'
export default {
  data () {
    return {
      content: ''
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
    this.getAbout()
  },

  mounted () {},

  methods: {
    getAbout () {
      about().then(res => {
        this.content = res.data.result.content
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
</style>

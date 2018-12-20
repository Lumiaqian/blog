<!--  -->
<template>
 <div>
     <div class="title">
         <p style="font-size:24px">标签</p>
         <p>目前共计{{tags.length | 0}}个标签</p>
     </div>
     <div class="content" v-loading.fullscreen.lock="loading" element-loading-background="rgba(0, 0, 0, 0.8)">
         <tags-cloud v-if="tags.length!=0" :tags="tags"/>
     </div>
 </div>
</template>

<script>
import TagsCloud from '@/components/TagsCloud'
import {getTags} from '@/api/tags'
export default {
  data () {
    return {
      tags: [],
      loading: false
    }
  },

  components: {
    TagsCloud
  },

  computed: {
  },

  created () {
    this.getTagList()
  },

  mounted () {},

  methods: {
    getTagList () {
      this.loading = true
      getTags().then(res => {
        if (res.status !== 200) {
          this.$message.error('服务异常！')
        }
        this.tags = res.data.data
        this.loading = false
        // console.log(this.tags)
      })
    }
  }
}

</script>
<style scoped>
.title {
    text-align: center
}
.content {
    text-align: center
}
</style>

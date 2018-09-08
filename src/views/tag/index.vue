<!--  -->
<template>
 <div>
     <div class="title">
         <p style="font-size:24px">标签</p>
         <p>目前共计{{tags.length}}个标签</p>
     </div>
     <div class="content">
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
      tags: []
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
      getTags().then(res => {
        this.tags = res.data.result
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

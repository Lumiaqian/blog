<!--  -->
<template>
 <div v-loading.lock="loading"
      element-loading-text="正在施工"
      element-loading-spinner="el-icon-loading" class="tags">
     <div class="title">
         <p style="font-size:20px">标签</p>
         <p>目前共计<span v-text="tags.length"/>个标签</p>
     </div>
     <div class="content">
         <tags-cloud v-if="tags.length!=0" :tags="tags" :width="width" :height="height" :RADIUS="RADIUS" />
     </div>
 </div>
</template>

<script>
import TagsCloud from '@/components/TagsCloud'
import {getTags} from '@/api/tags'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      tags: [],
      loading: false,
      width: 400,
      height: 400,
      RADIUS: 160
    }
  },

  components: {
    TagsCloud
  },

  computed: {
    ...mapGetters([
      'screen'
    ])
  },

  created () {
    this.getTagList()
  },

  mounted () {},
  watch: {
    screen (value) {
      if (value.width <= 768) {
        this.width = 250
        this.height = 300
        this.RADIUS = 100
      }
    }
  },

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
    text-align: center;
    /* justify-content: space-between; */
    padding-top: 10%;
}
.tags {
  padding: 10% 10px;
}
</style>

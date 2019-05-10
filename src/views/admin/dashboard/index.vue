<!-- 管理页面 -->
<template>
 <div>
   <data-tab :option="option"></data-tab>
 </div>
</template>

<script>
import DataTab from '@/components/DataTab'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      option: {
        span: 6,
        data: [
          {
            title: '文章统计',
            subtitle: '实时',
            count: this.postCount,
            allcount: this.postAllCount,
            text: '当前文章总记录数',
            color: 'rgb(117, 56, 199)',
            key: '章'
          },
          {
            title: '分类统计',
            subtitle: '实时',
            count: this.cateCount,
            // allcount: 10222,
            text: '当前分类总记录数',
            color: 'rgb(49, 180, 141)',
            key: '类'
          },
          {
            title: '标签统计',
            subtitle: '实时',
            count: this.tagCount,
            // allcount: 10222,
            text: '当前标签总记录数',
            color: 'rgb(56, 161, 242)',
            key: '签'
          },
          {
            title: '评论统计',
            subtitle: '实时',
            count: 908,
            // allcount: 10222,
            text: '评论次数',
            color: 'rgb(59, 103, 164)',
            key: '评'
          }
        ]
      }
    }
  },

  components: {
    DataTab
  },

  computed: {
    ...mapGetters([
      'postCount',
      'tagCount',
      'cateCount',
      'postAllCount',
      'commentCount'
    ])
  },

  created () {
    this.getCount()
  },

  mounted () {},

  methods: {
    getCount () {
      this.$store.dispatch('setCount').then(() => {
        this.option.data[0].count = this.postCount
        this.option.data[0].allcount = this.postAllCount
        this.option.data[1].count = this.cateCount
        this.option.data[2].count = this.tagCount
        this.option.data[3].count = this.commentCount
      })
    }
  }
}

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>

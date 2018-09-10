<!--  -->
<template>
 <div >
    <timeline class="tag" v-loading="loading">
      <timeline-title bg-color="#C1FFC1">{{tag.tagName}}</timeline-title>
      <timeline-item class="item" bg-color="#9dd8e0" v-for="(post,index) in posts" :key="index" @click.native="toPostDetail(post.postId)">
        {{post.publicDate | formatDate}} {{post.title}}
      </timeline-item>
    </timeline>
 </div>
</template>

<script>
import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline'
import {formatDate} from '@/utils/date.js'
import {getPosts} from '@/api/tags'
import Cookies from 'js-cookie'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      tag: {
        tagId: '',
        tagName: ''
      },
      posts: [],
      loading: true
    }
  },

  components: {
    Timeline,
    TimelineItem,
    TimelineTitle
  },

  filters: {
    formatDate (time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd')
    }
  },
  computed: {
    ...mapGetters([
      'Tag'
    ])
  },

  created () {
    this.getPosts()
  },

  mounted () {},

  methods: {
    getPosts () {
      if (this.Tag.tagId === '' || this.Tag.tagName === '') {
        console.log('进入Tag为空')
        let tag = Cookies.getJSON('tag')
        // console.log('Cookies: ' + JSON.stringify(tag))
        this.tag.tagId = tag.tagId
        this.tag.tagName = tag.tagName
      } else {
        this.tag.tagId = this.Tag.tagId
        this.tag.tagName = this.Tag.tagName
      }
      // console.log(JSON.stringify(this.Tag))
      getPosts(this.tag.tagId).then(res => {
        this.posts = res.data.result
        this.loading = false
      })
    },
    toPostDetail (id) {
      this.$router.push({
        path: '/posts',
        query: {
          id: id
        }
      })
    }
  }
}

</script>
<style scoped>
.tag {
 position: absolute;
 top: 25%;
 left: 40%;
}
.item:hover{
  text-decoration:underline;
  cursor:pointer
}
</style>

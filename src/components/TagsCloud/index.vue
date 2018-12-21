<!--  -->
<template>
 <div >
     <svg :width='width' :height='height' @mousemove='listener($event)'>
        <a @click="toTagDetail(tag.text,tag.id)" v-for='(tag,index) in tagList' :key="index" class="detail">
            <text :x='tag.x' :y='tag.y' :font-size='20 * (600/(600-tag.z))' :fill-opacity='((400+tag.z)/600)' v-text="tag.text"></text>
        </a>
    </svg>
 </div>
</template>

<script>
export default {
  name: 'TagCloud',
  props: {
    tags: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    },
    tagsNum: {
      type: Number,
      default: 10
    }
  },
  data: function () {
    return {
      width: 600,
      height: 600,
      RADIUS: 200,
      speedX: Math.PI / 360,
      speedY: Math.PI / 360,
      tagList: []
    }
  },
  computed: {
    CX () {
      return this.width / 2
    },
    CY () {
      return this.height / 2
    }
  },
  created () { // 初始化标签位置
    let tags = this.tags
    let tagList = []
    //  console.log('tagsLength' + tags.length)
    if (tags.length === 0) {
      for (let i = 0; i < this.tagsNum; i++) {
        let tag = {}
        let k = -1 + (2 * (i + 1) - 1) / this.tagsNum
        let a = Math.acos(k)
        let b = a * Math.sqrt(this.tagsNum * Math.PI)
        tag.text = i + 'tag'
        tag.x = this.CX + this.RADIUS * Math.sin(a) * Math.cos(b)
        tag.y = this.CY + this.RADIUS * Math.sin(a) * Math.sin(b)
        tag.z = this.RADIUS * Math.cos(a)
        tag.id = 1
        tagList.push(tag)
        // console.log('k:' + k + 'a:' + a + 'b:' + b)
      }
    } else {
      for (let i = 0; i < tags.length; i++) {
        let tag = {}
        let k = -1 + (2 * (i + 1) - 1) / tags.length
        let a = Math.acos(k)
        let b = a * Math.sqrt(tags.length * Math.PI)
        // console.log('k:' + k + 'a:' + a + 'b:' + b)
        tag.text = tags[i].tagName
        tag.x = this.CX + this.RADIUS * Math.sin(a) * Math.cos(b)
        tag.y = this.CY + this.RADIUS * Math.sin(a) * Math.sin(b)
        tag.z = this.RADIUS * Math.cos(a)
        tag.id = tags[i].tagId
        tagList.push(tag)
      }
    }
    this.tagList = tagList
  },
  mounted () { // 使球开始旋转
    setInterval(() => {
      this.rotateX(this.speedX)
      this.rotateY(this.speedY)
    }, 17)
  },
  methods: {
    rotateX (angleX) {
      var cos = Math.cos(angleX)
      var sin = Math.sin(angleX)
      for (let tag of this.tagList) {
        var y1 = (tag.y - this.CY) * cos - tag.z * sin + this.CY
        var z1 = tag.z * cos + (tag.y - this.CY) * sin
        tag.y = y1
        tag.z = z1
      }
    },
    rotateY (angleY) {
      var cos = Math.cos(angleY)
      var sin = Math.sin(angleY)
      for (let tag of this.tagList) {
        var x1 = (tag.x - this.CX) * cos - tag.z * sin + this.CX
        var z1 = tag.z * cos + (tag.x - this.CX) * sin
        tag.x = x1
        tag.z = z1
      }
    },
    listener (event) { // 响应鼠标移动
      var x = event.clientX - this.CX
      var y = event.clientY - this.CY
      this.speedX = x * 0.0001 > 0 ? Math.min(this.RADIUS * 0.00002, x * 0.0001) : Math.max(-this.RADIUS * 0.00002, x * 0.0001)
      this.speedY = y * 0.0001 > 0 ? Math.min(this.RADIUS * 0.00002, y * 0.0001) : Math.max(-this.RADIUS * 0.00002, y * 0.0001)
    },
    toTagDetail (tagName, tagId) {
      // console.log(tagName, tagId)
      let tag = {
        tagId: tagId,
        tagName: tagName
      }
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
<style scoped>
.detail:hover{
  text-decoration:underline;
  cursor:pointer
}
</style>

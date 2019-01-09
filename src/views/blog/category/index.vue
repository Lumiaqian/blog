<!--  -->
<template>
 <div class="categories" v-loading.lock="loading"
      element-loading-text="正在施工"
      element-loading-spinner="el-icon-loading">
     <div class="title">
         <p style="font-size:24px">分类</p>
         <p style="padding: 20px 10px">目前共计<span v-text="categories.length"/>个分类</p>
     </div>
     <timeline>
       <div v-if="parentCate.length>0">
         <div v-for="cate in parentCate" :key="cate.categoryId">
             <timeline-title class="item" bg-color="#C1FFC1" @click.native="toCateDetail(cate)">
                {{cate.categoryName}}({{cate.count}})
             </timeline-title>
             <div v-for="child in childrenCate" :key="child.categoryId">
             <timeline-item class="item" bg-color="#9dd8e0" v-if="cate.categoryId===child.fatherId"  @click.native="toCateDetail(child)">
                 {{child.categoryName}}({{child.count}})
             </timeline-item>
             </div>
         </div>
       </div>
       <div v-else>
         <div v-for="child in childrenCate" :key="child.categoryId">
             <timeline-item class="item" bg-color="#9dd8e0"  @click.native="toCateDetail(child)">
                 {{child.categoryName}}({{child.count}})
             </timeline-item>
        </div>
       </div>
     </timeline>
     <el-pagination
          background
          @current-change="handleCurrentChange"
          layout="total, prev, pager, next"
          :page-size=pageSize
          :total=pageTotal
          v-show="categories.length!=0">
    </el-pagination>
 </div>
</template>

<script>
import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline'
import {getCategories} from '@/api/categories'
export default {
  data () {
    return {
      categories: [],
      parentCate: [],
      childrenCate: [],
      loading: true,
      pageNo: 1,
      pageSize: 10,
      pageTotal: 0
    }
  },

  components: {
    Timeline,
    TimelineItem,
    TimelineTitle
  },

  computed: {},

  created () {
    this.getCayegoryList(this.pageNo, this.pageSize)
  },

  mounted () {},

  methods: {
    getCayegoryList (pageNo, pageSize) {
      getCategories(pageNo, pageSize).then(res => {
        this.categories = res.data.data.list
        this.pageNo = res.data.data.pageNum
        this.pageSize = res.data.data.pageSize
        this.pageTotal = res.data.data.total
        this.parentCate = []
        this.childrenCate = []
        for (let i = 0; i < this.categories.length; i++) {
          if (this.categories[i].fatherId === '-1') {
            // console.log('parent' + this.categories[i])
            this.parentCate.push(this.categories[i])
          } else {
            this.childrenCate.push(this.categories[i])
          }
        }
        this.parentCate = this.bouncer(this.parentCate)
        this.childrenCate = this.bouncer(this.childrenCate)
        // console.log('categories: ' + this.categories)
        console.log('parent: ' + this.parentCate.length)
        console.log('child: ' + this.childrenCate.length)
        this.loading = false
      })
    },
    bouncer (arr) {
      // Don't show a false ID to this bouncer.
      return arr.filter(function (val) {
        return !(!val || val === '')
      })
    },
    toCateDetail (cate) {
      this.$store.dispatch('setCategory', cate).then(() => {
        this.$router.push({
          path: '/categories/category',
          query: {
            id: cate.categoryId
          }
        })
      })
    },
    handleCurrentChange (val) {
      this.getCayegoryList(val, this.pageSize)
    }
  }
}

</script>
<style scoped>
.title {
    text-align: center;
}
.categories {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10% 10px;
}
.item:hover{
  text-decoration:underline;
  cursor:pointer
}
.el-pagination{
  margin: 5%;
}
</style>

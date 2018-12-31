<!-- 七牛云图片管理 -->
<template>
 <div class="main-wrapper">
   <div class="main">
     <el-upload
      class="upload-md"
      action="http://39.108.115.109:8080/qiniu/images"
      :on-change="handleChange"
      :file-list="fileList"
      :on-error="handleError"
      :on-success="handleSuccess"
      :before-upload="beforeAvatarUpload"
      drag
      multiple
      :headers="myHeader"
      >
        <i class="el-icon-upload"/>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件</div>
     </el-upload>
     <div class="table">
       <el-table
       :data="qiniu_images"
       highlight-current-row
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
       <el-table-column
         prop="id"
         label="ID"
         width="200">
       </el-table-column>
       <el-table-column
         prop="name"
         label="名称"
         width="200">
       </el-table-column>
       <el-table-column
         prop="url"
         label="外链地址"
         width="200">
       </el-table-column>
       <el-table-column
         label="图片"
         width="60">
        <template slot-scope="scope">
          <img
          v-if="scope.row.url"
          :src="scope.row.url"
          style="width: 100%;height: 20px; cursor: pointer"
          @click="showImgViewer"
          >
          <div class="hidden viewer-box" v-viewer="{url: 'data-large', navbar: false, movable: false}">
            <img :data-large="scope.row.url" alt="">
          </div>
        </template>
       </el-table-column>
     </el-table>
     <el-pagination
    background
    @current-change="handleCurrentChange"
    layout="total, prev, pager, next"
    :page-size=pageSize
    :total=pageTotal>
  </el-pagination>
     </div>
   </div>
 </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { getToken, setToken, removeToken } from '@/utils/auth'
import { mapGetters } from 'vuex'
// eslint-disable-next-line no-unused-vars
import { getImages } from '@/api/admin/qiniu'
export default {
  data () {
    return {
      files: this.fileList,
      qiniu_images: [],
      pageNo: 1,
      pageSize: 10,
      pageTotal: 0,
      loading: false
    }
  },

  components: {},

  computed: {
    myHeader () {
      return {
        'Authorization': getToken()
      }
    },
    ...mapGetters([
      'fileList'
    ])
  },

  created () {
    this.getImages(this.pageNo, this.pageSize)
  },

  mounted () {},

  methods: {
    handleChange (file) {

    },
    // eslint-disable-next-line handle-callback-err
    handleError (err, file, fileList) {
      // console.log(JSON.stringify(err))
      this.$message({
        message: file.name + '上传失败！',
        type: 'error'
      })
      this.fileList = fileList
    },
    handleSuccess (response, file, fileList) {
      // console.log(JSON.stringify(file))
      // console.log(getToken())
      this.$message({
        message: file.name + '上传成功！',
        type: 'success'
      })
      this.$store.dispatch('setFileList', fileList)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 20
      console.log('isJPG' + isJPG)
      console.log('isPNG' + isPNG)
      if (!isJPG && !isPNG) {
        this.$message.error('上传图片只能是 JPG 或 PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 20MB!')
      }
      return isJPG && isLt2M
    },
    getImages (pageNo, pageSize) {
      this.loading = true
      getImages(pageNo, pageSize).then(res => {
        if (res.data.code === '200') {
          this.qiniu_images = res.data.data.list
          this.pageNo = res.data.data.pageNum
          this.pageSize = res.data.data.pageSize
          this.pageTotal = res.data.data.total
        }
        this.loading = false
      })
    },
    handleCurrentChange (val) {
      this.getImages(val, this.pageSize)
    },
    // 点击"图片图标"显示大图
    showImgViewer (e) {
      let event = e || window.event
      this.$nextTick(() => {
        // eslint-disable-next-line one-var
        let target = event.currentTarget || event.target.parentElement,
          parent = target.parentElement

        let viewer = parent.querySelector('.viewer-box').$viewer
        viewer.show()
      })
    }

  }
}

</script>
<style scoped rel="stylesheet/scss" lang="scss">
.main-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}
.main{
  display: flex;
  flex-direction: row;
  align-items: center;
}
.upload-md {
  width: 20%;
  margin-top: 8%;
  margin-left: 5%;
}
.el-table {
  //flex:0 0 auto;
  width: 50%;
  //margin-left: 15%;
}
.table {
  flex:0 0 auto;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: left;
  margin-left: 10%;
}
</style>

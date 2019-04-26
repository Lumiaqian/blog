<!--  -->
<template>
 <div class="main-wrapper">
   <div class="top">
   </div>
   <el-upload
      class="upload-md"
      action="https://blog.caoyuqian.cn/api/upload"
      :on-change="handleChange"
      :file-list="files"
      :on-error="handleError"
      :on-success="handleSuccess"
      drag
      multiple
      :headers="myHeader"
      >
        <i class="el-icon-upload"/>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">上传Markdown格式的文章</div>
        <!-- <el-tooltip effect="dark" content="上传文章" placement="top">
          <el-button size="small" type="primary" round>点击上传</el-button>
        </el-tooltip> -->
   </el-upload>
 </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { getToken, setToken, removeToken } from '@/utils/auth'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      files: this.fileList
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

  created () {},

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
.top{
  display: flex;
  flex-direction: row;
  align-items: center;
}
.upload-md {
  width: 25%;
  margin-top: 5%;
  margin-left: 25%;
}
</style>

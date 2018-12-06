<!--  -->
<template>
 <div class="main-wrapper">
   <div class="top">
   </div>
   <el-upload
      class="upload-md"
      action="http://localhost:8080/upload"
      :on-change="handleChange"
      :file-list="fileList"
      :on-error="handleError"
      :on-success="handleSuccess"
      drag
      multiple
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
export default {
  data () {
    return {
      fileList: []
    }
  },

  components: {},

  computed: {},

  created () {},

  mounted () {},

  methods: {
    handleChange (file) {

    },
    // eslint-disable-next-line handle-callback-err
    handleError (err, file, fileList) {
      console.log(JSON.stringify(file))
      this.$message({
        message: file.name + '上传失败！',
        type: 'error'
      })
    },
    handleSuccess (response, file, fileList) {
      console.log(JSON.stringify(file))
      this.$message({
        message: file.name + '上传成功！',
        type: 'success'
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

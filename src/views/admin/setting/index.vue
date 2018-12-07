<!-- 网站基本配置 -->
<template>
 <div class="main_wrapper">
   <div class="main">
    <div class="avatar">
       <p>头像：</p>
       <pan-thumb :image=image v-if="image!=''"></pan-thumb>
       <el-button type="primary" round class="setAvatar" @click="toggleShow">设置头像</el-button>
       <my-upload field="img"
        @crop-success="cropSuccess"
        @crop-upload-success="cropUploadSuccess"
        @crop-upload-fail="cropUploadFail"
        v-model="show"
        :width="300"
        :height="300"
        url="http://localhost:8080/avatar"
        :headers="myHeader"
        :params="myParam"
        img-format="png"></my-upload>
    </div>
   </div>
 </div>
</template>

<script>
import PanThumb from '@/components/PanThumb'
// eslint-disable-next-line no-unused-vars
import { getToken, setToken, removeToken, getUserId } from '@/utils/auth'
// eslint-disable-next-line no-unused-vars
import { mapGetters } from 'vuex'
import myUpload from 'vue-image-crop-upload'
export default {
  data () {
    return {
      image: '',
      show: false,
      params: {
        id: this.userId
      }
    }
  },

  components: {
    PanThumb,
    'my-upload': myUpload},

  computed: {
    myHeader () {
      return {
        'Authorization': getToken()
      }
    },
    myParam () {
      return {
        userId: getUserId()
      }
    }
  },
  created () {},

  mounted () {},

  methods: {
    toggleShow () {
      this.show = !this.show
    },

    cropSuccess (imgDataUrl, field) {
      console.log('-------- crop success --------')
      this.image = imgDataUrl
    },

    cropUploadSuccess (jsonData, field) {
      console.log('-------- upload success --------')
      console.log(jsonData)
      console.log('field: ' + field)
    },

    cropUploadFail (status, field) {
      console.log('-------- upload fail --------')
      console.log(status)
      console.log('field: ' + field)
    }
  }
}

</script>
<style el="stylesheet/scss" lang="scss">
.main-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}
.main {
  display: flex;
  flex-direction: column;
  //align-items: center;
}
.avatar {
  display: flex;
  flex-direction: row;
  margin: 5%;
  margin-left: 25%;
}
.setAvatar{
  margin-left: 5%;
}
</style>

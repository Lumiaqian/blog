<!-- 网站基本配置 -->
<template>
 <div class="main_wrapper">
   <div class="main">
    <div class="avatar">
       <p>{{$t('setting.avatar')}}</p>
       <pan-thumb :image=image v-if="image!=''" class="image"></pan-thumb>
       <el-button type="primary" round class="setAvatar" @click="toggleShow" size="medium">设置头像</el-button>
       <my-upload field="img"
        @crop-success="cropSuccess"
        @crop-upload-success="cropUploadSuccess"
        @crop-upload-fail="cropUploadFail"
        v-model="show"
        :width="150"
        :height="150"
        url="http://localhost:8080/avatar"
        :headers="myHeader"
        :params="myParam"
        img-format="png"></my-upload>
    </div>
    <div class="motto">
      <p>{{$t('setting.motto')}}</p>
      <el-input
      class="mottoInput"
      placeholder="请输入内容"
      v-model="myMotto"
      clearable>
      </el-input>
      <el-button type="primary" round class="setMotto" size="medium" @click="setMotto">设置格言</el-button>
    </div>
    <div class="introduction">
      <p>{{$t('setting.introduction')}}</p>
      <el-input
      class="introductionInput"
      type="textarea"
      placeholder="请输入内容"
      v-model="myIntroduction"
      clearable>
      </el-input>
      <el-button type="primary" round class="setIntroduction" size="medium" @click="setIntroduction">设置简介</el-button>
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
// eslint-disable-next-line no-unused-vars
import {updateSetting} from '@/api/admin/setting'
export default {
  data () {
    return {
      image: '',
      show: false,
      myMotto: '',
      myIntroduction: ''
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
    },
    ...mapGetters([
      'avatar',
      'motto',
      'introduction'
    ])
  },
  created () {
    this.image = this.avatar
    this.myMotto = this.motto
    this.myIntroduction = this.introduction
  },

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
      this.$store.dispatch('setSetting', jsonData.data)
      console.log('field: ' + field)
    },

    cropUploadFail (status, field) {
      console.log('-------- upload fail --------')
      console.log(status)
      console.log('field: ' + field)
    },
    setMotto () {
      let data = {
        motto: this.myMotto,
        userId: getUserId()
      }
      updateSetting(data).then(res => {
        if (res.data.code === '200') {
          this.$message({
            message: res.data.message,
            type: 'success'
          })
        }
      })
    },
    setIntroduction () {
      let data = {
        introduction: this.myIntroduction,
        userId: getUserId()
      }
      updateSetting(data).then(res => {
        if (res.data.code === '200') {
          this.$message({
            message: res.data.message,
            type: 'success'
          })
        }
      })
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
.avatar,.motto,.introduction {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 1%;
  margin-left: 25%;
}
.image{
  margin-left: 5%;
}
.setAvatar{
  margin-left: 5%;
}
.mottoInput,.introductionInput {
  width: 200px;
  margin-left: 1%
}
.setMotto,.setIntroduction {
  margin-left: 5%;
}
</style>

<!-- 网站基本配置 -->
<template>
 <div class="main_wrapper">
   <div class="main">
    <div class="avatar">
       <p>{{$t('setting.avatar')}}</p>
       <pan-thumb :image=image v-if="image!=''" width='100px' height='100px' class="image"></pan-thumb>
       <el-button type="text" class="setAvatar" @click="toggleShow" size="medium">设置{{$t('setting.avatar')}}</el-button>
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
    <div class="blogName">
      <p>{{$t('setting.blogName')}}</p>
      <el-input
      class="blogNameInput"
      placeholder="请输入内容"
      v-model="myBlogName"
      clearable>
      </el-input>
      <el-button type="text"  class="setBlogName" size="medium" @click="setBlogName">设置{{$t('setting.blogName')}}</el-button>
    </div>
    <div class="motto">
      <p>{{$t('setting.motto')}}</p>
      <el-input
      class="mottoInput"
      placeholder="请输入内容"
      v-model="myMotto"
      clearable>
      </el-input>
      <el-button type="text"  class="setMotto" size="medium" @click="setMotto">设置{{$t('setting.motto')}}</el-button>
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
      <el-button type="text"  class="setIntroduction" size="medium" @click="setIntroduction">设置{{$t('setting.introduction')}}</el-button>
    </div>
    <div class="weibo">
      <p>{{$t('setting.weibo')}}</p>
      <el-input
      class="weiboInput"
      type="url"
      placeholder="请输入内容"
      v-model="myWeibo"
      clearable>
      </el-input>
      <el-button type="text"  class="setSocial" size="medium" @click="setSocial('weibo')">设置{{$t('setting.weibo')}}</el-button>
    </div>
    <div class="QQ">
      <p>{{$t('setting.QQ')}}</p>
      <el-input
      class="QQInput"
      placeholder="请输入内容"
      v-model="myQQ"
      clearable>
      </el-input>
      <el-button type="text"  class="setSocial" size="medium" @click="setSocial('QQ')">设置{{$t('setting.QQ')}}</el-button>
    </div>
    <div class="github">
      <p>{{$t('setting.github')}}</p>
      <el-input
      class="githubInput"
      type="url"
      placeholder="请输入内容"
      v-model="myGithub"
      clearable>
      </el-input>
      <el-button type="text"  class="setSocial" size="medium" @click="setSocial('github')">设置{{$t('setting.github')}}</el-button>
    </div>
    <div class="email">
      <p>{{$t('setting.email')}}</p>
      <el-input
      class="emailInput"
      type="email"
      placeholder="请输入内容"
      v-model="myEmail"
      clearable>
      </el-input>
      <el-button type="text"  class="setSocial" size="medium" @click="setSocial('email')">设置{{$t('setting.email')}}</el-button>
    </div>
    <div class="footer">
      <p>©年份</p>
      <el-date-picker
      class="year"
      v-model="start"
      type="year"
      placeholder="选择开始年份"
      format="yyyy"
      value-format="yyyy"
      >
      </el-date-picker>
      <span>——</span>
      <el-date-picker
      v-model="end"
      type="year"
      placeholder="选择结束年份"
      format="yyyy"
      value-format="yyyy"
      >
      </el-date-picker>
      <el-button type="text"  class="setDate" size="medium" @click="setDate()">设置©</el-button>
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
import {updateSetting, updateSocial} from '@/api/admin/setting'
export default {
  data () {
    return {
      image: '',
      show: false,
      myMotto: '',
      myIntroduction: '',
      myWeibo: '',
      myQQ: '',
      myGithub: '',
      myEmail: '',
      myBlogName: '',
      start: '',
      end: ''
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
      'introduction',
      'weibo',
      'QQ',
      'github',
      'email',
      'blogName',
      'startYear',
      'endYear'
    ])
  },
  created () {
    this.image = this.avatar
    this.myMotto = this.motto
    this.myIntroduction = this.introduction
    this.myWeibo = this.weibo
    this.myGithub = this.github
    this.myQQ = this.QQ
    this.myEmail = this.email
    this.myBlogName = this.blogName
    this.start = this.startYear
    this.end = this.endYear
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
    },
    setBlogName () {
      let data = {
        blogName: this.myBlogName,
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
    setDate () {
      let data = {
        userId: getUserId(),
        startYear: this.start,
        endYear: this.end
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
    setSocial (data) {
      let user = {
      }
      if (data === 'weibo') {
        user = {
          weibo: this.myWeibo,
          userId: getUserId()
        }
      } else if (data === 'QQ') {
        user = {
          QQ: this.myQQ,
          userId: getUserId()
        }
      } else if (data === 'github') {
        user = {
          github: this.myGithub,
          userId: getUserId()
        }
      } else if (data === 'email') {
        user = {
          email: this.myEmail,
          userId: getUserId()
        }
      }
      console.log(user)
      updateSocial(user).then(res => {
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
.avatar,.motto,.introduction,.weibo,.QQ,.github,.email,.blogName,.footer {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 1%;
  margin-left: 25%;
}
.image{
  margin-left: 6%;
}
.setAvatar{
  margin-left: 15%;
}
.mottoInput,.introductionInput,.weiboInput,.QQInput,.emailInput {
  width: 200px;
  margin-left: 6%
}
.year {
  margin-left: 1%;
}
.blogNameInput {
  width: 200px;
  margin-left: 3%
}
.githubInput {
  width: 200px;
  margin-left: 5%
}
.setMotto,.setIntroduction {
  margin-left: 5%;
}
.setBlogName {
  margin-left: 5%;
}
.setSocial {
  margin-left: 5%;
}
.setDate {
  margin-left: 1%;
}
</style>

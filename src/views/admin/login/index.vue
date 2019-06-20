<!-- 登录界面 -->
<template>
 <div class="login">
    <div class="login-wrap">
      <h1 class="login-title">博客系统-后台管理</h1>
       <div class="login-form-wrap">
          <el-form ref="loginForm" status-icon :rules="rules" :model="userInfo" label-width="80px">
            <el-form-item label="账号" prop="username">
              <el-input v-model="userInfo.username" clearable></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="userInfo.password" type="password" clearable show-password></el-input>
              <el-button type="text" size="mini" >忘记密码？</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="userLogin(userInfo)" :loading="loading">登录</el-button>
            </el-form-item>
        </el-form>
       </div>
    </div>
 </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    var checkUsernId = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入账号'))
      }
      setTimeout(() => {
        callback()
      }, 1000)
    }
    var vaildatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      userInfo: {
        username: '',
        password: ''
      },
      loading: false,
      rules: {
        username: [
          {validator: checkUsernId, trigger: 'blur'}
        ],
        password: [
          {validator: vaildatePass, trigger: 'blur'}
        ]
      }
    }
  },

  components: {},

  computed: {
    ...mapGetters([
      'Common'
    ])
  },

  created () {
    this.setAdmin()
  },

  mounted () {},

  methods: {
    setAdmin () {
      this.$store.dispatch('isAdminWrap', true)
    },
    userLogin () {
      // console.log('进入登录函数')
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('LoginByUsername', this.userInfo).then(() => {
            this.loading = false
            this.$store.dispatch('setUserName', this.userInfo.username)
            this.$router.push({ path: '/admin/index' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}

</script>
<style scoped>
.login{
 position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 2000;
  /* opacity:0.7; */
  background-position: center;
  background-size: cover;
  background-image: url('http://image.caoyuqian.cn/6484f3e381bbe654a8b4adfa48da6bc6.jpg');
}
.login-title {
  font-size: 20px;
  color: #262a30;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 30px;
}
.login-wrap{
    position: relative;
    background-color: #ffffff;
    opacity:0.8;
    padding: 20px;
    border-radius: 10px;
    max-width: 460px;
    margin: 20px auto;;
    line-height: 1;
    top: 50%;
    transform: translateY(-50%);
}
.login-form-wrap{
  margin: 0px auto;
}
</style>

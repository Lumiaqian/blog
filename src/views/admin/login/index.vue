<!-- 登录界面 -->
<template>
 <div class="login">
    <el-card class="box-card" >
        <div slot="header" class="clearfix">
            <span>登录</span>
        </div>
        <el-form ref="loginForm" status-icon :rules="rules" :model="userInfo" label-width="80px">
            <el-form-item label="账号" prop="username">
              <el-input v-model="userInfo.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="userInfo.password" type="password"></el-input>
              <el-button type="text" size="mini" >忘记密码？</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="userLogin(userInfo)" :loading="loading">登录</el-button>
            </el-form-item>
        </el-form>
    </el-card>
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
    userLogin (userInfo) {
      console.log('进入登录函数')
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('LoginByUsername', this.userInfo).then(() => {
            this.loading = false
            this.$store.dispatch('setUserName', this.userInfo.username)
            this.$router.push({ path: '/admin' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
      // if (userInfo.username !== '' && userInfo.password !== '') {
      //   login(userInfo).then(res => {
      //     this.$message({
      //       showClose: true,
      //       message: res.data.message,
      //       type: 'success'
      //     })
      //   })
      // } else {
      //   console.log('用户名密码为空')
      //   this.$message({
      //     showClose: true,
      //     message: '用户名密码为空',
      //     type: 'error'
      //   })
      // }
    }
  }
}

</script>
<style scoped>
.login{
  position: relative;
  z-index: 2000;
  width: 100%;
  top: 30%;
  left: 35%;
  /* right: 50%;
  bottom: 50%; */
}
.box-card{
  position: relative;
  width: 30%;
}
</style>

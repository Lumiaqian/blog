import { loginByUsername, logout, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken, setUserId } from '@/utils/auth'

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    username: '',
    motto: '',
    weibo: '',
    QQ: '',
    github: '',
    email: '',
    blogName: ''
  },

  mutations: {
    SET_USERNAME: (state, username) => {
      state.username = username
      localStorage.setItem('username', username)
    },
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_MOTTO: (state, motto) => {
      state.motto = motto
    },
    SET_WEIBO: (state, weibo) => {
      state.weibo = weibo
    },
    SET_QQ: (state, QQ) => {
      state.QQ = QQ
    },
    SET_GITHUB: (state, github) => {
      state.github = github
    },
    SET_EMAIL: (state, email) => {
      state.email = email
    },
    SET_BLOGNAME: (state, blogName) => {
      state.blogName = blogName
    }
  },

  actions: {
    // 存储username
    setUserName ({ commit }, username) {
      commit('SET_USERNAME', username)
    },
    // 用户名登录
    LoginByUsername ({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password).then(response => {
          // const data = response.data
          const headers = response.headers
          console.log(JSON.stringify(headers))
          commit('SET_TOKEN', headers.authorization)
          setToken(headers.authorization)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        let username = ''
        if (state.username === null || state.username === '') {
          username = localStorage.getItem('username')
        } else {
          username = state.username
        }
        getUserInfo(username).then(response => {
          if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
            // eslint-disable-next-line prefer-promise-reject-errors
            reject('error')
          }
          const data = response.data.data
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            let temp = data.roles
            console.log(temp)
            let roles = new Array(temp.length)
            for (let i = 0; i < temp.length; i++) {
              roles[i] = temp[i].roleName.toLowerCase()
            }
            console.log(roles)
            commit('SET_ROLES', roles)
          } else {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject('getInfo: roles must be a non-null array !')
          }

          commit('SET_NAME', data.userName)
          commit('SET_USERNAME', data.userId)
          commit('SET_QQ', data.QQ)
          commit('SET_WEIBO', data.weibo)
          commit('SET_GITHUB', data.github)
          commit('SET_EMAIL', data.email)
          setUserId(data.userId)
          if (data.setting !== null) {
            commit('SET_AVATAR', 'data:image/png;base64,' + data.setting.avatar)
            commit('SET_INTRODUCTION', data.setting.introduction)
            commit('SET_MOTTO', data.setting.motto)
            commit('SET_BLOGNAME', data.setting.blogName)
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut ({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },
    // 设置setting
    setSetting ({ commit }, setting) {
      commit('SET_AVATAR', 'data:image/png;base64,' + setting.avatar)
      commit('SET_INTRODUCTION', setting.introduction)
      commit('SET_MOTTO', setting.motto)
      commit('SET_BLOGNAME', setting.blogName)
    },
    // 设置social
    setSocial ({ commit }, user) {
      commit('SET_QQ', user.QQ)
      commit('SET_WEIBO', user.weibo)
      commit('SET_GITHUB', user.github)
    }
    // 动态修改权限
    // ChangeRoles({ commit }, role) {
    //   return new Promise(resolve => {
    //     commit('SET_TOKEN', role)
    //     setToken(role)
    //     getUserInfo(role).then(response => {
    //       const data = response.data
    //       commit('SET_ROLES', data.roles)
    //       commit('SET_NAME', data.name)
    //       commit('SET_AVATAR', data.avatar)
    //       commit('SET_INTRODUCTION', data.introduction)
    //       resolve()
    //     })
    //   })
    // }
  }
}

export default user

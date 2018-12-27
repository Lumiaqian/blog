// eslint-disable-next-line no-unused-vars
import {getIp} from '@/utils/net'
import {getWeather} from '@/api/utils'
const common = {
  state: {
    showRightNav: false,
    isAdminWrap: false,
    isErrorWrap: false,
    weatherInfo: {
      temp: '',
      weather: '',
      city: ''
    },
    articleMenu: false,
    articleMenuSource: [],
    articleMenuTag: '1.'
  },
  mutations: {
    SET_SHOW: (state, show) => {
      // console.log('进入mutations')
      state.showRightNav = show
    },
    IS_ADMIN_WRAP: (state, data) => {
      // console.log('IS_ADMIN_WRAP: ' + data)
      state.isAdminWrap = data
    },
    SET_WEATHER: (state, weather) => {
      state.weatherInfo = weather
    },
    IS_ERROR_WRAP: (state, data) => {
      // console.log('IS_ERROR_WRAP: ' + data)
      state.isErrorWrap = data
    },
    SET_ARTICLE_MENU: (state, data) => {
      state.articleMenu = data
    },
    SET_ARTICLE_MENU_SOURCE: (state, data) => {
      state.articleMenuSource = data
    },
    SET_ARTICLE_MENU_TAG: (state, data) => {
      state.articleMenuTag = data
    },
    SET_SHOWRIGHTNAV: (state, data) => {
      state.showRightNav = data
    }

  },
  actions: {
    // eslint-disable-next-line standard/object-curly-even-spacing
    setShow ({ commit}, show) {
      // console.log('进入actions')
      commit('SET_SHOW', show)
    },
    // eslint-disable-next-line standard/object-curly-even-spacing
    isAdminWrap ({ commit}, data) {
      commit('IS_ADMIN_WRAP', data)
    },
    isErrorWrap ({commit}, data) {
      commit('IS_ERROR_WRAP', data)
    },
    setArticleMenu ({commit}, data) {
      commit('SET_ARTICLE_MENU', data)
    },
    setArticleMenuSource ({commit}, data) {
      commit('SET_ARTICLE_MENU_SOURCE', data)
    },
    setArticleMenuTag ({commit}, data) {
      commit('SET_ARTICLE_MENU_TAG', data)
    },
    setShowRightNav ({commit}, data) {
      commit('SET_SHOWRIGHTNAV', data)
    },
    // eslint-disable-next-line standard/object-curly-even-spacing
    getWeather ({ commit}) {
      return new Promise((resolve, reject) => {
        // getIp().then(res => {
        // let length = res.data.length - 1
        // let ip = JSON.parse(res.data.substring(19, length)).cip
        // console.log(res.data.length)
        getWeather().then(res => {
          let weatherInfo = {
            temp: '',
            weather: '',
            city: ''
          }
          weatherInfo.temp = res.data.data[0].realtime.temp + '℃'
          weatherInfo.weather = res.data.data[0].realtime.weather
          weatherInfo.city = res.data.data[0].city
          // commit('SET_CITY',city)
          commit('SET_WEATHER', weatherInfo)
          // console.log(weatherInfo)
          resolve()
        }).catch(err => {
          reject(err)
        })
      // }).catch(err => {
      //   // eslint-disable-next-line no-undef
      //   reject(err)
      })
      // })
    }
  }
}
export default common

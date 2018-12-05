import {getIp} from '@/utils/net'
import {getWeather} from '@/api/utils'
const common = {
  state: {
    showRightNav: false,
    isAdminWrap: false,
    weatherInfo: {
      temp: '',
      weather: '',
      city: ''
    }
  },
  mutations: {
    SETShOW: (state, show) => {
      // console.log('进入mutations')
      state.showRightNav = show
    },
    IS_ADMIN_WRAP: (state, data) => {
      console.log('IS_ADMIN_WRAP: ' + data)
      state.isAdminWrap = data
    },
    SET_WEATHER: (state, weather) => {
      state.weatherInfo = weather
    }
  },
  actions: {
    // eslint-disable-next-line standard/object-curly-even-spacing
    setShow ({ commit}, show) {
      // console.log('进入actions')
      commit('SETShOW', show)
    },
    // eslint-disable-next-line standard/object-curly-even-spacing
    isAdminWrap ({ commit}, data) {
      commit('IS_ADMIN_WRAP', data)
    },
    // eslint-disable-next-line standard/object-curly-even-spacing
    getWeather ({ commit}) {
      return new Promise((resolve, reject) => {
        getIp().then(res => {
          let length = res.data.length - 1
          let ip = JSON.parse(res.data.substring(19, length)).cip
          // console.log(res.data.length)
          getWeather(ip).then(res => {
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
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
export default common

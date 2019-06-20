import { getCount } from '@/api/count'

const lcount = {
  state: {
    lpostCount: 0,
    ltagCount: 0,
    lcateCount: 0
  },
  mutations: {
    SET_COUNT (state, count) {
      state.lpostCount = count.postCount
      state.ltagCount = count.tagCount
      state.lcateCount = count.cateCount
      // console.log(state.postCount,state.cateCount,state.tagCount)
    }
  },
  actions: {
    // eslint-disable-next-line standard/object-curly-even-spacing
    setLcount ({ commit}) {
      return new Promise((resolve, reject) => {
        // console.log('进入setCount')
        getCount().then(res => {
          let count = {
            postCount: 0,
            tagCount: 0,
            cateCount: 0
          }
          count.postCount = res.data.data.postCount
          count.cateCount = res.data.data.cateCount
          count.tagCount = res.data.data.tagCount
          // console.log(postCount,cateCount,tagCount)
          commit('SET_COUNT', count)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
export default lcount

import { getCount } from '@/api/admin/count'

const count = {
  state: {
    postCount: 0,
    tagCount: 0,
    cateCount: 0,
    postAllCount: 0,
    commentCount: 0
  },
  mutations: {
    SET_COUNT (state, count) {
      state.postCount = count.postCount
      state.tagCount = count.tagCount
      state.cateCount = count.cateCount
      state.postAllCount = count.postAllCount
      state.commentCount = count.commentCount
      // console.log(state.postCount,state.cateCount,state.tagCount)
    }
  },
  actions: {
    // eslint-disable-next-line standard/object-curly-even-spacing
    setCount ({ commit}) {
      return new Promise((resolve, reject) => {
        // console.log('进入setCount')
        getCount().then(res => {
          let count = {
            postCount: 0,
            tagCount: 0,
            cateCount: 0,
            postAllCount: 0,
            commentCount: 0
          }
          count.postCount = res.data.data.postCount
          count.cateCount = res.data.data.cateCount
          count.tagCount = res.data.data.tagCount
          count.postAllCount = res.data.data.postAllCount
          count.commentCount = res.data.data.commentCount
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
export default count

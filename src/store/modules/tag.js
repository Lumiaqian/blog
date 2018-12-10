import Cookies from 'js-cookie'

const tag = {
  state: {
    tag: {
      tagId: '',
      tagName: ''
    }
  },
  mutations: {
    SETTAG: (state, data) => {
      console.log('进入mutations')
      state.tag.tagId = data.tagId
      state.tag.tagName = data.tagName
      Cookies.set('tag', data)
      console.log('SETTAG' + JSON.stringify(state.tag))
    }
  },
  actions: {
    // eslint-disable-next-line standard/object-curly-even-spacing
    setTag ({ commit}, data) {
      console.log('进入actions')
      commit('SETTAG', data)
    }
  }
}
export default tag

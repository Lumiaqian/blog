const post = {
  state: {
    status: -1,
    postId: '',
    fileList: []
  },
  mutations: {
    SET_POST (state, post) {
      state.status = post.status
      state.postId = post.postId
    },
    SET_FILELIST (state, fileList) {
      state.fileList = fileList
    }
  },
  actions: {
    setPost ({commit}, post) {
      commit('SET_POST', post)
    },
    setFileList ({commit}, fileList) {
      commit('SET_FILELIST', fileList)
    }
  }

}
export default post

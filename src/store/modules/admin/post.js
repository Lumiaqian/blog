const post = {
    state: {
        status: -1,
        postId: ''
    },
    mutations: {
       SET_POST(state, post) {
           state.status = post.status
           state.postId = post.postId
       }
    },
    actions: {
        setPost({commit}, post) {
            commit('SET_POST', post)
        }
    }

}
export default post
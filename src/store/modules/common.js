const common = {
    state: {
        showRightNav: false
    },
    mutations: {
        SETShOW: (state, show) =>{
            console.log('进入mutations')
            state.showRightNav = show
        }
    },
    actions: {
        setShow({ commit},show){
            console.log('进入actions')
            commit('SETShOW',show)
        }
    }
}
export default common
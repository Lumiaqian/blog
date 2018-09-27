const common = {
    state: {
        showRightNav: false,
        isAdminWrap: false,
    },
    mutations: {
        SETShOW: (state, show) =>{
            //console.log('进入mutations')
            state.showRightNav = show
        },
        IS_ADMIN_WRAP: (state, data) =>{
            console.log('IS_ADMIN_WRAP: ' + data)
            state.isAdminWrap = data
        }
    },
    actions: {
        setShow({ commit},show){
            //console.log('进入actions')
            commit('SETShOW',show)
        },
        isAdminWrap({ commit},data){
            commit('IS_ADMIN_WRAP',data)
        }
    }
}
export default common
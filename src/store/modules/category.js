import Cookies from 'js-cookie'

const category = {
    state: {
        category:{
            categoryId: '',
            categoryName: '',
            fatherId: '',
            count: 0
        }
    },
    mutations: {
        SETCATE: (state, data) =>{
            console.log('进入mutations')
            state.category.categoryId = data.categoryId
            state.category.categoryName = data.categoryName
            state.category.fatherId = data.fatherId
            state.category.count = data.count
            Cookies.set('category',data)
            console.log('SETcategory'+JSON.stringify(state.category))
        }
    },
    actions: {
        setCategory({ commit},data){
            console.log('进入actions')
            commit('SETCATE',data)
        }
    }
}
export default category
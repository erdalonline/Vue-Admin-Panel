const TOKEN_KEY = 'access_token'
const state = {
    token: localStorage.getItem(TOKEN_KEY) || null,
    user: {}
}

const getters = {
    getUserName: state => {
        return state.user.name;
    },
    isLogin: state => {
        if(state.token){
            return true
        }else{
            return false
        }
    }
}
const mutations = {
    SET_TOKEN: (state,token) => {
      localStorage.setItem(TOKEN_KEY,token)
      state.token = token
    },
    SET_USER: (state,user) => {
        state.user = user
    },
}
const actions = {
    login({commit},user){
        return new Promise(resolve => {
            commit('SET_USER',user)
            commit('SET_TOKEN',user.token)
          return resolve
        })
    },
    logout({commit}){
        return new Promise( resolve => {
            commit('SET_TOKEN',null)
            commit('SET_USER',null)
            localStorage.removeItem(TOKEN_KEY)
            return resolve
        })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
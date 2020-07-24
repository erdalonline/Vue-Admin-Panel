function routeParse(route) {
    const newRoute = new Array()
    if(route.length > 0){
        for (let i = 0; i < route.length; i++){
            if(!route[i].hidden){
                newRoute.push(route[i])
            }
        }
    }
    return newRoute
}

const state = {
    routes: null,
}
const getters = {
    getRoutes: state => {
        return state.routes
    }
}
const mutations = {
    SET_ROUTES: (state, routes) => {
        state.routes = routes
    }
}
const actions = {
    generateRoutes({commit}, routes) {
        return new Promise(resolve => {
            commit('SET_ROUTES', routeParse(routes))
            resolve(routes)
        })
    },

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
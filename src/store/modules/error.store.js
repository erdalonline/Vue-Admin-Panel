/**
 * Filename: error.store.js
 * Author: Yusuf Erdal
 * AuthorUrl : https://github.com/erdalonline
 * Date: 10.05.2020
 * Time: 05:23
 */

const state = {
    error: []
}

const getters = {
    getError(state){
        return state.error
    }
}

const mutations = {
    SET_ERROR: (state, payload) => {
        state.error =  payload
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations
}
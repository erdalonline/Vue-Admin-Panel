// import axios from 'axios'
import HTTP from '@/config/http'

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
        if (state.token) {
            return true
        } else {
            return false
        }
    },
    getToken: state => {
        return state.token
    }
}
const mutations = {
    SET_TOKEN: (state, token) => {
        localStorage.setItem(TOKEN_KEY, token)
        state.token = token
    },
    SET_USER: (state, user) => {
        state.user = user
    },
}
const actions = {
    login({commit}, user) {
        return new Promise((resolve, reject) => {
            HTTP.post('login', user).then(response => {
                HTTP.setHeader(response.data.access_token)
                commit('SET_TOKEN',response.data.access_token)
                resolve(response)
            }).catch(error => {
                reject(error)
            })

        })
    },
    getUser({commit}) {
        return new Promise((resolve, reject) => {
            HTTP.get('user').then(response => {
                commit('SET_USER', response.data)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
     },
    logout({commit}) {
        return new Promise(resolve => {
            commit('SET_TOKEN', null)
            commit('SET_USER', null)
            localStorage.removeItem(TOKEN_KEY)
            return resolve
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
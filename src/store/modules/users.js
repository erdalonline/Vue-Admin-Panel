/**
 * Filename: users.js
 * Author: Yusuf Erdal
 * AuthorUrl : https://github.com/erdalonline
 * Date: 10.05.2020
 * Time: 04:06
 */
import HTTP from '@/config/http'

const getDefaultState = () => {
    return {
        users: [],
        userRoles: []
    }
}

const state = getDefaultState()

const getters = {
    Roles(state) {
        return state.userRoles
    },
    Users(state){
        return state.users
    }
}

const mutations = {
    SET_USERS: (state, payload) => {
        state.users =  payload
    },
    ADD_USER: (state, payload) => {
      state.users.push(payload)
    },
    SET_USER_ROLES: (state, payload) => {
        state.userRoles = payload
    },
    ADD_ROLE: (state, payload) => {
        state.userRoles.push(payload)
    },
    RESET_USER: (state) => {
        Object.assign(state,getDefaultState())
    }
}

const actions = {
    getUsers({commit}){
        return new Promise((resolve, reject) => {
            HTTP.get('users').then(response => {
                commit('SET_USERS', response.data)
                return resolve(response)
            }).catch(error =>{
                return reject(error)
            })
        })
    },
    addUser({commit}, payload){
        return new Promise((resolve, reject) => {
            HTTP.post('users', payload).then(response => {
                commit('ADD_USER', response.data)
                return resolve(response)
            }).catch(error =>{
                return reject(error)
            })
        })
    },
    getRoles({commit}){
        return new Promise((resolve, reject) => {
            HTTP.get('userrole').then(response => {
                commit('SET_USER_ROLES', response.data)
                return resolve(response)
            }).catch(error =>{
                return reject(error)
            })
        })
    },
    addRole({commit}, payload){
        return new Promise((resolve, reject) => {
            HTTP.post('userrole', payload).then(response => {
                commit('ADD_ROLE', response.data)
                return resolve(response)
            }).catch(error =>{
                return reject(error)
            })
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
/**
 * Filename: users.store.js
 * Author: Yusuf Erdal
 * AuthorUrl : https://github.com/erdalonline
 * Date: 10.05.2020
 * Time: 04:06
 */
import Vue from 'vue'
import HTTP from '@/config/http'

const getDefaultState = () => {
    return {
        users: [],
        userRoles: [],
        userRoleTermActions: null,
        userRoleTerm: null, // yetki düzenleme sayfasına rol bilgilerini alır,
        showUser: null
    }
}

const state = getDefaultState()

const getters = {
    Roles(state) {
        return state.userRoles
    },
    Users(state) {
        return state.users
    },
    UserRoleTermActions(state) {
        return state.userRoleTermActions
    },
    UserRoleTerm(state) {
        return state.userRoleTerm
    },
    ShowUser(state) {
        return state.showUser
    }
}

const mutations = {
    SET_USERS: (state, payload) => {
        state.users = payload
    },
    ADD_USER: (state, payload) => {
        state.users.push(payload)
    },
    SET_USER_SHOW: (state, payload) => {
        state.showUser = payload
    },
    SET_EDIT_USER: (state, payload) => {
        let index = state.users.findIndex(item => item.id == payload.id)
        Vue.set(state.users,index, payload)
    },
    SET_USER_ROLES: (state, payload) => {
        state.userRoles = payload
    },
    ADD_ROLE: (state, payload) => {
        state.userRoles.push(payload)
    },
    SET_ROLE_TERM_ACTIONS: (state, payload) => {
        state.userRoleTermActions = payload
    },
    GET_USER_ROLE_TERM: (state, id) => {
        for (let i = 0; i < state.userRoles.length; i++) {
            if (state.userRoles[i].value == id) {
                state.userRoleTerm = state.userRoles[i]
                break
            }
        }
    },
    RESET_USER: (state) => {
        Object.assign(state, getDefaultState())
    }
}

const actions = {
    getUsers({commit}) {
        return new Promise((resolve, reject) => {
            HTTP.get('users').then(response => {
                commit('SET_USERS', response.data)
                return resolve(response)
            }).catch(error => {
                return reject(error)
            })
        })
    },
    addUser({commit}, payload) {
        return new Promise((resolve, reject) => {
            HTTP.post('users', payload).then(response => {
                commit('ADD_USER', response.data)
                return resolve(response)
            }).catch(error => {
                return reject(error)
            })
        })
    },
    getRoles({commit}) {
        return new Promise((resolve, reject) => {
            HTTP.get('userrole').then(response => {
                commit('SET_USER_ROLES', response.data)
                return resolve(response)
            }).catch(error => {
                return reject(error)
            })
        })
    },
    addRole({commit}, payload) {
        return new Promise((resolve, reject) => {
            HTTP.post('userrole', payload).then(response => {
                commit('ADD_ROLE', response.data)
                return resolve(response)
            }).catch(error => {
                return reject(error)
            })
        })
    },
    getRoleActions({commit}, id) { // yetkileri çeker
        return new Promise((resolve, reject) => {
            HTTP.get('userroleterm/' + id).then(response => {
                commit('SET_ROLE_TERM_ACTIONS', response.data)
                return resolve(response)
            }).catch(error => {
                return reject(error)
            })
        })
    },
    setRoleActions({commit}, payload) { // yetkileri çeker
        return new Promise((resolve, reject) => {
            HTTP.post('userroleterm/' + payload.id, payload.data).then(response => {
                commit('SET_ROLE_TERM_ACTIONS', null)
                return resolve(response)
            }).catch(error => {
                return reject(error)
            })
        })
    },
    getUser({commit}, id) {
        return new Promise((resolve, reject) => {
            HTTP.get('users/' + id).then(response => {
                commit('SET_USER_SHOW', response.data)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // eslint-disable-next-line no-unused-vars
    updateUser({commit}, payload) {
        return new Promise((resolve, reject) => {
            HTTP.patch('users/' + payload.id, payload).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    setEditUser({commit}, payload){
      commit('SET_EDIT_USER',payload)
    },
    // eslint-disable-next-line no-unused-vars
    deleteUser({commit}, id) {
        return new Promise((resolve, reject) => {
            HTTP.delete('users/' + id).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
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
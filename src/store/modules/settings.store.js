/**
 * Filename: settings.store.js
 * Author: Yusuf Erdal
 * AuthorUrl : https://github.com/erdalonline
 * Date: 9.09.2020
 * Time: 22:56
 */

import HTTP from '@/config/http'

const getDefaultState = () => {
    return {
        settings: []
    }
}

const state = getDefaultState()

const getters = {
    settings: state => {
        return state.settings
    },
    settingsForm: state => {
        let tmp = {}
        state.settings.forEach(item => {
            tmp[item.option_name] = item.option_value
        })
        return tmp
    }
}

const mutations = {
    SET_SETTINGS: (state, payload) => {
        state.settings = payload
    },
    RESET_SETTINGS: (state) => {
        Object.assign(state, getDefaultState())
    }
}

const actions = {
    getSettings({commit}) {
        return new Promise((resolve, reject) => {
            HTTP.get('settings').then(response => {
                commit('SET_SETTINGS', response.data)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // eslint-disable-next-line no-unused-vars
    setSettings({commit}, payload) {
        return new Promise((resolve, reject) => {
            HTTP.post('settings/update', payload).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
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
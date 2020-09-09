import Vue from 'vue';
import Vuex from 'vuex';
import modules from "./modules"
Vue.use(Vuex);
import HTTP from '@/config/http'
const store = new Vuex.Store({
    state: {
        appName: 'Admin Panel',
        homeStats: []
    },
    getters: {
        appName: state => {
            return state.appName;
        },
        getHomeStats: state => {
            return state.homeStats
        }
    },
    mutations: {
        SET_HOME_STATS: (state, payload) => {
            state.homeStats = payload
        }
    },
    actions: {
        getHomeStats({commit}){
            return new Promise((resolve, reject) => {
                HTTP.get('home').then(response => {
                    commit('SET_HOME_STATS', response.data)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        }
    },
    modules: modules
})

export default store
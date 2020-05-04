import Vue from 'vue';
import Vuex from 'vuex';
import User from './modules/user'
import Routes from './modules/router'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        appName: 'Yönetim Paneli'
    },
    getters: {
        appName: state => {
            return state.appName;
        }
    },
    modules:{
        User,
        Routes
    }
})

export default store
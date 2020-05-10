import Vue from 'vue';
import Vuex from 'vuex';
import Error from './modules/error' // profil için
import User from './modules/user' // profil için
import Users from './modules/users' // tüm kullanıcılar için
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
        Error,
        User,
        Users,
        Routes,
    }
})

export default store
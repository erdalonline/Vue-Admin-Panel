import Vue from 'vue'
import router from './router/router'
import store from './store/store';
import {IconsPlugin, BootstrapVue} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import HTTP from '@/config/http'
import App from './App.vue'

if (store.getters["User/isLogin"]){
    HTTP.setHeader(store.getters["User/getToken"])
}

Vue.use(IconsPlugin)
Vue.use(BootstrapVue)
Vue.config.productionTip = false

new Vue({
    router,
    store,
  render: h => h(App),
}).$mount('#app')

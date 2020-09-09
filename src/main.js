import Vue from 'vue'
import router from './router/router'
import store from './store/store';
import {IconsPlugin, BootstrapVue} from 'bootstrap-vue'
import App from './App.vue'

/**
 * loader
 */
import VueLoading from 'vue-loading-overlay'
Vue.use(VueLoading);
import 'vue-loading-overlay/dist/vue-loading.css';

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'




Vue.config.productionTip = false

new Vue({
    router,
    store,
  render: h => h(App),
}).$mount('#app')

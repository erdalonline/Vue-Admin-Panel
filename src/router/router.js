import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'
import PageTitle from '@/config/get-page-title'
import store from "../store/store"

Vue.use(VueRouter)
/*
sayfa değiştirildiğinde storu temizle
 */

function resetVuex() {
    store.commit('Users/RESET_USER') // kullanıcılar sayfası
}

const routes = [
    {
        hidden: true,
        name: 'Login',
        path: '/login',
        component: () => import('@/views/Login'),
        meta: {
            title: 'Giriş'
        }
    },
    {
        hidden: true,
        name: 'logout',
        path: '/logout',
        meta: {
            auth: true
        }
    },
    {
        name: 'home',
        path: '/',
        component: Layout,
        children: [
            {
                path: '/',
                component: () => import('@/views/Home'),
                meta: {
                    icon: 'house',
                    title: 'Anasayfa',
                    auth: true
                }
            }
        ]
    },
    {
        name: 'users',
        hidden: false,
        path: '/users',
        component: Layout,
        children: [
            {
                path: '/user',
                component: () => import('@/views/User'),
                meta: {
                    icon: 'people-fill',
                    title: 'Kullanıcılar',
                    auth: true,
                    role: [1]
                }
            }
        ]

    },
    {
        hidden: true,
        path: '*',
        redirect: '/'
    }
]

const router = new VueRouter({
    mode: 'history',
    routes,
})

router.beforeEach(async (to, from, next) => {
    await store.dispatch('Routes/generateRoutes', routes)
    document.title = PageTitle(to.meta.title)
    store.commit('Error/SET_ERROR', null)
    if (!store.getters["User/isLogin"] && to.meta.auth) {
        return next('/login')
    }
    if (store.getters["User/isLogin"] && !to.meta.auth) {
        return next('/')
    }
    if (to.path.includes('/logout')) {
        resetVuex()
        store.dispatch('User/logout')
        router.replace('/login')
    }
    resetVuex()
    next()
})

export default router


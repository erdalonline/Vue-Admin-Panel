import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'
import PageTitle from '@/config/get-page-title'
import store from "../store/store"

Vue.use(VueRouter)

const routes = [
    {
        hidden: true,
        name: 'Login',
        path: '/login',
        component: () => import('@/views/Login'),
    },
    {
        hidden: true,
        name: 'logout',
        path: '/logout',
        meta:{
            auth:true
        }
    },
    {
        name: 'home',
        path: '/',
        component: Layout,
        children:[
            {
                path:'/',
                component: () => import('@/views/Home'),
                meta:{
                    icon: 'house',
                    title: 'Anasayfa',
                    auth: true
                }
            }
        ]
    },
    {
        name: 'ads',
        path: '/ads',
        component: Layout,
        children: [
            {
                path: '/ads',
                component: () => import('@/views/Ads'),
                meta: {
                    icon: 'shield-shaded',
                    title: 'Ads',
                    auth: true
                }
            }
        ]

    },
    {
        name: 'user',
        hidden: true,
        path: '/user',
        component: Layout,
        children: [
            {
                path: '/user',
                component: () => import('@/views/User'),
                meta: {
                    icon: 'file',
                    title: 'Kullanıcılar',
                    auth: true
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
router.beforeEach(async (to,from,next) => {
    await store.dispatch('Routes/generateRoutes',routes)
    document.title = PageTitle(to.meta.title)
    if(!store.getters["User/isLogin"] && to.meta.auth){
        return next('/login')
    }
    if(store.getters["User/isLogin"] && !to.meta.auth){
        return next('/')
    }
    if(to.path.includes('/logout')){
        store.dispatch('User/logout')
        return next('/login')
    }
    next()
})

export default router


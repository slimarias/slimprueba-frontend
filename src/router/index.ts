import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import LoginView from '../views/LoginView.vue';
import AuthService from '../services/auth.service'

const refreshToken = async (to, from, next)=>{
    await AuthService.refresh()
    next()
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
        path:'/',
        name:'Public',
        component: MainLayout,
        redirect: '/',
        children:[
            {
                path:'/',
                name:'Home',
                meta:{
                    title: 'Mis Hoteles',
                },
                component:HomeView,
                beforeEnter: refreshToken,
            },
            {
                path:'/login',
                name:'Login',
                meta:{
                    title: '&nbsp;',
                },
                component:LoginView
            },
            {
                path:'/about',
                name:'About',
                meta:{
                    title: 'Acerca De M&iacute;',
                },
                component:AboutView,
                beforeEnter: refreshToken,
            }
        ]
    }
  ]
})

export default router

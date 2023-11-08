import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout'
import LogIn from '@/views/login'
import MyOrder from '@/views/myorder'
import ProDetail from '@/views/prodetail'
import Search from '@/views/search'
import Pay from '@/views/pay'
import Home from '@/views/layout/home.vue'
import Category from '@/views/layout/category.vue'
import User from '@/views/layout/user.vue'
import Cart from '@/views/layout/cart.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: LogIn },
    {
      path: '/',
      component: Layout,
      // redirect: './home',
      children: [
        { path: '/home', component: Home },
        { path: '/category', component: Category },
        { path: '/user', component: User },
        { path: '/cart', component: Cart }
      ]
    },
    // 如果不是在children下的 /lll/home，就会在App.vue中渲染，只有是children才会在父系也页面的router-view渲染出来
    // { path: '/lll/home', component: Home },
    { path: '/myorder', component: MyOrder },
    { path: '/pay', component: Pay },
    { path: '/prodetail', component: ProDetail },
    { path: '/search', component: Search }
  ]
})

export default router

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
import store from '@/store'
import SearchList from '@/views/search/list'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: LogIn },
    {
      path: '/',
      component: Layout,
      redirect: '/home',
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
    { path: '/prodetail/:id', component: ProDetail },
    { path: '/search', component: Search },
    { path: '/searchlist', component: SearchList }
  ]
})

// 全局前置导航守卫
// to:   到哪里去，到哪去的完整路由信息对象 (路径，参数)
// from: 从哪里来，从哪来的完整路由信息对象 (路径，参数)
// next(): 是否放行
// (1) next()     直接放行，放行到to要去的路径
// (2) next(路径)  进行拦截，拦截到next里面配置的路径
const authUrls = ['/pay', '/myorder']

router.beforeEach((to, from, next) => {
  if (!authUrls.includes(to.path)) {
    next()
  }

  // 这样写不可以，因为$store是挂载到vue全局的，在js文件中访问不到
  const token = store.getters.token
  if (token) {
    next()
  } else {
    next('/login')
  }
})
export default router

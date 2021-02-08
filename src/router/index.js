import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import QuotesRandom from '@/components/QuotesRandom.vue'
import EditQuotes from '@/components/EditQuotes.vue'
import TestCard from '@/components/TestCard'
import Login from '@/views/Login'
import SignUp from '@/views/SignUp'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children : [
      {
        path: '/quotes',
        name: 'QuotesRandom',
        component: QuotesRandom
      },
      {
        path: '/edit',
        name: 'EditQuotes',
        component: EditQuotes
      },
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/',
    name: 'login',
    component: Login,
  }
]

const router = new VueRouter({
  routes
})

export default router

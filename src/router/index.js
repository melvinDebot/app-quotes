import Vue from "vue";
import VueRouter from "vue-router";
import firebase from 'firebase';
import Home from "@/views/Home.vue";
import QuotesRandom from "@/components/QuotesRandom.vue";
import EditQuotes from "@/components/EditQuotes.vue";
import Login from "@/views/Login";
import SignUp from "@/views/SignUp";

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: '/login'
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: "",
        name: "QuotesRandom",
        component: QuotesRandom,
      },
      {
        path: "/edit",
        name: "EditQuotes",
        component: EditQuotes,
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});
router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('login');
  else if (!requiresAuth && currentUser) next('home');
  else next();
});

export default router;

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Request from '../views/Request.vue'
import Details from '../views/Details.vue'
import Forbidden from '../views/Forbidden.vue'
import General from '../views/General.vue'
import store from '@/store';
import ListMobilities from "../views/ListMobilities.vue"


Vue.use(VueRouter)

const routes = [
  {
    path: '/map',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
    if (store.getters['auth/getrole'] != "Admin") {
    return next({
    // will put a vue with You don't have the STUDENT ROLE to access
    name: 'Forbidden'
    })
    }
    next();
    }
  },
  {
    path: '/request',
    name: 'Request',
    component: Request,
    beforeEnter: (to, from, next) => {
      if (store.getters['auth/getrole'] != "Student") {
        return next({
          // will put a vue with You don't have the STUDENT ROLE to access
          name: 'Forbidden'
        })
      }
      next();
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'General',
    component: General
  }
  ,
  {
    path: '/mobilities',
    name: 'ListMobilities',
    component: ListMobilities,
    beforeEnter: (to, from, next) => {
      if (store.getters['auth/getrole'] != "Admin") {
        return next({
          // will put a vue with You don't have the STUDENT ROLE to access
          name: 'Forbidden'
        })
      }
      next();
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/details/:studentId',
    name: 'Details',
    component: Details
  },
  {
    path: '/forbidden',
    name: 'Forbidden',
    component: Forbidden
  }
]

const router = new VueRouter({
  routes,
  mode: "history"
})

export default router

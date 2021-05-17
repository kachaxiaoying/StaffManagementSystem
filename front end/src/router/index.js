import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../components/index.vue'
import login from '../components/login.vue'
import newuser from '../components/registed.vue'




import table from '../components/page/table.vue'
import createProject from '../components/page/createProject.vue'
import letters from '../components/page/letters.vue'
















import axios from 'axios'
Vue.prototype.$axios = axios
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: login,
  },
  {
    path: '/newuser',
    name: 'newuser',
    component: newuser,
  },
  {
    path: '/index',
    name: 'index',
    component: index,
    children: [
      {
        path: '/index',
        name: 'table',
        component: table,
      },
      {
        path: '/createProject',
        name: 'createProject',
        component: createProject,
      },
      {
        path: '/letters',
        name: 'letters',
        component: letters,
      },

    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

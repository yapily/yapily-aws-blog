import { createRouter, createWebHistory  } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SingleInstitution from '../views/institutions/id/SingleInstitution'
import CallbackView from  '../views/CallbackView.vue'
import AccountsView from  '../views/AccountsView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/institutions/:id',
    name: 'singleInstitution',
    component: SingleInstitution
  },
  {
    path: '/callback',
    name: 'callback',
    component: CallbackView
  },
  {
    path: '/accounts',
    name: 'accounts',
    component: AccountsView
  }
]

const router = createRouter({
  history: createWebHistory(),
  mode:'history',
  routes
})

export default router

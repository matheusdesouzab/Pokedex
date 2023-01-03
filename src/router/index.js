import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import Habilidades from '@/views/Habilidades'
import Sobre from '@/views/Sobre'
import Status from '@/views/Status'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: 'habilidades', component: Habilidades
      },
      {
        path: 'sobre', component: Sobre
      },
      {
        path: 'status', component: Status
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

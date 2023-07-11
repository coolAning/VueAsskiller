import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/main',
      component: () => import('@/views/MainView.vue')
    }
  ]
})

export default router

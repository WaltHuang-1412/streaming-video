import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

export const routeList = {
  home: 'home'
}
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: routeList.home,
    component: () => import('../views/home/index.vue'),
    alias: '/home',
    meta: {
      layout: 'LayoutNormal',
      isVerifyIdentity: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

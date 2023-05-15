import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

export const routeList = {
  home: 'home',
  homeFollowing: 'homeFollowing',
  homeForYou: 'homeForYou'
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
    },
    redirect: () => {
      return { name: routeList.homeFollowing }
    },
    children: [
      {
        path: '/following',
        name: routeList.homeFollowing,
        components: {
          left: () => import('../views/home/Following.vue'),
          right: () => import('../views/home/ForYou.vue')
        }
      },
      {
        path: '/for-you',
        name: routeList.homeForYou,
        components: {
          left: () => import('../views/home/Following.vue'),
          right: () => import('../views/home/ForYou.vue')
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

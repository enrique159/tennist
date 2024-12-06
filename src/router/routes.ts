import { RouteRecordRaw } from 'vue-router'
import LoadingPage from '@/views/LoadingPage.vue'

import { AuthRoutes } from '@/views/auth/routes'
import { HomeRoutes } from '@/views/home/routes'
import { ProfileRoutes } from '@/views/profile/routes'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/loading',
  },
  { path: '/loading', component: LoadingPage },
  ...AuthRoutes,
  ...HomeRoutes,
  ...ProfileRoutes
]

export default routes

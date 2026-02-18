import { RouteRecordRaw } from 'vue-router'
import PracticesView from '@/views/practices/PracticesView.vue'
import CreatePracticeView from '@/views/practices/CreatePracticeView.vue'

export const PracticesRoutes: Array<RouteRecordRaw> = [
  {
    path: '/practices',
    component: PracticesView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/practices/create',
    component: CreatePracticeView,
    meta: {
      requiresAuth: true,
    },
  },
]

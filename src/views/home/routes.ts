import HomeModule from '@/views/home/HomeModule.vue'
import HomePage from '@/views/home/views/HomePage.vue'

export const HomeRoutes = [
  {
    path: '/home',
    component: HomeModule,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '',
        name: 'Home',
        component: HomePage,
      },
    ],
  },
]
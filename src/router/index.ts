import { createRouter, createWebHistory } from '@ionic/vue-router';
import { useApp } from '@/composables/useApp'
import routes from './routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const { validToken } = useApp()
  if (to.path === '/auth' && validToken()) {
    next({ name: 'Home' })
  }
  else if (to.meta.requiresAuth && !validToken()) {
    next({ path: '/loading' })
  }
  else {
    next()
  }
})

export default router

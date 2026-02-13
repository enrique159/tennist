import VenuesView from '@/views/venues/VenuesView.vue'
import VenuePageView from '@/views/venues/VenuePageView.vue'

export const VenuesRoutes = [
  {
    path: '/venues',
    component: VenuesView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/venues/:id',
    component: VenuePageView,
    meta: {
      requiresAuth: true,
    },
  },
]

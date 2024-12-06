import { RouteRecordRaw } from 'vue-router';
import ProfileModule from './ProfileModule.vue';
import MyProfilePage from './views/MyProfilePage.vue';
import SetupProfilePage from './views/SetupProfilePage.vue';

export const ProfileRoutes: Array<RouteRecordRaw> = [
  {
    path: '/profile',
    component: ProfileModule,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '',
        name: 'MyProfile',
        component: MyProfilePage,
      },
      {
        path: 'setup',
        name: 'SetupProfile',
        component: SetupProfilePage,
        meta: {
          requiresAuth: false,
        },
      }
    ],
  },
]

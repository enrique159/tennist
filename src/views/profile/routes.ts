import { RouteRecordRaw } from 'vue-router';
import ProfileModule from './ProfileModule.vue';
import MyProfilePage from './views/MyProfilePage.vue';
import SetupProfilePage from './views/SetupProfilePage.vue';
import SetupCompletedPage from './views/SetupCompletedPage.vue';

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
      },
      {
        path: 'setup-completed',
        name: 'SetupCompleted',
        component: SetupCompletedPage,
      }
    ],
  },
]

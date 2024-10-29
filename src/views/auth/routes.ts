import AuthModule from './AuthModule.vue';
import SigninPage from './views/SigninPage.vue';
import LoginPage from './views/LoginPage.vue';

export const AuthRoutes = [
  {
    path: '/auth',
    redirect: '/auth/login',
    component: AuthModule,
    meta: {
      requiresAuth: false,
    },
    children: [
      {
        path: 'login',
        name: 'Login',
        component: LoginPage,
      },
      {
        path: 'signin',
        name: 'Signin',
        component: SigninPage,
      }
    ],
  },
];
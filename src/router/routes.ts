import { RouteRecordRaw } from 'vue-router';
import HomePage from "@/views/HomePage.vue";


const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    component: HomePage,
  },
];

export default routes;
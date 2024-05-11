import { createRouter, createWebHistory } from 'vue-router';
import MainView from './page/iot-monitoring-page.vue';
import DashboardView from './page/capture-page.vue';

const routes = [
  { path: '/', component: MainView },
  { path: '/capture-page', component: DashboardView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

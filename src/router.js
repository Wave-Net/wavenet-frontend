import { createRouter, createWebHistory } from 'vue-router';
import MainView from './page/iot-monitoring-page.vue';
import DashboardView from './page/capture-page.vue';
import FlowchartView from './page/flowchart-page.vue';

const routes = [
  { path: '/', component: MainView },
  { path: '/capture-page', component: DashboardView },
  { path: '/flowchart-page', component: FlowchartView, name: 'FlowchartView' },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
